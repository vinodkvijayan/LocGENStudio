import {
  type Family,
  type GraphEdge,
  type GraphNode,
  type ModelFile,
  type Workflow,
  familyLabel,
  findModel,
  folderById,
  nodeTitle,
} from "@/lib/studio/model";

export type CompileIssue = { level: "error" | "warn"; message: string };

export type ComfyNode = {
  class_type: string;
  inputs: Record<string, unknown>;
};

export type CompileResult = {
  ok: boolean;
  issues: CompileIssue[];
  prompt: Record<string, ComfyNode>;
  summary: string;
  chain: string[];
};

type Ref = [string, number];

function incoming(edges: GraphEdge[], nodeId: string, port: string): GraphEdge[] {
  return edges.filter((e) => e.toNode === nodeId && e.toPort === port);
}

function byId(nodes: GraphNode[], id: string): GraphNode | undefined {
  return nodes.find((n) => n.id === id);
}

function isT5(name: string): boolean {
  return /t5|umt5|llama/i.test(name);
}

function clipType(family: Family): string {
  switch (family) {
    case "flux":
      return "flux";
    case "flux2":
      return "flux2";
    case "sd3":
      return "sd3";
    case "sdxl":
      return "sdxl";
    case "hunyuan":
      return "hunyuan_video";
    case "krea2":
      return "krea2";
    case "qwen":
    case "zimage":
      return "qwen_image";
    case "wan":
      return "wan";
    case "ltxv":
      return "ltxv";
    case "minimax":
      return "minimax";
    default:
      return "stable_diffusion";
  }
}

const UNET_FAMILIES: Family[] = ["flux", "flux2", "sd3", "wan", "hunyuan", "krea2", "qwen", "zimage", "minimax", "ltxv"];
const DUAL_CLIP: Family[] = ["flux", "sd3", "hunyuan"];
const VIDEO_FAMILIES: Family[] = ["wan", "hunyuan", "minimax", "ltxv"];

function encoderHint(family: Family): string {
  switch (family) {
    case "flux":
      return "Flux wants CLIP-L and T5-XXL.";
    case "flux2":
      return "Flux 2 Klein wants a Qwen3 text encoder and flux2-vae.";
    case "krea2":
      return "Krea 2 wants Qwen3-VL 4B and the Qwen image VAE.";
    case "qwen":
      return "Qwen Image 2.1 wants Qwen3-VL 8B and qwen_image_2.1_vae.";
    case "zimage":
      return "Z-Image wants its Qwen text encoder and VAE. Turbo is about 8 steps at CFG 1.";
    case "wan":
      return "Wan 2.2 wants UMT5-XXL and the Wan VAE.";
    case "ltxv":
      return "LTX 2.5 wants the Gemma text encoder and the video VAE.";
    case "minimax":
      return "MiniMax H3 wants its Qwen3-VL text encoder and the video VAE.";
    case "sd3":
      return "SD3 wants CLIP-L, CLIP-G and T5.";
    default:
      return "Wire a text encoder into the prompt.";
  }
}

function usesUnet(model: ModelFile): boolean {
  return model.folder === "diffusion_models" || model.folder === "unet" || UNET_FAMILIES.includes(model.family);
}

