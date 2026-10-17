import { useEffect, useState } from "react";
import { BookOpen, FolderTree, Images, Monitor, Plus, Workflow } from "lucide-react";
import { CanvasView } from "@/components/studio/CanvasView";
import { DocsView } from "@/components/studio/DocsView";
import { Inspector } from "@/components/studio/Inspector";
import { JobsView } from "@/components/studio/JobsView";
import { LibraryView } from "@/components/studio/LibraryView";
import { SetupView } from "@/components/studio/SetupView";
import { compile } from "@/lib/studio/compile";
import { friendlyFetchError, pollImage, probeEngine, queuePrompt } from "@/lib/studio/engine";
import {
  type NodeKind,
  fluxWorkflow,
  inferenceBlock,
  kleinWorkflow,
  krea2Workflow,
  ltxWorkflow,
  minimaxWorkflow,
  qwenWorkflow,
  schnellWorkflow,
  sdxlWorkflow,
  uid,
  wanWorkflow,
  zimageWorkflow,
  demoModels,
} from "@/lib/studio/model";
import { emptyWorkflow, loadSnapshot, saveSnapshot, spawnPoint, useActive, useStudio, type StudioView } from "@/lib/studio/store";

const NAV: { id: StudioView; label: string; icon: typeof Workflow }[] = [
  { id: "canvas", label: "Canvas", icon: Workflow },
  { id: "library", label: "Library", icon: FolderTree },
  { id: "jobs", label: "Runs", icon: Images },
  { id: "setup", label: "Windows", icon: Monitor },
  { id: "docs", label: "Docs", icon: BookOpen },
];

const ADD: { kind: NodeKind; label: string }[] = [
  { kind: "diffusion", label: "Diffusion" },
  { kind: "lora", label: "LoRA" },
  { kind: "textEncoder", label: "Text encoder" },
  { kind: "vae", label: "VAE" },
  { kind: "prompt", label: "Prompt" },
  { kind: "sampler", label: "Sampler" },
  { kind: "save", label: "Save" },
];

