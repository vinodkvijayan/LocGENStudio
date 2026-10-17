import { useEffect, useMemo, useRef, useState, type DragEvent, type PointerEvent, type ReactNode } from "react";
import { Copy, Maximize2, Minus, Plus, X } from "lucide-react";
import { compile } from "@/lib/studio/compile";
import { readStudioImage } from "@/lib/studio/image";
import {
  EDIT_MODES,
  LLM_ENDPOINTS,
  SAMPLERS,
  SCHEDULERS,
  kindLabel,
  modelsForKind,
  nodeSize,
  nodeSubtitle,
  nodeTitle,
  portLocalY,
  portPosition,
  portsFor,
  type EditMode,
  type NodeKind,
  type PortKind,
} from "@/lib/studio/model";
import { useActive, useStudio } from "@/lib/studio/store";

type Draft = {
  fromNode: string;
  fromPort: string;
  kind: PortKind;
  x: number;
  y: number;
  tx: number;
  ty: number;
};

function stroke(kind: PortKind): string {
  if (kind === "model" || kind === "cond" || kind === "text") return "var(--color-signal)";
  if (kind === "vae") return "var(--color-muted)";
  return "var(--color-fg)";
}

function portClass(kind: PortKind): string {
  if (kind === "model" || kind === "cond" || kind === "text") return "bg-signal";
  if (kind === "vae") return "bg-muted";
  return "bg-fg";
}

