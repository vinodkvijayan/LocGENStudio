import { create } from "zustand";
import {
  DEFAULT_ENGINE,
  DEFAULT_ROOT,
  type FolderId,
  type GraphNode,
  type Job,
  type ModelFile,
  type NodeData,
  type NodeKind,
  type Workflow,
  blankNode,
  demoModels,
  fluxWorkflow,
  kindForFolder,
  schnellWorkflow,
  sdxlWorkflow,
  uid,
} from "@/lib/studio/model";

export type StudioView = "canvas" | "library" | "jobs" | "setup" | "docs";

type Snapshot = {
  rootPath: string;
  engineUrl: string;
  linkLabel: string | null;
  models: ModelFile[];
  workflows: Workflow[];
  activeId: string;
  jobs: Job[];
};

type StudioState = Snapshot & {
  view: StudioView;
  viewportPx: { w: number; h: number };
  hydrated: boolean;
  setView: (view: StudioView) => void;
  setViewport: (w: number, h: number) => void;
  setRootPath: (rootPath: string) => void;
  setEngineUrl: (engineUrl: string) => void;
  setLinkLabel: (linkLabel: string | null) => void;
  replaceModels: (models: ModelFile[], linkLabel?: string | null) => void;
  addModel: (model: ModelFile) => void;
  removeModel: (id: string) => void;
  restoreDemo: () => void;
  setActive: (id: string) => void;
  renameActive: (name: string) => void;
  addWorkflow: (workflow: Workflow) => void;
  deleteActive: () => void;
  patchActive: (patch: Partial<Workflow>) => void;
  select: (id: string | null) => void;
  addKind: (kind: NodeKind, x: number, y: number) => string;
  addModelNode: (model: ModelFile, x: number, y: number) => string | null;
  moveNode: (id: string, x: number, y: number) => void;
  patchNode: (id: string, data: Partial<NodeData>) => void;
  removeSelected: () => void;
  setPanZoom: (pan: { x: number; y: number }, zoom: number) => void;
  connect: (fromNode: string, fromPort: string, toNode: string, toPort: string) => void;
  disconnectPort: (toNode: string, toPort: string, fromNode?: string) => void;
  addJob: (job: Job) => void;
  patchJob: (id: string, patch: Partial<Job>) => void;
  hydrate: (snap: Partial<Snapshot> | null) => void;
};

const STORAGE_KEY = "locgen-studio-v1";

function initialWorkflows(): Workflow[] {
  return [fluxWorkflow(), schnellWorkflow(), sdxlWorkflow()];
}

function activeOf(state: Snapshot): Workflow {
  return state.workflows.find((w) => w.id === state.activeId) ?? state.workflows[0];
}

function mapActive(state: Snapshot, recipe: (workflow: Workflow) => Workflow): Pick<StudioState, "workflows"> {
  return {
    workflows: state.workflows.map((w) => (w.id === state.activeId ? recipe(w) : w)),
  };
}

