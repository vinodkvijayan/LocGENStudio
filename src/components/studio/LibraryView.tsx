import { useMemo, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import {
  FAMILIES,
  FOLDERS,
  type Family,
  type FolderId,
  type ModelFile,
  familyLabel,
  formatBytes,
  guessFamily,
  kindForFolder,
  uid,
} from "@/lib/studio/model";
import { spawnPoint, useStudio } from "@/lib/studio/store";

export function LibraryView() {
  const models = useStudio((s) => s.models);
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState<FolderId | "all">("all");
  const [open, setOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return models.filter((model) => {
      if (folder !== "all" && model.folder !== folder) return false;
      if (!q) return true;
      return model.name.toLowerCase().includes(q) || model.family.includes(q);
    });
  }, [models, query, folder]);

  const groups = FOLDERS.map((spec) => ({
    spec,
    files: filtered.filter((model) => model.folder === spec.id),
  })).filter((group) => group.files.length > 0);

  return (
    <div className="flex h-full min-h-0 flex-col bg-bg">
      <div className="border-b border-line px-4 py-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="font-display text-2xl text-fg">Model root</h2>
          <p className="text-sm text-muted tabular-nums">{models.length} files</p>
        </div>
        <label className="mt-3 flex items-center gap-2 rounded-xl border border-line bg-surface px-3">
          <Search className="size-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search weights"
            className="h-11 w-full bg-transparent text-base text-fg outline-none"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-auto pb-1">
          <Chip active={folder === "all"} onClick={() => setFolder("all")}>
            All
          </Chip>
          {FOLDERS.map((spec) => (
            <Chip key={spec.id} active={folder === spec.id} onClick={() => setFolder(spec.id)}>
              {spec.label}
            </Chip>
          ))}
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-3 py-3">
        {groups.length === 0 ? (
          <p className="px-2 py-8 text-sm text-muted">Nothing in this filter. Link the Windows folder or add a file below.</p>
        ) : (
          groups.map((group) => (
            <section key={group.spec.id} className="mb-4">
              <header className="flex items-baseline justify-between px-2 py-1">
                <h3 className="text-sm text-fg">{group.spec.label}</h3>
                <p className="text-xs text-muted">{group.spec.loader}</p>
              </header>
              <ul className="overflow-hidden rounded-2xl border border-line">
                {group.files.map((model) => (
                  <li key={model.id} className="border-b border-line last:border-b-0">
                    <ModelRow model={model} />
                  </li>
                ))}
              </ul>
            </section>
          ))
        )}
      </div>
      <div className="border-t border-line px-4 py-3">
        <button type="button" className="text-sm text-signal" onClick={() => setOpen((v) => !v)}>
          {open ? "Close" : "Add a weight by hand"}
        </button>
        {open ? <AddForm /> : null}
      </div>
    </div>
  );
}

function ModelRow({ model }: { model: ModelFile }) {
  const placeable = kindForFolder(model.folder);
  const removeModel = useStudio((s) => s.removeModel);
  return (
    <div
      className="flex items-center gap-3 bg-surface px-3 py-3"
      draggable={Boolean(placeable)}
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", `model:${model.id}`);
        event.dataTransfer.effectAllowed = "copy";
      }}
    >
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-fg">{model.name}</p>
        <p className="mt-0.5 text-xs text-muted">
          {familyLabel(model.family)} · {formatBytes(model.bytes)}
          {model.source === "demo" ? " · sample" : ""}
        </p>
      </div>
      {placeable ? (
        <button type="button" onClick={() => place(model)} className="h-10 shrink-0 rounded-full bg-accent px-3 text-sm font-medium text-accent-ink">
          Place
        </button>
      ) : (
        <button
          type="button"
          className="h-10 shrink-0 rounded-full border border-line px-3 text-sm text-fg"
          onClick={() => navigator.clipboard?.writeText(model.name.split("/").pop() ?? model.name)}
        >
          Copy
        </button>
      )}
      <button type="button" onClick={() => removeModel(model.id)} className="text-xs text-muted" aria-label={`Remove ${model.name}`}>
        Hide
      </button>
    </div>
  );
}

function place(model: ModelFile) {
  const studio = useStudio.getState();
  const wf = studio.workflows.find((w) => w.id === studio.activeId);
  if (!wf) return;
  const px = studio.viewportPx.w > 40 ? studio.viewportPx : { w: 800, h: 640 };
  const at = spawnPoint(wf.pan, wf.zoom, px);
  studio.addModelNode(model, at.x, at.y);
  studio.setView("canvas");
}

function AddForm() {
  const addModel = useStudio((s) => s.addModel);
  const [name, setName] = useState("");
  const [folder, setFolder] = useState<FolderId>("loras");
  const [gb, setGb] = useState("0.2");
  const [family, setFamily] = useState<Family | "auto">("auto");

  return (
    <form
      className="mt-3 space-y-2"
      onSubmit={(event) => {
        event.preventDefault();
        const cleaned = name.trim().replace(/\\/g, "/");
        if (!cleaned) return;
        const file = /\.[a-z0-9]+$/i.test(cleaned) ? cleaned : `${cleaned}.safetensors`;
        addModel({
          id: uid("man"),
          name: file,
          folder,
          bytes: Math.round(Number(gb || 0) * 1e9),
          family: family === "auto" ? guessFamily(file, folder) : family,
          source: "manual",
        });
        setName("");
      }}
    >
      <input className="field" placeholder="filename.safetensors" value={name} onChange={(e) => setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <select className="field" value={folder} onChange={(e) => setFolder(e.target.value as FolderId)}>
          {FOLDERS.map((spec) => (
            <option key={spec.id} value={spec.id}>
              {spec.label}
            </option>
          ))}
        </select>
        <select className="field" value={family} onChange={(e) => setFamily(e.target.value as Family | "auto")}>
          <option value="auto">Guess family</option>
          {FAMILIES.map((item) => (
            <option key={item} value={item}>
              {familyLabel(item)}
            </option>
          ))}
        </select>
      </div>
      <label className="block text-xs text-muted">
        Size in GB
        <input className="field mt-1" inputMode="decimal" value={gb} onChange={(e) => setGb(e.target.value)} />
      </label>
      <button type="submit" className="h-11 w-full rounded-full bg-fg text-sm font-medium text-bg">
        Add to library
      </button>
    </form>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 rounded-full px-3 text-sm ${active ? "bg-accent text-accent-ink" : "bg-surface text-muted"}`}
    >
      {children}
    </button>
  );
}
