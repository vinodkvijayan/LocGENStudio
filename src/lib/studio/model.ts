export type FolderId =
  | "checkpoints"
  | "diffusion_models"
  | "unet"
  | "loras"
  | "vae"
  | "clip"
  | "text_encoders"
  | "clip_vision"
  | "embeddings"
  | "controlnet"
  | "upscale_models"
  | "hypernetworks"
  | "style_models"
  | "ipadapter"
  | "vae_approx"
  | "gligen"
  | "photomaker"
  | "audio_encoders"
  | "configs";

export type Family =
  | "flux"
  | "flux2"
  | "sdxl"
  | "sd15"
  | "sd3"
  | "wan"
  | "hunyuan"
  | "krea2"
  | "qwen"
  | "zimage"
  | "minimax"
  | "ltxv"
  | "clip"
  | "generic";

export const FAMILIES: Family[] = [
  "flux",
  "flux2",
  "krea2",
  "qwen",
  "zimage",
  "wan",
  "ltxv",
  "minimax",
  "sd3",
  "sdxl",
  "sd15",
  "hunyuan",
  "clip",
  "generic",
];

export type NodeKind = "diffusion" | "lora" | "textEncoder" | "vae" | "prompt" | "sampler" | "save";

export type PortKind = "model" | "clip" | "vae" | "cond" | "image";

export type WeightDtype = "default" | "fp8_e4m3fn" | "fp8_e5m2";

export type ModelFile = {
  id: string;
  name: string;
  folder: FolderId;
  bytes: number;
  family: Family;
  source: "demo" | "scan" | "manual";
  note?: string;
};

export type NodeData = {
  modelId?: string;
  strengthModel?: number;
  strengthClip?: number;
  weightDtype?: WeightDtype;
  role?: "positive" | "negative";
  text?: string;
  steps?: number;
  cfg?: number;
  sampler?: string;
  scheduler?: string;
  seed?: number;
  width?: number;
  height?: number;
  batch?: number;
  frames?: number;
  denoise?: number;
  prefix?: string;
};

export type GraphNode = {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  data: NodeData;
};

export type GraphEdge = {
  id: string;
  fromNode: string;
  fromPort: string;
  toNode: string;
  toPort: string;
};

export type Workflow = {
  id: string;
  name: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  pan: { x: number; y: number };
  zoom: number;
  selectedId: string | null;
};

export type JobStatus = "staged" | "queued" | "running" | "done" | "error";

export type Job = {
  id: string;
  workflowName: string;
  createdAt: number;
  status: JobStatus;
  summary: string;
  chain: string[];
  promptJson: string;
  message: string;
  imageUrl?: string;
};

export type PortDef = { name: string; label: string; kind: PortKind };

export const FOLDERS: {
  id: FolderId;
  label: string;
  hint: string;
  loader: string;
}[] = [
  { id: "checkpoints", label: "Checkpoints", hint: "Full SD1.5 and SDXL checkpoints", loader: "CheckpointLoaderSimple" },
  { id: "diffusion_models", label: "Diffusion models", hint: "Flux, Krea 2, Qwen Image, Z-Image, Wan, LTX, MiniMax", loader: "UNETLoader" },
  { id: "unet", label: "UNet", hint: "Legacy twin of diffusion_models", loader: "UNETLoader" },
  { id: "loras", label: "LoRAs", hint: "Style, identity, body and detail adapters", loader: "LoraLoader" },
  { id: "vae", label: "VAE", hint: "ae, Qwen Image, Wan, LTX and MiniMax video VAEs", loader: "VAELoader" },
  { id: "text_encoders", label: "Text encoders", hint: "T5, Qwen3-VL, UMT5, Gemma, CLIP-L", loader: "CLIPLoader" },
  { id: "clip", label: "CLIP", hint: "Older text-encoder folder, still scanned", loader: "CLIPLoader" },
  { id: "clip_vision", label: "CLIP vision", hint: "IP-Adapter and Redux vision towers", loader: "CLIPVisionLoader" },
  { id: "embeddings", label: "Embeddings", hint: "Textual inversion tokens used in prompts", loader: "prompt" },
  { id: "controlnet", label: "ControlNet", hint: "Pose, depth, canny, union", loader: "ControlNetLoader" },
  { id: "upscale_models", label: "Upscale", hint: "UltraSharp, RealESRGAN, DAT", loader: "UpscaleModelLoader" },
  { id: "hypernetworks", label: "Hypernetworks", hint: "Legacy hypernetworks", loader: "HypernetworkLoader" },
  { id: "style_models", label: "Style models", hint: "Flux Redux style models", loader: "StyleModelLoader" },
  { id: "ipadapter", label: "IP-Adapter", hint: "Image-prompt adapters", loader: "IPAdapter" },
  { id: "vae_approx", label: "VAE approx", hint: "Tiny preview VAEs (TAESD)", loader: "TAESD" },
  { id: "gligen", label: "GLIGEN", hint: "Grounded generation", loader: "GLIGEN" },
  { id: "photomaker", label: "PhotoMaker", hint: "Identity encoders", loader: "PhotoMaker" },
  { id: "audio_encoders", label: "Audio encoders", hint: "Audio towers for video models", loader: "AudioEncoder" },
  { id: "configs", label: "Configs", hint: "YAML architecture configs", loader: "config" },
];