export const useStudio = create<StudioState>((set, get) => ({
  rootPath: DEFAULT_ROOT,
  engineUrl: DEFAULT_ENGINE,
  linkLabel: null,
  models: demoModels(),
  workflows: initialWorkflows(),
  activeId: "wf-flux",
  jobs: [],
  view: "canvas",
  viewportPx: { w: 1280, h: 800 },
  hydrated: false,
  setView: (view) => set({ view }),
  setViewport: (w, h) => set({ viewportPx: { w, h } }),
  setRootPath: (rootPath) => set({ rootPath }),
  setEngineUrl: (engineUrl) => set({ engineUrl }),
  setLinkLabel: (linkLabel) => set({ linkLabel }),
  replaceModels: (models, linkLabel) => set({ models, linkLabel: linkLabel === undefined ? get().linkLabel : linkLabel }),
  addModel: (model) => set({ models: [model, ...get().models.filter((m) => !(m.folder === model.folder && m.name === model.name))] }),
  removeModel: (id) => set({ models: get().models.filter((m) => m.id !== id) }),
  restoreDemo: () => set({ models: demoModels(), linkLabel: null }),
  setActive: (id) => set({ activeId: id }),
  renameActive: (name) => set(mapActive(get(), (w) => ({ ...w, name }))),
  addWorkflow: (workflow) => set({ workflows: [...get().workflows, workflow], activeId: workflow.id, view: "canvas" }),
  deleteActive: () => {
    const { workflows, activeId } = get();
    if (workflows.length < 2) return;
    const next = workflows.filter((w) => w.id !== activeId);
    set({ workflows: next, activeId: next[0].id });
  },
  patchActive: (patch) => set(mapActive(get(), (w) => ({ ...w, ...patch }))),
  select: (id) => set(mapActive(get(), (w) => ({ ...w, selectedId: id }))),
  addKind: (kind, x, y) => {
    const created = blankNode(kind, x, y);
    set(mapActive(get(), (w) => ({ ...w, nodes: [...w.nodes, created], selectedId: created.id })));
    return created.id;
  },
  addModelNode: (model, x, y) => {
    const kind = kindForFolder(model.folder);
    if (!kind) return null;
    const created = blankNode(kind, x, y);
    created.data.modelId = model.id;
    set(mapActive(get(), (w) => ({ ...w, nodes: [...w.nodes, created], selectedId: created.id })));
    return created.id;
  },
  moveNode: (id, x, y) =>
    set(mapActive(get(), (w) => ({ ...w, nodes: w.nodes.map((n) => (n.id === id ? { ...n, x, y } : n)) }))),
  patchNode: (id, data) =>
    set(
      mapActive(get(), (w) => ({
        ...w,
        nodes: w.nodes.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n)),
      })),
    ),
  removeSelected: () => {
    const wf = activeOf(get());
    const id = wf.selectedId;
    if (!id) return;
    set(
      mapActive(get(), (w) => ({
        ...w,
        selectedId: null,
        nodes: w.nodes.filter((n) => n.id !== id),
        edges: w.edges.filter((e) => e.fromNode !== id && e.toNode !== id),
      })),
    );
  },
  setPanZoom: (pan, zoom) => set(mapActive(get(), (w) => ({ ...w, pan, zoom }))),
  connect: (fromNode, fromPort, toNode, toPort) => {
    if (fromNode === toNode) return;
    set(
      mapActive(get(), (w) => {
        const target = w.nodes.find((n) => n.id === toNode);
        if (!target) return w;
        const multi = target.kind === "prompt" && toPort === "clip";
        const same = w.edges.filter((e) => e.toNode === toNode && e.toPort === toPort);
        let edges = w.edges.filter(
          (e) => !(e.fromNode === fromNode && e.fromPort === fromPort && e.toNode === toNode && e.toPort === toPort),
        );
        if (!multi) edges = edges.filter((e) => !(e.toNode === toNode && e.toPort === toPort));
        if (multi && same.length >= 2 && !same.some((e) => e.fromNode === fromNode)) {
          edges = edges.filter((e) => e.id !== same[0].id);
        }
        edges = [...edges, { id: uid("e"), fromNode, fromPort, toNode, toPort }];
        const nodes =
          (toPort === "positive" || toPort === "negative") && fromPort === "cond"
            ? w.nodes.map((n) =>
                n.id === fromNode && n.kind === "prompt"
                  ? { ...n, data: { ...n.data, role: toPort === "negative" ? ("negative" as const) : ("positive" as const) } }
                  : n,
              )
            : w.nodes;
        return { ...w, nodes, edges };
      }),
    );
  },
  disconnectPort: (toNode, toPort, fromNode) =>
    set(
      mapActive(get(), (w) => ({
        ...w,
        edges: w.edges.filter((e) => {
          if (e.toNode !== toNode || e.toPort !== toPort) return true;
          if (fromNode && e.fromNode !== fromNode) return true;
          return false;
        }),
      })),
    ),
  addJob: (job) => set({ jobs: [job, ...get().jobs].slice(0, 40) }),
  patchJob: (id, patch) => set({ jobs: get().jobs.map((j) => (j.id === id ? { ...j, ...patch } : j)) }),
  hydrate: (snap) => {
    if (!snap || !Array.isArray(snap.workflows) || snap.workflows.length === 0 || !Array.isArray(snap.models)) {
      set({ hydrated: true });
      return;
    }
    set({
      rootPath: typeof snap.rootPath === "string" ? snap.rootPath : DEFAULT_ROOT,
      engineUrl: typeof snap.engineUrl === "string" ? snap.engineUrl : DEFAULT_ENGINE,
      linkLabel: snap.linkLabel ?? null,
      models: snap.models,
      workflows: snap.workflows,
      activeId: snap.workflows.some((w) => w.id === snap.activeId) ? (snap.activeId as string) : snap.workflows[0].id,
      jobs: Array.isArray(snap.jobs) ? snap.jobs : [],
      hydrated: true,
    });
  },
}));