export function compile(workflow: Workflow, models: ModelFile[]): CompileResult {
  const issues: CompileIssue[] = [];
  const prompt: Record<string, ComfyNode> = {};
  const chain: string[] = [];
  let seq = 1;
  const add = (classType: string, inputs: Record<string, unknown>): string => {
    const id = String(seq++);
    prompt[id] = { class_type: classType, inputs };
    chain.push(classType);
    return id;
  };

  const samplers = workflow.nodes.filter((n) => n.kind === "sampler");
  const sampler = samplers.find((n) => incoming(workflow.edges, n.id, "model").length) ?? samplers[0];
  if (!sampler) {
    issues.push({ level: "error", message: "Add a sampler node." });
    return finish(issues, prompt, chain, "No sampler");
  }
  if (samplers.length > 1) {
    issues.push({ level: "warn", message: "More than one sampler — compiling the one wired to a model." });
  }

  const modelEdge = incoming(workflow.edges, sampler.id, "model")[0];
  if (!modelEdge) {
    issues.push({ level: "error", message: "Connect a diffusion model to the sampler model port." });
  }

  const loras: GraphNode[] = [];
  let diffusion: GraphNode | null = null;
  let cursor = modelEdge ? byId(workflow.nodes, modelEdge.fromNode) : undefined;
  const guard = new Set<string>();
  while (cursor && !guard.has(cursor.id)) {
    guard.add(cursor.id);
    if (cursor.kind === "lora") {
      loras.push(cursor);
      const back = incoming(workflow.edges, cursor.id, "model")[0];
      cursor = back ? byId(workflow.nodes, back.fromNode) : undefined;
      continue;
    }
    if (cursor.kind === "diffusion") {
      diffusion = cursor;
      break;
    }
    issues.push({ level: "error", message: "The model chain must be diffusion weights, optionally through LoRAs." });
    break;
  }
  loras.reverse();

  const weight = diffusion ? findModel(models, diffusion.data.modelId) : null;
  if (diffusion && !weight) {
    issues.push({ level: "error", message: "The diffusion node has no file selected." });
  }
  if (weight && UNET_FAMILIES.includes(weight.family) && weight.folder === "checkpoints") {
    issues.push({
      level: "warn",
      message: `${weight.name} looks like ${weight.family} weights but lives in checkpoints. diffusion_models is where UNETLoader looks.`,
    });
  }

  for (const lora of loras) {
    const file = findModel(models, lora.data.modelId);
    if (!file) issues.push({ level: "error", message: "A LoRA node has no file selected." });
    else if (file.folder !== "loras") {
      issues.push({ level: "warn", message: `${file.name} is not in loras/. LoraLoader will not see it.` });
    }
  }

  const posEdge = incoming(workflow.edges, sampler.id, "positive")[0];
  const negEdge = incoming(workflow.edges, sampler.id, "negative")[0];
  const positive = posEdge ? byId(workflow.nodes, posEdge.fromNode) : undefined;
  const negative = negEdge ? byId(workflow.nodes, negEdge.fromNode) : undefined;
  if (!positive || positive.kind !== "prompt") {
    issues.push({ level: "error", message: "Connect a positive prompt to the sampler." });
  }

  const clipSources: GraphNode[] = [];
  const seenClip = new Set<string>();
  for (const promptNode of [positive, negative]) {
    if (!promptNode) continue;
    for (const link of incoming(workflow.edges, promptNode.id, "clip")) {
      const src = byId(workflow.nodes, link.fromNode);
      if (src && src.kind === "textEncoder" && !seenClip.has(src.id)) {
        seenClip.add(src.id);
        clipSources.push(src);
      }
    }
  }

  const vaeEdge = incoming(workflow.edges, sampler.id, "vae")[0];
  const vaeNode = vaeEdge ? byId(workflow.nodes, vaeEdge.fromNode) : undefined;
  const vaeFile = vaeNode && vaeNode.kind === "vae" ? findModel(models, vaeNode.data.modelId) : null;
  if (vaeNode && vaeNode.kind === "vae" && !vaeFile) {
    issues.push({ level: "error", message: "The VAE node has no file selected." });
  }

  const family: Family = weight?.family ?? "generic";
  const unetPath = weight ? usesUnet(weight) && weight.folder !== "checkpoints" : false;
  const checkpointPath = Boolean(weight && !unetPath);

  if (unetPath && clipSources.length === 0) {
    issues.push({ level: "error", message: encoderHint(family) });
  }
  if (unetPath && !vaeFile) {
    issues.push({ level: "error", message: `Connect a VAE. ${encoderHint(family)}` });
  }
  if (checkpointPath && clipSources.length === 0) {
    issues.push({ level: "warn", message: "No text encoder wired — CLIP inside the checkpoint will be used." });
  }
  if (!negative) {
    issues.push({ level: "warn", message: "No negative prompt. An empty one will be encoded." });
  }

  if (issues.some((i) => i.level === "error") || !weight || !positive) {
    return finish(issues, prompt, chain, blockedSummary(workflow, models));
  }

  let modelRef: Ref;
  let clipRef: Ref | null = null;
  let vaeRef: Ref = ["missing", 0];

  if (unetPath) {
    const dtype = diffusion?.data.weightDtype ?? "default";
    const unetId = add("UNETLoader", { unet_name: weight.name, weight_dtype: dtype });
    modelRef = [unetId, 0];
    if (weight.folder === "unet") {
      issues.push({ level: "warn", message: "File is in unet/. ComfyUI still loads it, diffusion_models is the current folder." });
    }
  } else {
    const ckptId = add("CheckpointLoaderSimple", { ckpt_name: weight.name });
    modelRef = [ckptId, 0];
    clipRef = [ckptId, 1];
    vaeRef = [ckptId, 2];
    if (clipSources.length) {
      issues.push({ level: "warn", message: "Text encoders are wired, so the checkpoint CLIP is ignored." });
      clipRef = null;
    }
  }

  if (clipSources.length) {
    const files = clipSources.map((n) => findModel(models, n.data.modelId));
    if (files.some((f) => !f)) {
      issues.push({ level: "error", message: "A text encoder node has no file selected." });
      return finish(issues, prompt, chain, blockedSummary(workflow, models));
    }
    const ready = files.filter((f): f is ModelFile => Boolean(f));
    for (const file of ready) {
      if (file.folder !== "text_encoders" && file.folder !== "clip") {
        issues.push({
          level: "warn",
          message: `${file.name} is in ${folderById(file.folder)?.label}. DualCLIPLoader reads text_encoders and clip.`,
        });
      }
    }
    if (ready.length >= 2 && DUAL_CLIP.includes(family)) {
      const t5 = ready.find((f) => isT5(f.name));
      const other = ready.find((f) => f !== t5) ?? ready[0];
      const second = t5 ?? ready[1];
      if (!t5) issues.push({ level: "warn", message: "Two text encoders, but neither looks like T5. Order is file list order." });
      const id = add("DualCLIPLoader", {
        clip_name1: (t5 ? other : ready[0]).name,
        clip_name2: (t5 ? second : ready[1]).name,
        type: clipType(family === "generic" ? "flux" : family),
      });
      clipRef = [id, 0];
    } else {
      if (ready.length >= 2) {
        issues.push({ level: "warn", message: `${familyLabel(family)} uses one text encoder. The extra file is ignored.` });
      }
      const id = add("CLIPLoader", {
        clip_name: ready[0].name,
        type: clipType(family),
      });
      clipRef = [id, 0];
    }
  }

  if (!clipRef) {
    issues.push({ level: "error", message: "No CLIP source. Wire text encoders or use a full checkpoint." });
    return finish(issues, prompt, chain, blockedSummary(workflow, models));
  }

  for (const lora of loras) {
    const file = findModel(models, lora.data.modelId);
    if (!file) continue;
    const id = add("LoraLoader", {
      lora_name: file.name,
      strength_model: lora.data.strengthModel ?? 1,
      strength_clip: lora.data.strengthClip ?? 1,
      model: modelRef,
      clip: clipRef,
    });
    modelRef = [id, 0];
    clipRef = [id, 1];
  }

  if (vaeFile) {
    if (vaeFile.folder !== "vae") {
      issues.push({ level: "warn", message: `${vaeFile.name} is not in vae/.` });
    }
    const id = add("VAELoader", { vae_name: vaeFile.name });
    vaeRef = [id, 0];
  } else if (!checkpointPath) {
    issues.push({ level: "error", message: "VAE missing." });
    return finish(issues, prompt, chain, blockedSummary(workflow, models));
  }

  const posText = positive.data.text ?? "";
  const posId = add("CLIPTextEncode", { text: posText, clip: clipRef });
  let positiveRef: Ref = [posId, 0];
  const guidance = sampler.data.cfg ?? 1;
  const fluxLike = family === "flux" || family === "sd3";
  if (fluxLike && guidance > 1) {
    const gId = add("FluxGuidance", { conditioning: positiveRef, guidance });
    positiveRef = [gId, 0];
  }

  const negText = negative && negative.kind === "prompt" ? (negative.data.text ?? "") : "";
  const negId = add("CLIPTextEncode", { text: negText, clip: clipRef });
  const negativeRef: Ref = [negId, 0];

  const width = Math.max(64, Math.round(sampler.data.width ?? 1024));
  const height = Math.max(64, Math.round(sampler.data.height ?? 1024));
  const batch = Math.max(1, Math.round(sampler.data.batch ?? 1));
  const video = VIDEO_FAMILIES.includes(family);
  const frames = Math.max(1, Math.round(sampler.data.frames ?? (video ? 49 : 1)));
  let latentId: string;
  if (family === "ltxv") {
    latentId = add("EmptyLTXVLatentVideo", { width, height, length: frames, batch_size: batch });
  } else if (video) {
    latentId = add("EmptyHunyuanLatentVideo", { width, height, length: frames, batch_size: batch });
  } else {
    const latentClass = fluxLike || UNET_FAMILIES.includes(family) ? "EmptySD3LatentImage" : "EmptyLatentImage";
    latentId = add(latentClass, { width, height, batch_size: batch });
  }

  const kId = add("KSampler", {
    seed: Math.round(sampler.data.seed ?? 0),
    steps: Math.max(1, Math.round(sampler.data.steps ?? 20)),
    cfg: fluxLike && guidance > 1 ? 1 : guidance,
    sampler_name: sampler.data.sampler ?? "euler",
    scheduler: sampler.data.scheduler ?? "simple",
    denoise: sampler.data.denoise ?? 1,
    model: modelRef,
    positive: positiveRef,
    negative: negativeRef,
    latent_image: [latentId, 0],
  });

  const decId = add("VAEDecode", { samples: [kId, 0], vae: vaeRef });
  const saveEdge = workflow.edges.find((e) => e.fromNode === sampler.id && e.fromPort === "image");
  const save = saveEdge ? byId(workflow.nodes, saveEdge.toNode) : undefined;
  const prefix = save && save.kind === "save" ? save.data.prefix || "locgen" : "locgen";
  if (!save) issues.push({ level: "warn", message: "No save node. Prefix defaults to locgen." });
  add("SaveImage", { filename_prefix: prefix, images: [decId, 0] });

  const loraNames = loras
    .map((l) => findModel(models, l.data.modelId)?.name)
    .filter(Boolean)
    .map((n) => n!.split(/[/\\]/).pop());
  const summary = [
    weight.name,
    loraNames.length ? `LoRA ${loraNames.join(" → ")}` : null,
    `${sampler.data.steps ?? 20} steps`,
    fluxLike && guidance > 1 ? `guidance ${guidance}` : `cfg ${guidance}`,
    video ? `${width}×${height} · ${frames} frames` : `${width}×${height}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return finish(issues, prompt, chain, summary);
}

function blockedSummary(workflow: Workflow, models: ModelFile[]): string {
  const bits = workflow.nodes.map((n) => nodeTitle(n, models)).slice(0, 4);
  return bits.join(" · ") || "Incomplete graph";
}

function finish(issues: CompileIssue[], prompt: Record<string, ComfyNode>, chain: string[], summary: string): CompileResult {
  return {
    ok: !issues.some((i) => i.level === "error"),
    issues,
    prompt,
    summary,
    chain,
  };
}

export function pipelineSentence(workflow: Workflow, models: ModelFile[]): string {
  const result = compile(workflow, models);
  if (result.chain.length === 0) return result.issues.find((i) => i.level === "error")?.message ?? "Graph is empty.";
  return `${result.summary}. ${result.chain.join(" → ")}`;
}