const FOLDER_SET = new Set(FOLDERS.map((f) => f.id));

const ALIASES: Record<string, FolderId> = {
  checkpoints: "checkpoints",
  checkpoint: "checkpoints",
  stablediffusion: "checkpoints",
  diffusion_models: "diffusion_models",
  diffusionmodels: "diffusion_models",
  unet: "unet",
  loras: "loras",
  lora: "loras",
  vae: "vae",
  clip: "clip",
  text_encoders: "text_encoders",
  textencoders: "text_encoders",
  text_encoder: "text_encoders",
  textencoder: "text_encoders",
  diffussion_models: "diffusion_models",
  diffussionmodels: "diffusion_models",
  diffusion_model: "diffusion_models",
  clip_vision: "clip_vision",
  clipvision: "clip_vision",
  embeddings: "embeddings",
  embedding: "embeddings",
  controlnet: "controlnet",
  t2i_adapter: "controlnet",
  upscale_models: "upscale_models",
  upscalemodels: "upscale_models",
  esrgan: "upscale_models",
  hypernetworks: "hypernetworks",
  style_models: "style_models",
  ipadapter: "ipadapter",
  vae_approx: "vae_approx",
  gligen: "gligen",
  photomaker: "photomaker",
  audio_encoders: "audio_encoders",
  configs: "configs",
};

export const MODEL_EXTS = [".safetensors", ".ckpt", ".pt", ".pth", ".bin", ".gguf", ".sft"];

export const PATH_PRESETS = [
  { label: "LocGENStudio", path: "C:\\LocGENStudio\\models" },
  { label: "Portable", path: "C:\\ComfyUI_windows_portable\\ComfyUI\\models" },
  { label: "C:\\ComfyUI", path: "C:\\ComfyUI\\models" },
  { label: "Stability Matrix", path: "C:\\StabilityMatrix\\Data\\Packages\\ComfyUI\\models" },
];

export const DEFAULT_ROOT = PATH_PRESETS[0].path;
export const DEFAULT_ENGINE = "http://127.0.0.1:8188";