export function snapshot(state: StudioState): Snapshot {
  return {
    rootPath: state.rootPath,
    engineUrl: state.engineUrl,
    linkLabel: state.linkLabel,
    models: state.models,
    workflows: state.workflows,
    activeId: state.activeId,
    jobs: state.jobs.map(({ imageUrl: _image, ...job }) => job),
  };
}

export function loadSnapshot(): Partial<Snapshot> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { v?: number } & Partial<Snapshot>;
    if (parsed.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveSnapshot(state: StudioState) {
  try {
    let body = JSON.stringify({ v: 1, ...snapshot(state) });
    if (body.length > 4_500_000) {
      const slim = snapshot(state);
      slim.workflows = slim.workflows.map((workflow) => ({
        ...workflow,
        nodes: workflow.nodes.map((node) => ({
          ...node,
          data: { ...node.data, imageData: undefined, maskData: undefined },
        })),
      }));
      body = JSON.stringify({ v: 1, ...slim });
    }
    localStorage.setItem(STORAGE_KEY, body);
  } catch {
    /* The browser refused the write. The graph still runs in this tab. */
  }
}

export function useActive(): Workflow {
  return useStudio((s) => s.workflows.find((w) => w.id === s.activeId) ?? s.workflows[0]);
}

export function spawnPoint(pan: { x: number; y: number }, zoom: number, px: { w: number; h: number }) {
  const z = zoom || 1;
  return {
    x: (px.w / 2 - pan.x) / z - 120,
    y: (px.h / 2 - pan.y) / z - 70,
  };
}

export function selectedNode(workflow: Workflow): GraphNode | null {
  return workflow.nodes.find((n) => n.id === workflow.selectedId) ?? null;
}

export function emptyWorkflow(name: string): Workflow {
  const sampler = blankNode("sampler", 460, 80);
  const prompt = blankNode("prompt", 80, 40);
  const save = blankNode("save", 780, 120);
  return {
    id: uid("wf"),
    name,
    pan: { x: 32, y: 32 },
    zoom: 1,
    selectedId: sampler.id,
    nodes: [prompt, sampler, save],
    edges: [],
  };
}

export function isFolderId(value: string): value is FolderId {
  return (
    value === "checkpoints" ||
    value === "diffusion_models" ||
    value === "unet" ||
    value === "loras" ||
    value === "vae" ||
    value === "clip" ||
    value === "text_encoders" ||
    value === "clip_vision" ||
    value === "embeddings" ||
    value === "controlnet" ||
    value === "upscale_models" ||
    value === "hypernetworks" ||
    value === "style_models" ||
    value === "ipadapter" ||
    value === "vae_approx" ||
    value === "gligen" ||
    value === "photomaker" ||
    value === "audio_encoders" ||
    value === "configs"
  );
}