export function CanvasView() {
  const workflow = useActive();
  const models = useStudio((s) => s.models);
  const select = useStudio((s) => s.select);
  const moveNode = useStudio((s) => s.moveNode);
  const patchNode = useStudio((s) => s.patchNode);
  const setPanZoom = useStudio((s) => s.setPanZoom);
  const connect = useStudio((s) => s.connect);
  const setViewport = useStudio((s) => s.setViewport);
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<
    | { type: "node"; id: string; dx: number; dy: number }
    | { type: "pan"; px: number; py: number; panX: number; panY: number }
    | null
  >(null);
  const draftRef = useRef<Draft | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [graphOpen, setGraphOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const jobs = useStudio((s) => s.jobs);

  const compiled = useMemo(() => compile(workflow, models), [workflow, models]);
  const errors = compiled.issues.filter((i) => i.level === "error");

  function current() {
    return useStudio.getState().workflows.find((w) => w.id === useStudio.getState().activeId) ?? workflow;
  }

  function toWorld(clientX: number, clientY: number) {
    const rect = viewportRef.current?.getBoundingClientRect();
    const wf = current();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: (clientX - rect.left - wf.pan.x) / wf.zoom,
      y: (clientY - rect.top - wf.pan.y) / wf.zoom,
    };
  }

  function setWire(next: Draft | null) {
    draftRef.current = next;
    setDraft(next);
  }

  function fit() {
    const el = viewportRef.current;
    const wf = current();
    if (!el || wf.nodes.length === 0) return;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const n of wf.nodes) {
      const size = nodeSize(n.kind);
      minX = Math.min(minX, n.x);
      minY = Math.min(minY, n.y);
      maxX = Math.max(maxX, n.x + size.w);
      maxY = Math.max(maxY, n.y + size.h);
    }
    const pad = 32;
    const zw = (el.clientWidth - pad * 2) / Math.max(1, maxX - minX);
    const zh = (el.clientHeight - pad * 2) / Math.max(1, maxY - minY);
    const zoom = Math.min(1.1, Math.max(0.34, Math.min(zw, zh)));
    setPanZoom(
      {
        x: (el.clientWidth - (maxX - minX) * zoom) / 2 - minX * zoom,
        y: (el.clientHeight - (maxY - minY) * zoom) / 2 - minY * zoom,
      },
      zoom,
    );
  }

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setViewport(el.clientWidth, el.clientHeight));
    ro.observe(el);
    setViewport(el.clientWidth, el.clientHeight);
    return () => ro.disconnect();
  }, [setViewport]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const wf = current();
      const rect = el.getBoundingClientRect();
      const next = Math.min(1.8, Math.max(0.3, wf.zoom * (event.deltaY < 0 ? 1.08 : 0.92)));
      const wx = (event.clientX - rect.left - wf.pan.x) / wf.zoom;
      const wy = (event.clientY - rect.top - wf.pan.y) / wf.zoom;
      setPanZoom(
        {
          x: event.clientX - rect.left - wx * next,
          y: event.clientY - rect.top - wy * next,
        },
        next,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [setPanZoom, workflow.id]);

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("[data-nodrag]")) {
      const held = target.closest("[data-node]");
      if (held) select(held.getAttribute("data-node"));
      return;
    }
    const port = target.closest("[data-port]");
    if (port) {
      const raw = port.getAttribute("data-port") ?? "";
      const [nodeId, side, name, kind] = raw.split("|");
      const wf = current();
      const node = wf.nodes.find((n) => n.id === nodeId);
      if (!node || side !== "out") return;
      const outputs = portsFor(node.kind).outputs;
      const index = outputs.findIndex((p) => p.name === name);
      const pos = portPosition(node, "out", Math.max(0, index), outputs.length);
      setWire({ fromNode: nodeId, fromPort: name, kind: kind as PortKind, x: pos.x, y: pos.y, tx: pos.x, ty: pos.y });
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    const card = target.closest("[data-node]");
    if (card) {
      const id = card.getAttribute("data-node") ?? "";
      select(id);
      const wf = current();
      const node = wf.nodes.find((n) => n.id === id);
      if (!node) return;
      const world = toWorld(event.clientX, event.clientY);
      drag.current = { type: "node", id, dx: world.x - node.x, dy: world.y - node.y };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    select(null);
    const wf = current();
    drag.current = { type: "pan", px: event.clientX, py: event.clientY, panX: wf.pan.x, panY: wf.pan.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (draftRef.current) {
      const world = toWorld(event.clientX, event.clientY);
      setWire({ ...draftRef.current, tx: world.x, ty: world.y });
      return;
    }
    const active = drag.current;
    if (!active) return;
    if (active.type === "node") {
      const world = toWorld(event.clientX, event.clientY);
      moveNode(active.id, world.x - active.dx, world.y - active.dy);
      return;
    }
    setPanZoom({ x: active.panX + event.clientX - active.px, y: active.panY + event.clientY - active.py }, current().zoom);
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const wire = draftRef.current;
    if (wire) {
      const hit = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-port]");
      if (hit) {
        const [nodeId, side, name, kind] = (hit.getAttribute("data-port") ?? "").split("|");
        if (side === "in" && kind === wire.kind) connect(wire.fromNode, wire.fromPort, nodeId, name);
      }
      setWire(null);
    }
    drag.current = null;
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const world = toWorld(event.clientX, event.clientY);
    const file = [...event.dataTransfer.files].find((item) => item.type.startsWith("image/"));
    if (file) {
      void readStudioImage(file).then((image) => {
        const id = useStudio.getState().addKind("image", world.x - 90, world.y - 70);
        useStudio.getState().patchNode(id, {
          imageName: image.name,
          imageData: image.data,
          imageWidth: image.width,
          imageHeight: image.height,
        });
      });
      return;
    }
    const payload = event.dataTransfer.getData("text/plain");
    if (payload.startsWith("node:")) {
      const kind = payload.slice(5) as NodeKind;
      useStudio.getState().addKind(kind, world.x - 90, world.y - 50);
      return;
    }
    if (!payload.startsWith("model:")) return;
    const model = models.find((m) => m.id === payload.slice(6));
    if (!model) return;
    useStudio.getState().addModelNode(model, world.x - 80, world.y - 40);
  }

  async function copyGraph() {
    const text = JSON.stringify(compiled.prompt, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function zoomBy(factor: number) {
    const wf = current();
    const el = viewportRef.current;
    if (!el) return;
    const next = Math.min(1.8, Math.max(0.3, wf.zoom * factor));
    const cx = el.clientWidth / 2;
    const cy = el.clientHeight / 2;
    const wx = (cx - wf.pan.x) / wf.zoom;
    const wy = (cy - wf.pan.y) / wf.zoom;
    setPanZoom({ x: cx - wx * next, y: cy - wy * next }, next);
  }

  function pictureFor(nodeId: string): string | null {
    const edge = workflow.edges.find((item) => item.toNode === nodeId && item.toPort === "image");
    if (!edge) return null;
    const src = workflow.nodes.find((item) => item.id === edge.fromNode);
    if (!src) return null;
    if (src.kind === "image") return src.data.imageData ?? null;
    if (src.kind === "sampler") {
      return jobs.find((job) => job.workflowName === workflow.name && job.imageUrl)?.imageUrl ?? null;
    }
    return null;
  }

  const selected = workflow.nodes.find((node) => node.id === workflow.selectedId);
  const previewSrc =
    (selected?.kind === "image" ? selected.data.imageData : null) ||
    (selected?.kind === "preview" ? pictureFor(selected.id) : null) ||
    jobs.find((job) => job.workflowName === workflow.name && job.imageUrl)?.imageUrl ||
    null;

  return (
    <div className="relative h-full min-h-0">
      <div
        ref={viewportRef}
        className="canvas-dots absolute inset-0 touch-none overflow-hidden select-none"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDragOver={(event) => {
          if (event.dataTransfer.types.length) event.preventDefault();
        }}
        onDrop={onDrop}
      >
        <div
          className="absolute top-0 left-0"
          style={{ transform: `translate(${workflow.pan.x}px, ${workflow.pan.y}px) scale(${workflow.zoom})`, transformOrigin: "0 0" }}
        >
          <svg className="pointer-events-none absolute overflow-visible" width="2400" height="1600">
            {workflow.edges.map((edge) => {
              const from = workflow.nodes.find((n) => n.id === edge.fromNode);
              const to = workflow.nodes.find((n) => n.id === edge.toNode);
              if (!from || !to) return null;
              const outs = portsFor(from.kind).outputs;
              const ins = portsFor(to.kind).inputs;
              const oi = Math.max(0, outs.findIndex((p) => p.name === edge.fromPort));
              const ii = Math.max(0, ins.findIndex((p) => p.name === edge.toPort));
              const a = portPosition(from, "out", oi, outs.length);
              const b = portPosition(to, "in", ii, ins.length);
              const kind = outs[oi]?.kind ?? "model";
              return <Wire key={edge.id} x1={a.x} y1={a.y} x2={b.x} y2={b.y} kind={kind} />;
            })}
            {draft ? <Wire x1={draft.x} y1={draft.y} x2={draft.tx} y2={draft.ty} kind={draft.kind} /> : null}
          </svg>
          {workflow.nodes.map((node) => {
            const size = nodeSize(node.kind);
            const io = portsFor(node.kind);
            const selected = workflow.selectedId === node.id;
            const title = nodeTitle(node, models);
            const sub = nodeSubtitle(node, models);
            const fileNode = node.kind === "diffusion" || node.kind === "lora" || node.kind === "textEncoder" || node.kind === "vae";
            const missing = fileNode && !node.data.modelId;
            const picture = pictureFor(node.id);
            return (
              <article
                key={node.id}
                data-node={node.id}
                data-selected={selected}
                className="studio-node absolute cursor-grab rounded-2xl border border-line bg-surface active:cursor-grabbing"
                style={{ left: node.x, top: node.y, width: size.w, height: size.h }}
              >
                {io.inputs.map((port, index) => (
                  <button
                    key={port.name}
                    type="button"
                    data-port={`${node.id}|in|${port.name}|${port.kind}`}
                    aria-label={`${port.label} input`}
                    className="absolute -left-4 flex size-8 -translate-y-1/2 items-center justify-center"
                    style={{ top: portLocalY(index, io.inputs.length, size.h) }}
                  >
                    <span className={`size-3.5 rounded-full ring-2 ring-bg ${portClass(port.kind)}`} />
                  </button>
                ))}
                {io.outputs.map((port, index) => (
                  <button
                    key={port.name}
                    type="button"
                    data-port={`${node.id}|out|${port.name}|${port.kind}`}
                    aria-label={`${port.label} output`}
                    className="absolute -right-4 flex size-8 -translate-y-1/2 items-center justify-center"
                    style={{ top: portLocalY(index, io.outputs.length, size.h) }}
                  >
                    <span className={`size-3.5 rounded-full ring-2 ring-bg ${portClass(port.kind)}`} />
                  </button>
                ))}
                <div className="flex h-full flex-col overflow-hidden px-3 py-2.5">
                  <p className="text-[10px] tracking-widest text-muted uppercase">{kindLabel(node.kind)}</p>
                  {fileNode ? (
                    <NodeSelect
                      label="Weight"
                      value={node.data.modelId ?? ""}
                      onChange={(value) => patchNode(node.id, { modelId: value || undefined })}
                    >
                      <option value="">Choose a file</option>
                      {modelsForKind(models, node.kind).map((model) => (
                        <option key={model.id} value={model.id}>
                          {model.name}
                        </option>
                      ))}
                    </NodeSelect>
                  ) : (
                    <h3 className={`mt-1 truncate text-sm font-medium ${missing ? "text-signal" : "text-fg"}`}>{title}</h3>
                  )}
                  {node.kind === "sampler" ? (
                    <>
                      <NodeSelect
                        label="Mode"
                        value={node.data.editMode ?? "generate"}
                        onChange={(value) => patchNode(node.id, { editMode: value as EditMode, denoise: value === "generate" ? 1 : (node.data.denoise ?? 0.55) })}
                      >
                        {EDIT_MODES.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.label}
                          </option>
                        ))}
                      </NodeSelect>
                      <div className="mt-1 grid grid-cols-2 gap-1">
                        <NodeSelect label="Sampler" value={node.data.sampler ?? "euler"} onChange={(value) => patchNode(node.id, { sampler: value })}>
                          {SAMPLERS.map((name) => (
                            <option key={name}>{name}</option>
                          ))}
                        </NodeSelect>
                        <NodeSelect label="Schedule" value={node.data.scheduler ?? "simple"} onChange={(value) => patchNode(node.id, { scheduler: value })}>
                          {SCHEDULERS.map((name) => (
                            <option key={name}>{name}</option>
                          ))}
                        </NodeSelect>
                      </div>
                    </>
                  ) : null}
                  {node.kind === "enhance" ? (
                    <>
                      <NodeSelect
                        label="Server"
                        value={node.data.endpoint ?? LLM_ENDPOINTS[0].url}
                        onChange={(value) => patchNode(node.id, { endpoint: value })}
                      >
                        {LLM_ENDPOINTS.map((item) => (
                          <option key={item.url} value={item.url}>
                            {item.label}
                          </option>
                        ))}
                      </NodeSelect>
                      <label data-nodrag className="mt-1 block text-[10px] text-muted" onPointerDown={(event) => event.stopPropagation()}>
                        LLM model
                        <input
                          className="node-select mt-0.5"
                          value={node.data.llm ?? ""}
                          placeholder="llama3.1 or model id"
                          onChange={(event) => patchNode(node.id, { llm: event.target.value })}
                        />
                      </label>
                    </>
                  ) : null}
                  {node.kind === "image" ? (
                    <ImageWell
                      src={node.data.imageData}
                      onFile={(file) => {
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
                  ) : null}
                  {node.kind === "preview" ? (
                    picture ? (
                      <img src={picture} alt="" className="mt-2 min-h-0 flex-1 rounded-lg object-contain" />
                    ) : (
                      <p className="mt-2 text-xs text-muted">Wire an image, or run the graph and wire the sampler here.</p>
                    )
                  ) : null}
                  {node.kind !== "preview" && node.kind !== "image" ? (
                    <p className={`mt-1 text-xs leading-snug text-muted ${node.kind === "prompt" ? "line-clamp-3" : "line-clamp-2"}`}>{sub}</p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute top-3 right-3 left-3 flex items-start gap-2">
        <div className="pointer-events-auto min-w-0 flex-1 rounded-2xl border border-line bg-surface px-3 py-2">
          <p className="text-xs tracking-widest text-muted uppercase">{compiled.ok ? "Graph ready" : "Needs wiring"}</p>
          <p className="mt-1 line-clamp-2 text-sm text-fg">{compiled.ok ? compiled.summary : errors[0]?.message}</p>
        </div>
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="pointer-events-auto h-10 shrink-0 rounded-full border border-line bg-surface px-3 text-sm text-fg"
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setGraphOpen((v) => !v)}
          className="pointer-events-auto h-10 shrink-0 rounded-full border border-line bg-surface px-3 text-sm text-fg"
        >
          API graph
        </button>
      </div>

      <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full border border-line bg-surface p-1">
        <IconButton label="Zoom out" onClick={() => zoomBy(0.9)}>
          <Minus className="size-4" />
        </IconButton>
        <span className="w-12 text-center text-xs text-muted tabular-nums">{Math.round(workflow.zoom * 100)}%</span>
        <IconButton label="Zoom in" onClick={() => zoomBy(1.1)}>
          <Plus className="size-4" />
        </IconButton>
        <IconButton label="Fit workflow" onClick={fit}>
          <Maximize2 className="size-4" />
        </IconButton>
      </div>

      <p className="pointer-events-none absolute bottom-5 left-4 hidden text-xs text-muted xl:block">
        Drag a card to move it · Drag a node from + onto the canvas · Drop a picture to load it
      </p>

      {previewOpen ? (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/75 p-6" onClick={() => setPreviewOpen(false)}>
          <div className="max-h-full max-w-full" onClick={(event) => event.stopPropagation()}>
            {previewSrc ? (
              <img src={previewSrc} alt="Preview" className="max-h-[80vh] max-w-full rounded-2xl object-contain" />
            ) : (
              <p className="rounded-2xl bg-surface px-6 py-5 text-sm text-muted">Load an image, or run a graph. The picture opens here.</p>
            )}
          </div>
        </div>
      ) : null}

      {graphOpen ? (
        <aside className="absolute inset-y-0 right-0 z-10 flex w-full max-w-md flex-col border-l border-line bg-surface">
          <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-3">
            <div>
              <p className="font-display text-lg text-fg">ComfyUI prompt</p>
              <p className="text-xs text-muted">{compiled.chain.join(" → ") || "Nothing to compile yet"}</p>
            </div>
            <div className="flex gap-1">
              <IconButton label="Copy graph" onClick={copyGraph}>
                <Copy className="size-4" />
              </IconButton>
              <IconButton label="Close graph" onClick={() => setGraphOpen(false)}>
                <X className="size-4" />
              </IconButton>
            </div>
          </div>
          {copied ? <p className="px-4 pt-3 text-xs text-signal">Copied</p> : null}
          <ul className="space-y-1 px-4 py-3">
            {compiled.issues.map((issue) => (
              <li key={issue.message} className={issue.level === "error" ? "text-sm text-signal" : "text-sm text-muted"}>
                {issue.message}
              </li>
            ))}
          </ul>
          <pre className="mx-4 mb-4 min-h-0 flex-1 overflow-auto rounded-xl bg-bg p-3 text-xs leading-relaxed text-fg">
            {JSON.stringify(redactPrompt(compiled.prompt), null, 2)}
          </pre>
        </aside>
      ) : null}
    </div>
  );
}

function Wire({ x1, y1, x2, y2, kind }: { x1: number; y1: number; x2: number; y2: number; kind: PortKind }) {
  const lead = Math.min(110, Math.max(48, Math.abs(x2 - x1) * 0.28));
  const d = `M ${x1} ${y1} C ${x1 + lead} ${y1}, ${x2 - lead} ${y2}, ${x2} ${y2}`;
  return <path d={d} fill="none" stroke={stroke(kind)} strokeWidth={1.75} />;
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="flex size-10 items-center justify-center rounded-full text-fg">
      {children}
    </button>
  );
}

function redactPrompt(prompt: Record<string, { class_type: string; inputs: Record<string, unknown> }>) {
  const copy = structuredClone(prompt);
  for (const node of Object.values(copy)) {
    for (const [key, value] of Object.entries(node.inputs)) {
      if (typeof value === "string" && value.startsWith("data:image")) node.inputs[key] = `[image ${Math.round(value.length / 1024)} KB]`;
    }
  }
  return copy;
}

function NodeSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <label data-nodrag className="mt-1 block text-[10px] tracking-wide text-muted uppercase" onPointerDown={(event) => event.stopPropagation()}>
      {label}
      <select className="node-select mt-0.5 normal-case" value={value} onChange={(event) => onChange(event.target.value)}>
        {children}
      </select>
    </label>
  );
}

function ImageWell({ src, onFile }: { src?: string; onFile: (file: File) => void }) {
  return (
    <label data-nodrag className="mt-1 flex min-h-0 flex-1 cursor-pointer flex-col" onPointerDown={(event) => event.stopPropagation()}>
      {src ? (
        <img src={src} alt="" className="h-24 w-full rounded-lg object-cover" />
      ) : (
        <span className="flex h-20 items-center justify-center rounded-lg border border-dashed border-line text-xs text-muted">Drop or choose</span>
      )}
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
          event.target.value = "";
        }}
      />
    </label>
  );
}