export function uid(prefix = "n"): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-2)}`;
}

export function folderById(id: string) {
  return FOLDERS.find((f) => f.id === id) ?? null;
}

export function normalizeFolder(name: string): FolderId | null {
  const key = name.trim().toLowerCase().replace(/[\s-]+/g, "_");
  return ALIASES[key] ?? (FOLDER_SET.has(key as FolderId) ? (key as FolderId) : null);
}

export function baseName(path: string): string {
  const parts = path.split(/[/\\]/);
  return parts[parts.length - 1] || path;
}

export function formatBytes(n: number): string {
  if (!n) return "—";
  const gb = n / 1e9;
  if (gb >= 1) return `${gb.toFixed(gb >= 10 ? 1 : 2)} GB`;
  const mb = n / 1e6;
  if (mb >= 1) return `${mb.toFixed(0)} MB`;
  return `${Math.max(1, Math.round(n / 1e3))} KB`;
}

export function familyLabel(family: Family): string {
  switch (family) {
    case "flux":
      return "Flux";
    case "flux2":
      return "Flux 2 Klein";
    case "sdxl":
      return "SDXL";
    case "sd15":
      return "SD 1.5";
    case "sd3":
      return "SD3";
    case "wan":
      return "Wan";
    case "hunyuan":
      return "Hunyuan";
    case "krea2":
      return "Krea 2";
    case "qwen":
      return "Qwen Image";
    case "zimage":
      return "Z-Image";
    case "minimax":
      return "MiniMax H3";
    case "ltxv":
      return "LTX 2.5";
    case "clip":
      return "CLIP";
    default:
      return "General";
  }
}

export function guessFamily(name: string, folder: FolderId): Family {
  const raw = name.toLowerCase();
  const n = raw.replace(/[^a-z0-9.]+/g, "");
  if (n.includes("krea2") || raw.includes("krea-2") || raw.includes("krea 2")) return "krea2";
  if (n.includes("zimage")) return "zimage";
  if (n.includes("minimax") || n.includes("hailuo")) return "minimax";
  if (n.includes("ltxv") || n.includes("ltx2") || raw.includes("ltx-2") || raw.includes("ltx_2")) return "ltxv";
  if (n.includes("flux2") || n.includes("klein") || raw.includes("flux-2") || raw.includes("flux_2")) return "flux2";
  if (n.includes("qwen")) return "qwen";
  if (n.includes("flux")) return "flux";
  if (n.includes("wan") || n.includes("umt5")) return "wan";
  if (n.includes("hunyuan")) return "hunyuan";
  if (n.includes("sd3")) return "sd3";
  if (n.includes("sdxl") || n.includes("juggernaut") || /(^|[^a-z])xl([^a-z]|$)/.test(raw)) return "sdxl";
  if (n.includes("v15") || raw.includes("sd15") || raw.includes("1.5")) return "sd15";
  if (n.includes("gemma")) return "ltxv";
  if (n.includes("t5")) return "flux";
  if (raw.includes("clip_l") || raw.includes("clip-l") || raw.includes("clip_g")) return "clip";
  if (folder === "vae" && /(^|[^a-z])ae([^a-z]|$)/.test(raw)) return "flux";
  return "generic";
}

export function kindForFolder(folder: FolderId): NodeKind | null {
  if (folder === "checkpoints" || folder === "diffusion_models" || folder === "unet") return "diffusion";
  if (folder === "loras") return "lora";
  if (folder === "vae") return "vae";
  if (folder === "text_encoders" || folder === "clip") return "textEncoder";
  return null;
}

export function nodeSize(kind: NodeKind): { w: number; h: number } {
  switch (kind) {
    case "diffusion":
      return { w: 248, h: 132 };
    case "lora":
      return { w: 248, h: 132 };
    case "textEncoder":
      return { w: 248, h: 118 };
    case "vae":
      return { w: 220, h: 108 };
    case "prompt":
      return { w: 280, h: 150 };
    case "sampler":
      return { w: 248, h: 156 };
    case "save":
      return { w: 210, h: 104 };
  }
}

export function portsFor(kind: NodeKind): { inputs: PortDef[]; outputs: PortDef[] } {
  switch (kind) {
    case "diffusion":
      return { inputs: [], outputs: [{ name: "model", label: "Model", kind: "model" }] };
    case "lora":
      return {
        inputs: [
          { name: "model", label: "Model", kind: "model" },
          { name: "clip", label: "CLIP", kind: "clip" },
        ],
        outputs: [
          { name: "model", label: "Model", kind: "model" },
          { name: "clip", label: "CLIP", kind: "clip" },
        ],
      };
    case "textEncoder":
      return { inputs: [], outputs: [{ name: "clip", label: "CLIP", kind: "clip" }] };
    case "vae":
      return { inputs: [], outputs: [{ name: "vae", label: "VAE", kind: "vae" }] };
    case "prompt":
      return {
        inputs: [{ name: "clip", label: "CLIP", kind: "clip" }],
        outputs: [{ name: "cond", label: "Conditioning", kind: "cond" }],
      };
    case "sampler":
      return {
        inputs: [
          { name: "model", label: "Model", kind: "model" },
          { name: "positive", label: "Positive", kind: "cond" },
          { name: "negative", label: "Negative", kind: "cond" },
          { name: "vae", label: "VAE", kind: "vae" },
        ],
        outputs: [{ name: "image", label: "Image", kind: "image" }],
      };
    case "save":
      return { inputs: [{ name: "image", label: "Image", kind: "image" }], outputs: [] };
  }
}

export function portPosition(
  node: GraphNode,
  side: "in" | "out",
  index: number,
  count: number,
): { x: number; y: number } {
  const { w, h } = nodeSize(node.kind);
  const gap = 22;
  const block = Math.max(count, 1) * gap;
  const y = node.y + (h - block) / 2 + gap / 2 + index * gap;
  return { x: side === "in" ? node.x : node.x + w, y };
}

export function portLocalY(index: number, count: number, height: number): number {
  const gap = 22;
  const block = Math.max(count, 1) * gap;
  return (height - block) / 2 + gap / 2 + index * gap;
}

export function kindLabel(kind: NodeKind): string {
  switch (kind) {
    case "diffusion":
      return "Diffusion";
    case "lora":
      return "LoRA";
    case "textEncoder":
      return "Text encoder";
    case "vae":
      return "VAE";
    case "prompt":
      return "Prompt";
    case "sampler":
      return "Sampler";
    case "save":
      return "Save";
  }
}

export function findModel(models: ModelFile[], id?: string): ModelFile | null {
  if (!id) return null;
  return models.find((m) => m.id === id) ?? null;
}

export function nodeTitle(node: GraphNode, models: ModelFile[]): string {
  if (node.kind === "prompt") return node.data.role === "negative" ? "Negative" : "Positive";
  if (node.kind === "sampler") return "KSampler";
  if (node.kind === "save") return node.data.prefix || "locgen";
  const model = findModel(models, node.data.modelId);
  return model ? baseName(model.name) : "Choose a file";
}

export function nodeSubtitle(node: GraphNode, models: ModelFile[]): string {
  const model = findModel(models, node.data.modelId);
  if (node.kind === "prompt") {
    const text = (node.data.text ?? "").trim();
    if (!text && node.data.role === "negative") return "Optional. A blank negative is normal for Flux.";
    return text || "Write the prompt";
  }
  if (node.kind === "sampler") {
    const guidance = node.data.cfg ?? 1;
    return `${node.data.sampler ?? "euler"} · ${node.data.scheduler ?? "simple"} · ${node.data.steps ?? 20} steps · ${guidance} cfg · ${node.data.width ?? 1024}×${node.data.height ?? 1024}`;
  }
  if (node.kind === "save") return "SaveImage prefix";
  if (node.kind === "lora") {
    return `model ${node.data.strengthModel ?? 1} · clip ${node.data.strengthClip ?? 1}`;
  }
  if (!model) return "Pick a weight from the library";
  const folder = folderById(model.folder)?.label ?? model.folder;
  return `${familyLabel(model.family)} · ${folder} · ${formatBytes(model.bytes)}`;
}

function demo(
  id: string,
  name: string,
  folder: FolderId,
  bytes: number,
  family: Family,
  note?: string,
): ModelFile {
  return { id, name, folder, bytes, family, source: "demo", note };
}

export function demoModels(): ModelFile[] {
  return [
    demo("ckpt-sdxl", "sd_xl_base_1.0.safetensors", "checkpoints", 6_938_078_334, "sdxl", "Base SDXL checkpoint. CLIP and VAE ride inside it."),
    demo("ckpt-jug", "juggernautXL_v9.safetensors", "checkpoints", 7_100_000_000, "sdxl", "Popular photoreal SDXL finetune."),
    demo("ckpt-15", "v1-5-pruned-emaonly.safetensors", "checkpoints", 4_265_146_304, "sd15"),
    demo("unet-flux-dev", "flux1-dev-fp8.safetensors", "diffusion_models", 11_900_000_000, "flux", "Flux dev DiT. Needs CLIP-L, T5-XXL and ae.safetensors."),
    demo("unet-flux-schnell", "flux1-schnell-fp8.safetensors", "diffusion_models", 11_900_000_000, "flux", "Four-step Flux. Guidance stays near 1."),
    demo("unet-klein", "flux-2-klein-9b.safetensors", "diffusion_models", 9_000_000_000, "flux2", "Flux 2 Klein. One Qwen3 encoder and flux2-vae."),
    demo("unet-krea2", "krea2_turbo_fp8.safetensors", "diffusion_models", 8_200_000_000, "krea2", "Krea 2 turbo. Qwen3-VL 4B and the Qwen image VAE. 8 steps, CFG 1."),
    demo("unet-qwen", "qwen_image_2.1_int8_convrot.safetensors", "diffusion_models", 7_260_000_000, "qwen", "Qwen Image 2.1. Qwen3-VL 8B and qwen_image_2.1_vae."),
    demo("unet-zimage", "z_image_turbo_bf16.safetensors", "diffusion_models", 6_200_000_000, "zimage", "Z-Image Turbo. About 8 steps, CFG 1."),
    demo("unet-wan", "wan2.2_t2v_fp8.safetensors", "diffusion_models", 14_000_000_000, "wan", "Wan 2.2 text to video. UMT5-XXL and the Wan VAE."),
    demo("unet-ltx", "ltx-2.5-22b-distilled.safetensors", "diffusion_models", 22_000_000_000, "ltxv", "LTX 2.5 distilled. Gemma encoder and the video VAE."),
    demo("unet-h3", "minimax_h3_fl2va_fp8.safetensors", "diffusion_models", 16_000_000_000, "minimax", "MiniMax H3. Qwen3-VL encoder and the video VAE."),
    demo("lora-realism", "flux_realism.safetensors", "loras", 164_000_000, "flux"),
    demo("lora-skin", "skin_detail_flux.safetensors", "loras", 148_000_000, "flux"),
    demo("lora-body", "body_identity_flux.safetensors", "loras", 219_000_000, "flux", "Body-only adapter. Keep the face on a separate reference pass."),
    demo("lora-detail-xl", "detail_tweaker_xl.safetensors", "loras", 98_000_000, "sdxl"),
    demo("lora-more", "add_more_details.safetensors", "loras", 148_000_000, "sdxl"),
    demo("vae-ae", "ae.safetensors", "vae", 335_304_388, "flux", "Flux / SD3 autoencoder."),
    demo("vae-flux2", "flux2-vae.safetensors", "vae", 335_000_000, "flux2"),
    demo("vae-qwen", "qwen_image_vae.safetensors", "vae", 250_000_000, "krea2", "Shared by Krea 2 and earlier Qwen Image."),
    demo("vae-qwen21", "qwen_image_2.1_vae_bf16.safetensors", "vae", 676_000_000, "qwen"),
    demo("vae-wan", "wan_2.1_vae.safetensors", "vae", 250_000_000, "wan", "Wan 2.2 still uses this video VAE."),
    demo("vae-ltx", "ltx-2.5-video-vae-bf16.safetensors", "vae", 800_000_000, "ltxv"),
    demo("vae-h3", "minimax_h3_video_vae_fp16.safetensors", "vae", 500_000_000, "minimax"),
    demo("vae-xl", "sdxl_vae.safetensors", "vae", 334_641_162, "sdxl"),
    demo("vae-mse", "vae-ft-mse-840000-ema-pruned.safetensors", "vae", 334_641_190, "sd15"),
    demo("te-clip-l", "clip_l.safetensors", "text_encoders", 246_144_152, "clip", "CLIP-L. First tower in DualCLIPLoader."),
    demo("te-clip-g", "clip_g.safetensors", "text_encoders", 1_360_000_000, "clip"),
    demo("te-t5", "t5xxl_fp8_e4m3fn.safetensors", "text_encoders", 4_890_000_000, "flux", "T5-XXL fp8. Second tower for Flux."),
    demo("te-t5-fp16", "t5xxl_fp16.safetensors", "text_encoders", 9_770_000_000, "flux"),
    demo("te-qwen4b", "qwen3vl_4b_fp8.safetensors", "text_encoders", 4_200_000_000, "krea2", "Krea 2 text encoder."),
    demo("te-qwen8b", "qwen3vl_8b_int8_convrot.safetensors", "text_encoders", 9_350_000_000, "qwen", "Qwen Image 2.1 text encoder."),
    demo("te-qwen3", "qwen_3_8b.safetensors", "text_encoders", 8_000_000_000, "flux2", "Flux 2 Klein text encoder. Z-Image can use the 4B sibling."),
    demo("te-umt5", "umt5_xxl_fp8_e4m3fn.safetensors", "text_encoders", 6_700_000_000, "wan"),
    demo("te-gemma", "gemma4_12b_ltx_2.5.safetensors", "text_encoders", 12_000_000_000, "ltxv"),
    demo("te-h3", "qwen3vl_32b_minimax_h3_fp8.safetensors", "text_encoders", 18_000_000_000, "minimax"),
    demo("cv-siglip", "sigclip_vision_patch14_384.safetensors", "clip_vision", 857_000_000, "generic"),
    demo("emb-easy", "EasyNegative.safetensors", "embeddings", 25_000, "sd15", "Drop the file name into a negative prompt."),
    demo("emb-hand", "badhandv4.pt", "embeddings", 48_000, "generic"),
    demo("cn-canny", "controlnet-canny-sdxl.safetensors", "controlnet", 2_500_000_000, "sdxl"),
    demo("up-ultra", "4x-UltraSharp.pth", "upscale_models", 67_000_000, "generic"),
    demo("up-esr", "RealESRGAN_x4plus.pth", "upscale_models", 67_000_000, "generic"),
  ];
}

function node(
  id: string,
  kind: NodeKind,
  x: number,
  y: number,
  data: NodeData,
): GraphNode {
  return { id, kind, x, y, data };
}

function edge(id: string, fromNode: string, fromPort: string, toNode: string, toPort: string): GraphEdge {
  return { id, fromNode, fromPort, toNode, toPort };
}

export function fluxWorkflow(): Workflow {
  return {
    id: "wf-flux",
    name: "Flux portrait",
    pan: { x: 28, y: 96 },
    zoom: 0.84,
    selectedId: null,
    nodes: [
      node("clip-l", "textEncoder", 28, 8, { modelId: "te-clip-l" }),
      node("t5", "textEncoder", 28, 156, { modelId: "te-t5" }),
      node("unet", "diffusion", 28, 320, { modelId: "unet-flux-dev", weightDtype: "default" }),
      node("vae", "vae", 28, 490, { modelId: "vae-ae" }),
      node("pos", "prompt", 470, 8, {
        role: "positive",
        text: "Photoreal editorial portrait, soft window light, natural skin with visible pores and fine hair, shallow depth of field, 85mm lens, quiet expression",
      }),
      node("neg", "prompt", 470, 200, {
        role: "negative",
        text: "",
      }),
      node("lora", "lora", 470, 400, { modelId: "lora-realism", strengthModel: 0.75, strengthClip: 0.75 }),
      node("sam", "sampler", 860, 150, {
        steps: 20,
        cfg: 3.5,
        sampler: "euler",
        scheduler: "simple",
        seed: 770411,
        width: 1024,
        height: 1024,
        batch: 1,
        denoise: 1,
      }),
      node("save", "save", 860, 360, { prefix: "locgen/flux" }),
    ],
    edges: [
      edge("e1", "clip-l", "clip", "pos", "clip"),
      edge("e2", "t5", "clip", "pos", "clip"),
      edge("e5", "unet", "model", "lora", "model"),
      edge("e6", "lora", "model", "sam", "model"),
      edge("e7", "pos", "cond", "sam", "positive"),
      edge("e8", "neg", "cond", "sam", "negative"),
      edge("e9", "vae", "vae", "sam", "vae"),
      edge("e10", "sam", "image", "save", "image"),
    ],
  };
}

export function schnellWorkflow(): Workflow {
  return {
    id: "wf-schnell",
    name: "Flux Schnell",
    pan: { x: 40, y: 96 },
    zoom: 0.95,
    selectedId: null,
    nodes: [
      node("clip-l", "textEncoder", 28, 8, { modelId: "te-clip-l" }),
      node("t5", "textEncoder", 28, 156, { modelId: "te-t5" }),
      node("unet", "diffusion", 28, 320, { modelId: "unet-flux-schnell", weightDtype: "default" }),
      node("vae", "vae", 28, 490, { modelId: "vae-ae" }),
      node("pos", "prompt", 400, 24, {
        role: "positive",
        text: "Sunlit Kerala courtyard, cotton clothes, natural color, documentary photograph, sharp but not plastic",
      }),
      node("sam", "sampler", 780, 160, {
        steps: 4,
        cfg: 1,
        sampler: "euler",
        scheduler: "simple",
        seed: 12,
        width: 1024,
        height: 1024,
        batch: 1,
        denoise: 1,
      }),
      node("save", "save", 780, 360, { prefix: "locgen/schnell" }),
    ],
    edges: [
      edge("e1", "clip-l", "clip", "pos", "clip"),
      edge("e2", "t5", "clip", "pos", "clip"),
      edge("e3", "unet", "model", "sam", "model"),
      edge("e4", "pos", "cond", "sam", "positive"),
      edge("e5", "vae", "vae", "sam", "vae"),
      edge("e6", "sam", "image", "save", "image"),
    ],
  };
}

function towerWorkflow(spec: {
  id: string;
  name: string;
  diffusionId: string;
  textId: string;
  vaeId: string;
  prompt: string;
  steps: number;
  cfg: number;
  width: number;
  height: number;
  frames?: number;
  prefix: string;
}): Workflow {
  return {
    id: spec.id,
    name: spec.name,
    pan: { x: 36, y: 96 },
    zoom: 0.9,
    selectedId: null,
    nodes: [
      node("te", "textEncoder", 28, 16, { modelId: spec.textId }),
      node("unet", "diffusion", 28, 180, { modelId: spec.diffusionId, weightDtype: "default" }),
      node("vae", "vae", 28, 360, { modelId: spec.vaeId }),
      node("pos", "prompt", 470, 24, { role: "positive", text: spec.prompt }),
      node("sam", "sampler", 860, 140, {
        steps: spec.steps,
        cfg: spec.cfg,
        sampler: "euler",
        scheduler: "simple",
        seed: 2104,
        width: spec.width,
        height: spec.height,
        batch: 1,
        frames: spec.frames ?? 1,
        denoise: 1,
      }),
      node("save", "save", 860, 360, { prefix: spec.prefix }),
    ],
    edges: [
      edge("e1", "te", "clip", "pos", "clip"),
      edge("e2", "unet", "model", "sam", "model"),
      edge("e3", "pos", "cond", "sam", "positive"),
      edge("e4", "vae", "vae", "sam", "vae"),
      edge("e5", "sam", "image", "save", "image"),
    ],
  };
}

export function kleinWorkflow(): Workflow {
  return towerWorkflow({
    id: "wf-klein",
    name: "Flux 2 Klein",
    diffusionId: "unet-klein",
    textId: "te-qwen3",
    vaeId: "vae-flux2",
    prompt: "Photoreal portrait, natural skin, window light, 85mm, quiet expression",
    steps: 4,
    cfg: 1,
    width: 1024,
    height: 1024,
    prefix: "locgen/klein",
  });
}

export function krea2Workflow(): Workflow {
  return towerWorkflow({
    id: "wf-krea2",
    name: "Krea 2",
    diffusionId: "unet-krea2",
    textId: "te-qwen4b",
    vaeId: "vae-qwen",
    prompt: "Editorial photograph, natural color, fine skin texture, soft daylight",
    steps: 8,
    cfg: 1,
    width: 1024,
    height: 1024,
    prefix: "locgen/krea2",
  });
}

export function qwenWorkflow(): Workflow {
  return towerWorkflow({
    id: "wf-qwen",
    name: "Qwen Image 2.1",
    diffusionId: "unet-qwen",
    textId: "te-qwen8b",
    vaeId: "vae-qwen21",
    prompt: "A paper poster on a studio wall, clear lettering, soft shadow, photograph",
    steps: 20,
    cfg: 1,
    width: 1328,
    height: 1328,
    prefix: "locgen/qwen",
  });
}

export function zimageWorkflow(): Workflow {
  return towerWorkflow({
    id: "wf-zimage",
    name: "Z-Image Turbo",
    diffusionId: "unet-zimage",
    textId: "te-qwen3",
    vaeId: "vae-qwen",
    prompt: "Close portrait, visible pores, afternoon light, 50mm photograph",
    steps: 8,
    cfg: 1,
    width: 1024,
    height: 1024,
    prefix: "locgen/zimage",
  });
}

export function wanWorkflow(): Workflow {
  return towerWorkflow({
    id: "wf-wan",
    name: "Wan 2.2",
    diffusionId: "unet-wan",
    textId: "te-umt5",
    vaeId: "vae-wan",
    prompt: "A person walks toward camera on a shaded road, natural motion, steady shot",
    steps: 20,
    cfg: 5,
    width: 832,
    height: 480,
    frames: 49,
    prefix: "locgen/wan",
  });
}

export function ltxWorkflow(): Workflow {
  return towerWorkflow({
    id: "wf-ltx",
    name: "LTX 2.5",
    diffusionId: "unet-ltx",
    textId: "te-gemma",
    vaeId: "vae-ltx",
    prompt: "Handheld shot, a cup of tea set on a wooden table, steam rising",
    steps: 8,
    cfg: 1,
    width: 768,
    height: 448,
    frames: 49,
    prefix: "locgen/ltx",
  });
}

export function minimaxWorkflow(): Workflow {
  return towerWorkflow({
    id: "wf-minimax",
    name: "MiniMax H3",
    diffusionId: "unet-h3",
    textId: "te-h3",
    vaeId: "vae-h3",
    prompt: "A slow push-in on a face, natural blink, quiet room tone",
    steps: 20,
    cfg: 1,
    width: 768,
    height: 448,
    frames: 49,
    prefix: "locgen/minimax",
  });
}

export function sdxlWorkflow(): Workflow {
  return {
    id: "wf-sdxl",
    name: "SDXL base",
    pan: { x: 48, y: 100 },
    zoom: 1,
    selectedId: null,
    nodes: [
      node("ckpt", "diffusion", 28, 80, { modelId: "ckpt-sdxl", weightDtype: "default" }),
      node("pos", "prompt", 380, 8, {
        role: "positive",
        text: "full body fashion photograph, linen shirt, late afternoon light, realistic skin, 50mm",
      }),
      node("neg", "prompt", 380, 190, {
        role: "negative",
        text: "blurry, extra fingers, watermark, plastic skin, EasyNegative",
      }),
      node("lora", "lora", 380, 390, { modelId: "lora-detail-xl", strengthModel: 0.6, strengthClip: 0.6 }),
      node("sam", "sampler", 760, 120, {
        steps: 28,
        cfg: 6,
        sampler: "dpmpp_2m",
        scheduler: "karras",
        seed: 404,
        width: 1024,
        height: 1024,
        batch: 1,
        denoise: 1,
      }),
      node("save", "save", 760, 340, { prefix: "locgen/sdxl" }),
    ],
    edges: [
      edge("e1", "ckpt", "model", "lora", "model"),
      edge("e2", "lora", "model", "sam", "model"),
      edge("e3", "pos", "cond", "sam", "positive"),
      edge("e4", "neg", "cond", "sam", "negative"),
      edge("e5", "sam", "image", "save", "image"),
    ],
  };
}

export function blankNode(kind: NodeKind, x: number, y: number): GraphNode {
  const id = uid(kind.slice(0, 3));
  const data: NodeData = {};
  if (kind === "lora") {
    data.strengthModel = 0.8;
    data.strengthClip = 0.8;
  }
  if (kind === "diffusion") data.weightDtype = "default";
  if (kind === "prompt") {
    data.role = "positive";
    data.text = "";
  }
  if (kind === "sampler") {
    data.steps = 20;
    data.cfg = 3.5;
    data.sampler = "euler";
    data.scheduler = "simple";
    data.seed = Math.floor(Math.random() * 1_000_000);
    data.width = 1024;
    data.height = 1024;
    data.batch = 1;
    data.denoise = 1;
  }
  if (kind === "save") data.prefix = "locgen";
  return { id, kind, x, y, data };
}

export const SAMPLERS = ["euler", "euler_ancestral", "dpmpp_2m", "dpmpp_sde", "uni_pc", "heun", "ddim", "lcm"];
export const SCHEDULERS = ["simple", "normal", "karras", "beta", "exponential", "sgm_uniform"];

export function inferenceBlock(workflow: Workflow, models: ModelFile[]): string | null {
  const ids = workflow.nodes.map((node) => node.data.modelId).filter((id): id is string => Boolean(id));
  if (ids.length === 0) return "Choose weights from the models folder before running.";
  const used = ids.map((id) => models.find((model) => model.id === id)).filter((model): model is ModelFile => Boolean(model));
  if (used.length === 0 || used.some((model) => model.source === "demo")) {
    return "This graph still points at the sample library. Link the models folder and pick the files on disk.";
  }
  return null;
}

export function modelsForKind(models: ModelFile[], kind: NodeKind): ModelFile[] {
  return models.filter((m) => kindForFolder(m.folder) === kind);
}