export function Studio() {
  const view = useStudio((s) => s.view);
  const setView = useStudio((s) => s.setView);
  const workflows = useStudio((s) => s.workflows);
  const setActive = useStudio((s) => s.setActive);
  const renameActive = useStudio((s) => s.renameActive);
  const addWorkflow = useStudio((s) => s.addWorkflow);
  const deleteActive = useStudio((s) => s.deleteActive);
  const workflow = useActive();
  const selected = Boolean(workflow.selectedId);
  const [menu, setMenu] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let ready = false;
    const unsub = useStudio.subscribe((state) => {
      if (!ready || !state.hydrated) return;
      saveSnapshot(state);
    });
    useStudio.getState().hydrate(loadSnapshot());
    ready = true;
    return unsub;
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select")) return;
      if (event.key === "Delete" || event.key === "Backspace") {
        event.preventDefault();
        useStudio.getState().removeSelected();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function place(kind: NodeKind) {
    const studio = useStudio.getState();
    const wf = studio.workflows.find((item) => item.id === studio.activeId);
    if (!wf) return;
    const px = studio.viewportPx.w > 40 ? studio.viewportPx : { w: 900, h: 700 };
    const at = spawnPoint(wf.pan, wf.zoom, px);
    studio.addKind(kind, at.x, at.y);
    studio.setView("canvas");
    setAddOpen(false);
    setSheet(true);
  }

  function fresh(source: ReturnType<typeof fluxWorkflow>) {
    const studio = useStudio.getState();
    const have = new Set(studio.models.map((model) => model.id));
    for (const model of demoModels()) {
      if (!have.has(model.id) && source.nodes.some((node) => node.data.modelId === model.id)) {
        studio.addModel(model);
      }
    }
    const copy = structuredClone(source);
    copy.id = uid("wf");
    copy.name = `${source.name} copy`;
    addWorkflow(copy);
    setMenu(false);
  }

  async function run() {
    const studio = useStudio.getState();
    const wf = studio.workflows.find((item) => item.id === studio.activeId);
    if (!wf) return;
    const compiled = compile(wf, studio.models);
    const blocked = compiled.ok ? inferenceBlock(wf, studio.models) : null;
    const id = uid("job");
    studio.addJob({
      id,
      workflowName: wf.name,
      createdAt: Date.now(),
      status: compiled.ok && !blocked ? "staged" : "error",
      summary: compiled.summary,
      chain: compiled.chain,
      promptJson: JSON.stringify(compiled.prompt, null, 2),
      message: blocked ?? (compiled.ok ? "Checking the local engine…" : compiled.issues.find((issue) => issue.level === "error")?.message ?? "Graph is incomplete"),
    });
    studio.setView("jobs");
    if (!compiled.ok || blocked) return;
    setBusy(true);
    try {
      const probe = await probeEngine(studio.engineUrl);
      if (!probe.ok) {
        studio.patchJob(id, { status: "staged", message: probe.message });
        return;
      }
      studio.patchJob(id, { status: "queued", message: probe.message });
      const promptId = await queuePrompt(studio.engineUrl, compiled.prompt);
      studio.patchJob(id, { status: "running", message: "Queued on this PC" });
      const image = await pollImage(studio.engineUrl, promptId, (message) => studio.patchJob(id, { message }));
      studio.patchJob(id, {
        status: "done",
        imageUrl: image ?? undefined,
        message: image ? "Inference finished. The file is also in the engine output folder." : "The engine finished without an image.",
      });
    } catch (error) {
      studio.patchJob(id, { status: "error", message: friendlyFetchError(error) });
    } finally {
      setBusy(false);
    }
  }

  const showCanvas = view === "canvas" || view === "library";
  const showLibrary = view === "library";

  return (
    <div className="flex h-dvh flex-col bg-bg text-fg md:flex-row">
      <aside className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-line py-3 md:flex">
        <Mark />
        {NAV.map((item) => (
          <RailButton key={item.id} item={item} active={view === item.id} onClick={() => setView(item.id)} />
        ))}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-line px-3">
          <span className="flex shrink-0 items-center gap-2">
            <span className="md:hidden">
              <Mark />
            </span>
            <span className="font-display text-sm tracking-tight text-fg md:hidden">LocGEN</span>
            <span className="hidden font-display text-base tracking-tight text-fg md:inline">LocGENStudio</span>
          </span>
          <div className="min-w-0 flex-1">
            <input
              aria-label="Workflow name"
              value={workflow.name}
              onChange={(event) => renameActive(event.target.value)}
              className="w-full truncate bg-transparent font-display text-lg text-fg outline-none"
            />
          </div>
          <div className="relative">
            <button type="button" onClick={() => setMenu((v) => !v)} className="h-10 shrink-0 rounded-full border border-line px-3 text-sm text-fg">
              Graphs
            </button>
            {menu ? (
              <div className="absolute top-12 right-0 z-20 max-h-[70vh] w-64 overflow-auto rounded-2xl border border-line bg-surface p-1 shadow-lg">
                {workflows.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm text-fg"
                    onClick={() => {
                      setActive(item.id);
                      setMenu(false);
                      setView("canvas");
                    }}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="my-1 border-t border-line" />
                <MenuAction label="New Flux portrait" onClick={() => fresh(fluxWorkflow())} />
                <MenuAction label="New Flux Schnell" onClick={() => fresh(schnellWorkflow())} />
                <MenuAction label="New Flux 2 Klein" onClick={() => fresh(kleinWorkflow())} />
                <MenuAction label="New Krea 2" onClick={() => fresh(krea2Workflow())} />
                <MenuAction label="New Qwen Image 2.1" onClick={() => fresh(qwenWorkflow())} />
                <MenuAction label="New Z-Image Turbo" onClick={() => fresh(zimageWorkflow())} />
                <MenuAction label="New Wan 2.2" onClick={() => fresh(wanWorkflow())} />
                <MenuAction label="New LTX 2.5" onClick={() => fresh(ltxWorkflow())} />
                <MenuAction label="New MiniMax H3" onClick={() => fresh(minimaxWorkflow())} />
                <MenuAction label="New SDXL" onClick={() => fresh(sdxlWorkflow())} />
                <MenuAction label="Empty graph" onClick={() => { addWorkflow(emptyWorkflow("Untitled")); setMenu(false); }} />
                <MenuAction label="Delete this graph" onClick={() => { deleteActive(); setMenu(false); }} />
              </div>
            ) : null}
          </div>
          <div className="relative">
            <button type="button" aria-label="Add node" onClick={() => setAddOpen((v) => !v)} className="flex size-10 items-center justify-center rounded-full border border-line">
              <Plus className="size-4" />
            </button>
            {addOpen ? (
              <div className="absolute top-12 right-0 z-20 w-44 rounded-2xl border border-line bg-surface p-1">
                {ADD.map((item) => (
                  <button key={item.kind} type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm" onClick={() => place(item.kind)}>
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={() => void run()}
            disabled={busy}
            className="h-10 rounded-full bg-accent px-4 text-sm font-medium text-accent-ink disabled:opacity-60"
          >
            {busy ? "Running" : "Run"}
          </button>
        </header>

        <div className="flex min-h-0 flex-1">
          {showLibrary ? (
            <div className={view === "library" ? "h-full min-h-0 w-full md:w-80 md:shrink-0 md:border-r md:border-line" : "hidden"}>
              <LibraryView />
            </div>
          ) : null}
          {showCanvas ? (
            <div className={view === "library" ? "relative hidden min-h-0 min-w-0 flex-1 md:block" : "relative min-h-0 min-w-0 flex-1"}>
              <div className="absolute inset-0">
                <CanvasView />
              </div>
              {selected && view === "canvas" ? (
                <div className="absolute inset-x-0 bottom-0 z-10 xl:hidden">
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-between border-t border-line bg-surface px-4 text-left"
                    onClick={() => setSheet((open) => !open)}
                  >
                    <span className="truncate text-sm text-fg">{workflow.name}</span>
                    <span className="text-xs tracking-widest text-muted uppercase">{sheet ? "Hide" : "Edit"}</span>
                  </button>
                  {sheet ? (
                    <div className="max-h-[46vh] overflow-auto border-t border-line bg-surface">
                      <Inspector dock />
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
          {view === "jobs" ? (
            <div className="min-w-0 flex-1">
              <JobsView />
            </div>
          ) : null}
          {view === "setup" ? (
            <div className="min-w-0 flex-1">
              <SetupView />
            </div>
          ) : null}
          {view === "docs" ? (
            <div className="min-w-0 flex-1">
              <DocsView />
            </div>
          ) : null}
          {selected && (view === "canvas" || view === "library") ? (
            <div className="hidden w-80 shrink-0 xl:block">
              <Inspector />
            </div>
          ) : null}
        </div>

        <nav className="flex h-14 shrink-0 border-t border-line md:hidden">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = view === item.id;
            return (
              <button key={item.id} type="button" onClick={() => setView(item.id)} className="flex flex-1 flex-col items-center justify-center gap-0.5">
                <Icon className={`size-5 ${active ? "text-signal" : "text-muted"}`} />
                <span className={`text-xs ${active ? "text-fg" : "text-muted"}`}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

}

function Mark() {
  return (
    <span className="flex size-9 items-center justify-center text-signal" aria-hidden="true">
      <svg viewBox="0 0 32 32" className="size-7">
        <rect x="3" y="3" width="26" height="26" rx="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="10" cy="10" r="2.1" fill="currentColor" />
        <circle cx="22" cy="10" r="2.1" fill="currentColor" />
        <circle cx="22" cy="22" r="2.1" fill="currentColor" />
        <path d="M10 10h12v12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function RailButton({
  item,
  active,
  onClick,
}: {
  item: (typeof NAV)[number];
  active: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      aria-label={item.label}
      aria-pressed={active}
      onClick={onClick}
      className={`flex size-11 items-center justify-center rounded-xl ${active ? "bg-surface text-signal" : "text-muted"}`}
    >
      <Icon className="size-5" />
    </button>
  );
}

function MenuAction({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button type="button" className="block w-full rounded-xl px-3 py-2 text-left text-sm text-muted" onClick={onClick}>
      {label}
    </button>
  );
}
