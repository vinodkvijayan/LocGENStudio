import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Dices, Trash2 } from "lucide-react";
import { readStudioImage } from "@/lib/studio/image";
import {
  EDIT_MODES,
  ENHANCE_SYSTEM,
  LLM_ENDPOINTS,
  SAMPLERS,
  SCHEDULERS,
  findModel,
  folderById,
  kindLabel,
  modelsForKind,
  nodeTitle,
  portsFor,
  type EditMode,
  type GraphNode,
  type PortKind,
} from "@/lib/studio/model";
import { listLlmModels } from "@/lib/studio/engine";
import { useActive, useStudio } from "@/lib/studio/store";

export function Inspector({ dock = false }: { dock?: boolean }) {
  const workflow = useActive();
  const models = useStudio((s) => s.models);
  const patchNode = useStudio((s) => s.patchNode);
  const connect = useStudio((s) => s.connect);
  const disconnectPort = useStudio((s) => s.disconnectPort);
  const removeSelected = useStudio((s) => s.removeSelected);
  const node = workflow.nodes.find((n) => n.id === workflow.selectedId) ?? null;

  if (!node) {
    return (
      <div className="flex h-full flex-col justify-end p-4">
        <p className="font-display text-2xl text-fg">Nothing selected</p>
        <p className="mt-2 text-sm leading-relaxed text-pretty text-muted">
          Pick a card to set its weight, prompt or sampler. On a phone, the links are dropdowns here — you do not have to drag ports.
        </p>
      </div>
    );
  }

  const inputs = portsFor(node.kind).inputs;

  return (
    <div className={`flex h-full flex-col ${dock ? "" : "border-l border-line"}`}>
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs tracking-widest text-muted uppercase">{kindLabel(node.kind)}</p>
          <h2 className="truncate font-display text-2xl text-fg">{nodeTitle(node, models)}</h2>
        </div>
        <button type="button" onClick={removeSelected} className="flex size-11 items-center justify-center rounded-full text-muted" aria-label="Delete node">
          <Trash2 className="size-4" />
        </button>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-auto px-4 py-4">
        <ModelField node={node} />
        {node.kind === "image" ? <ImageFields node={node} /> : null}
        {node.kind === "enhance" ? <EnhanceFields node={node} /> : null}
        {node.kind === "preview" ? (
          <p className="text-sm leading-relaxed text-muted">Wire an image into this card to see it here and on the canvas. Preview also opens the latest result of this graph.</p>
        ) : null}
        {node.kind === "diffusion" ? (
          <label className="block text-sm text-muted">
            Weight dtype
            <select
              className="field mt-1"
              value={node.data.weightDtype ?? "default"}
              onChange={(e) => patchNode(node.id, { weightDtype: e.target.value as "default" | "fp8_e4m3fn" | "fp8_e5m2" })}
            >
              <option value="default">default</option>
              <option value="fp8_e4m3fn">fp8 e4m3fn</option>
              <option value="fp8_e5m2">fp8 e5m2</option>
            </select>
          </label>
        ) : null}
        {node.kind === "lora" ? (
          <div className="grid grid-cols-2 gap-3">
            <Num label="Model strength" value={node.data.strengthModel ?? 1} step={0.05} min={-2} max={2} onChange={(n) => patchNode(node.id, { strengthModel: n })} />
            <Num label="CLIP strength" value={node.data.strengthClip ?? 1} step={0.05} min={-2} max={2} onChange={(n) => patchNode(node.id, { strengthClip: n })} />
          </div>
        ) : null}
        {node.kind === "prompt" ? (
          <label className="block text-sm text-muted">
            Text
            <textarea
              className="field mt-1 min-h-32 resize-y"
              value={node.data.text ?? ""}
              onChange={(e) => patchNode(node.id, { text: e.target.value })}
              placeholder="Describe the picture. Embedding names go here as tokens."
            />
          </label>
        ) : null}
        {node.kind === "sampler" ? <SamplerFields node={node} /> : null}
        {node.kind === "save" ? (
          <label className="block text-sm text-muted">
            Filename prefix
            <input className="field mt-1" value={node.data.prefix ?? ""} onChange={(e) => patchNode(node.id, { prefix: e.target.value })} />
          </label>
        ) : null}
        {findModel(models, node.data.modelId)?.note ? (
          <p className="text-sm leading-relaxed text-pretty text-muted">{findModel(models, node.data.modelId)?.note}</p>
        ) : null}
        {inputs.length ? (
          <div className="space-y-3 border-t border-line pt-3">
            <p className="text-xs tracking-widest text-muted uppercase">Connections</p>
            {inputs.map((port) => {
              const links = workflow.edges.filter((e) => e.toNode === node.id && e.toPort === port.name);
              const options = outputChoices(workflow.nodes, port.kind, node.id, models);
              return (
                <div key={port.name}>
                  <p className="text-sm text-muted">{port.label}</p>
                  {links.map((link) => {
                    const src = workflow.nodes.find((n) => n.id === link.fromNode);
                    return (
                      <div key={link.id} className="mt-1 flex items-center justify-between gap-2 rounded-lg bg-bg px-3 py-2 text-sm">
                        <span className="truncate">{src ? nodeTitle(src, models) : "Missing"}</span>
                        <button type="button" className="text-signal" onClick={() => disconnectPort(node.id, port.name, link.fromNode)}>
                          Remove
                        </button>
                      </div>
                    );
                  })}
                  <select
                    className="field mt-1"
                    value=""
                    onChange={(e) => {
                      if (!e.target.value) return;
                      const [fromNode, fromPort] = e.target.value.split("|");
                      connect(fromNode, fromPort, node.id, port.name);
                    }}
                  >
                    <option value="">{links.length ? "Add another source" : "Choose a source"}</option>
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        ) : null}
        {folderHint(node, models) ? <p className="text-xs leading-relaxed text-muted">{folderHint(node, models)}</p> : null}
      </div>
    </div>
  );
}

function ModelField({ node }: { node: GraphNode }) {
  const models = useStudio((s) => s.models);
  const patchNode = useStudio((s) => s.patchNode);
  if (node.kind === "prompt" || node.kind === "sampler" || node.kind === "save" || node.kind === "image" || node.kind === "preview" || node.kind === "enhance") return null;
  const options = modelsForKind(models, node.kind);
  return (
    <label className="block text-sm text-muted">
      File in the model root
      <select className="field mt-1" value={node.data.modelId ?? ""} onChange={(e) => patchNode(node.id, { modelId: e.target.value || undefined })}>
        <option value="">Choose a file</option>
        {options.map((model) => (
          <option key={model.id} value={model.id}>
            {model.name} · {folderById(model.folder)?.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SamplerFields({ node }: { node: GraphNode }) {
  const patchNode = useStudio((s) => s.patchNode);
  const d = node.data;
  const mode = d.editMode ?? "generate";
  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted">
        Mode
        <select
          className="field mt-1"
          value={mode}
          onChange={(e) => patchNode(node.id, { editMode: e.target.value as EditMode, denoise: e.target.value === "generate" ? 1 : (d.denoise && d.denoise < 1 ? d.denoise : 0.55) })}
        >
          {EDIT_MODES.map((item) => (
            <option key={item.id} value={item.id}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      <p className="text-sm leading-relaxed text-muted">
        {mode === "generate"
          ? "A new picture from the prompt."
          : mode === "edit"
            ? "Img2img. Connect an image. Denoise is how far the model is allowed to move from it."
            : mode === "inpaint"
              ? "Paint a mask on the image. The model changes only that area."
              : "Grows the canvas by the padding below, then fills the new area."}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Num label="Steps" value={d.steps ?? 20} step={1} min={1} max={150} onChange={(n) => patchNode(node.id, { steps: n })} />
        <Num label="CFG / guidance" value={d.cfg ?? 1} step={0.1} min={0} max={30} onChange={(n) => patchNode(node.id, { cfg: n })} />
        {mode === "generate" ? (
          <>
            <Num label="Width" value={d.width ?? 1024} step={64} min={256} max={2560} onChange={(n) => patchNode(node.id, { width: n })} />
            <Num label="Height" value={d.height ?? 1024} step={64} min={256} max={2560} onChange={(n) => patchNode(node.id, { height: n })} />
            <Num label="Frames" value={d.frames ?? 1} step={1} min={1} max={241} onChange={(n) => patchNode(node.id, { frames: n })} />
          </>
        ) : null}
        <Num label="Batch" value={d.batch ?? 1} step={1} min={1} max={8} onChange={(n) => patchNode(node.id, { batch: n })} />
        <Num label="Denoise" value={d.denoise ?? 1} step={0.05} min={0} max={1} onChange={(n) => patchNode(node.id, { denoise: n })} />
      </div>
      {mode === "outpaint" ? (
        <div className="grid grid-cols-2 gap-3">
          <Num label="Pad left" value={d.padLeft ?? 128} step={8} min={0} max={1024} onChange={(n) => patchNode(node.id, { padLeft: n })} />
          <Num label="Pad right" value={d.padRight ?? 128} step={8} min={0} max={1024} onChange={(n) => patchNode(node.id, { padRight: n })} />
          <Num label="Pad top" value={d.padTop ?? 128} step={8} min={0} max={1024} onChange={(n) => patchNode(node.id, { padTop: n })} />
          <Num label="Pad bottom" value={d.padBottom ?? 128} step={8} min={0} max={1024} onChange={(n) => patchNode(node.id, { padBottom: n })} />
        </div>
      ) : null}
      <label className="block text-sm text-muted">
        Sampler
        <select className="field mt-1" value={d.sampler ?? "euler"} onChange={(e) => patchNode(node.id, { sampler: e.target.value })}>
          {SAMPLERS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-muted">
        Scheduler
        <select className="field mt-1" value={d.scheduler ?? "simple"} onChange={(e) => patchNode(node.id, { scheduler: e.target.value })}>
          {SCHEDULERS.map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-muted">
        Seed
        <span className="mt-1 flex gap-2">
          <input
            className="field tabular-nums"
            type="number"
            value={d.seed ?? 0}
            onChange={(e) => patchNode(node.id, { seed: Number(e.target.value) })}
          />
          <button
            type="button"
            className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-line"
            aria-label="Random seed"
            onClick={() => patchNode(node.id, { seed: Math.floor(Math.random() * 1_000_000_000) })}
          >
            <Dices className="size-4" />
          </button>
        </span>
      </label>
    </div>
  );
}

function Num({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <label className="block text-sm text-muted">
      {label}
      <input
        className="field mt-1 tabular-nums"
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

function outputChoices(nodes: GraphNode[], kind: PortKind, selfId: string, models: ReturnType<typeof useStudio.getState>["models"]) {
  const options: { value: string; label: string }[] = [];
  for (const node of nodes) {
    if (node.id === selfId) continue;
    for (const port of portsFor(node.kind).outputs) {
      if (port.kind !== kind) continue;
      options.push({ value: `${node.id}|${port.name}`, label: `${nodeTitle(node, models)} · ${port.label}` });
    }
  }
  return options;
}

function folderHint(node: GraphNode, models: ReturnType<typeof useStudio.getState>["models"]) {
  const model = findModel(models, node.data.modelId);
  if (!model) return "";
  const folder = folderById(model.folder);
  if (node.kind === "diffusion" && (model.family === "flux" || model.folder === "diffusion_models")) {
    return "UNETLoader reads diffusion_models and unet. Pair it with CLIP-L, T5 and ae.safetensors.";
  }
  if (node.kind === "textEncoder") return `${folder?.label} is searched by CLIPLoader and DualCLIPLoader.`;
  if (node.kind === "lora") return "Placed in loras/. Strength is applied in chain order, closest to the sampler last.";
  return "";
}

function ImageFields({ node }: { node: GraphNode }) {
  const patchNode = useStudio((s) => s.patchNode);
  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted">
        Picture
        <input
          type="file"
          accept="image/*"
          className="field mt-1"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            void readStudioImage(file).then((image) =>
              patchNode(node.id, {
                imageName: image.name,
                imageData: image.data,
                imageWidth: image.width,
                imageHeight: image.height,
                maskData: undefined,
              }),
            );
          }}
        />
      </label>
      {node.data.imageData ? (
        <MaskPainter
          image={node.data.imageData}
          mask={node.data.maskData}
          width={node.data.imageWidth ?? 512}
          height={node.data.imageHeight ?? 512}
          onChange={(maskData) => patchNode(node.id, { maskData })}
        />
      ) : (
        <p className="text-sm text-muted">Drop a picture on the canvas, or choose one here. Then set the sampler to Edit, Inpaint, or Outpaint.</p>
      )}
    </div>
  );
}

function MaskPainter({
  image,
  mask,
  width,
  height,
  onChange,
}: {
  image: string;
  mask?: string;
  width: number;
  height: number;
  onChange: (mask: string) => void;
}) {
  const viewRef = useRef<HTMLCanvasElement>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const board = document.createElement("canvas");
    board.width = width;
    board.height = height;
    const ctx = board.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    maskRef.current = board;
    const paint = () => drawView(viewRef.current, board, image, width, height);
    if (!mask) {
      paint();
      return;
    }
    const overlay = new Image();
    overlay.onload = () => {
      ctx.drawImage(overlay, 0, 0, width, height);
      paint();
    };
    overlay.src = mask;
  }, [image, mask, width, height]);

  function stroke(event: ReactPointerEvent<HTMLCanvasElement>, end = false) {
    const board = maskRef.current;
    const view = viewRef.current;
    if (!board || !view) return;
    const ctx = board.getContext("2d");
    if (!ctx) return;
    const rect = view.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * width;
    const y = ((event.clientY - rect.top) / rect.height) * height;
    if (drawing.current || event.type === "pointerdown") {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(x, y, Math.max(12, width / 28), 0, Math.PI * 2);
      ctx.fill();
      drawView(view, board, image, width, height);
    }
    if (end) {
      drawing.current = false;
      onChange(board.toDataURL("image/png"));
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm text-muted">Paint the area to change. Used by Inpaint. Outpaint grows the frame instead.</p>
      <canvas
        ref={viewRef}
        width={width}
        height={height}
        className="w-full cursor-crosshair rounded-xl bg-bg"
        onPointerDown={(event) => {
          drawing.current = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          stroke(event);
        }}
        onPointerMove={(event) => {
          if (!drawing.current) return;
          stroke(event);
        }}
        onPointerUp={(event) => stroke(event, true)}
      />
      <button
        type="button"
        className="h-10 rounded-full border border-line px-3 text-sm"
        onClick={() => {
          const board = maskRef.current;
          const ctx = board?.getContext("2d");
          if (!board || !ctx) return;
          ctx.fillStyle = "#000";
          ctx.fillRect(0, 0, width, height);
          drawView(viewRef.current, board, image, width, height);
          onChange("");
        }}
      >
        Clear mask
      </button>
    </div>
  );
}

function drawView(view: HTMLCanvasElement | null, mask: HTMLCanvasElement, image: string, width: number, height: number) {
  if (!view) return;
  const ctx = view.getContext("2d");
  const maskCtx = mask.getContext("2d");
  if (!ctx || !maskCtx) return;
  const paint = (photo: HTMLImageElement) => {
    ctx.drawImage(photo, 0, 0, width, height);
    const marks = maskCtx.getImageData(0, 0, width, height);
    const frame = ctx.getImageData(0, 0, width, height);
    for (let i = 0; i < marks.data.length; i += 4) {
      const amount = (marks.data[i] / 255) * 0.55;
      if (amount < 0.02) continue;
      frame.data[i] = Math.round(frame.data[i] * (1 - amount) + 158 * amount);
      frame.data[i + 1] = Math.round(frame.data[i + 1] * (1 - amount) + 203 * amount);
      frame.data[i + 2] = Math.round(frame.data[i + 2] * (1 - amount) + 182 * amount);
    }
    ctx.putImageData(frame, 0, 0);
  };
  const cached = photoCache.get(image);
  if (cached?.complete) {
    paint(cached);
    return;
  }
  const photo = new Image();
  photo.onload = () => {
    photoCache.set(image, photo);
    paint(photo);
  };
  photo.src = image;
}

const photoCache = new Map<string, HTMLImageElement>();

function EnhanceFields({ node }: { node: GraphNode }) {
  const patchNode = useStudio((s) => s.patchNode);
  const engineUrl = useStudio((s) => s.engineUrl);
  const [models, setModels] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const d = node.data;
  return (
    <div className="space-y-3">
      <label className="block text-sm text-muted">
        System prompt
        <textarea className="field mt-1 min-h-24 resize-y" value={d.system ?? ENHANCE_SYSTEM} onChange={(e) => patchNode(node.id, { system: e.target.value })} />
      </label>
      <label className="block text-sm text-muted">
        Prompt to rewrite
        <textarea
          className="field mt-1 min-h-24 resize-y"
          value={d.text ?? ""}
          placeholder="What should change, or the prompt to expand"
          onChange={(e) => patchNode(node.id, { text: e.target.value })}
        />
      </label>
      <label className="block text-sm text-muted">
        LLM server
        <select className="field mt-1" value={d.endpoint ?? LLM_ENDPOINTS[0].url} onChange={(e) => patchNode(node.id, { endpoint: e.target.value })}>
          {LLM_ENDPOINTS.map((item) => (
            <option key={item.url} value={item.url}>
              {item.label} · {item.url}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm text-muted">
        LLM model
        <input className="field mt-1" value={d.llm ?? ""} placeholder="llama3.1" onChange={(e) => patchNode(node.id, { llm: e.target.value })} list={`llm-${node.id}`} />
        <datalist id={`llm-${node.id}`}>
          {models.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
      </label>
      <button
        type="button"
        className="h-10 rounded-full border border-line px-3 text-sm"
        onClick={() => {
          setNote("Asking the engine…");
          void listLlmModels(engineUrl, d.endpoint ?? LLM_ENDPOINTS[0].url).then((found) => {
            setModels(found);
            setNote(found.length ? `${found.length} models` : "No models. Is that server running?");
            if (found[0] && !d.llm) patchNode(node.id, { llm: found[0] });
          });
        }}
      >
        List models
      </button>
      {note ? <p className="text-sm text-muted">{note}</p> : null}
      <Num label="Temperature" value={d.temperature ?? 0.4} step={0.1} min={0} max={2} onChange={(n) => patchNode(node.id, { temperature: n })} />
      <p className="text-sm leading-relaxed text-muted">Wire the text output into a prompt. An optional image input is sent when the LLM can see pictures. The engine calls the server when you press Run.</p>
    </div>
  );
}
