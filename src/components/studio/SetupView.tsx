import { useRef, useState } from "react";
import { FOLDERS, PATH_PRESETS, formatBytes } from "@/lib/studio/model";
import { canLinkFolder, modelsFromManifest, pickModelsFolder } from "@/lib/studio/scan";
import { useStudio } from "@/lib/studio/store";
import { probeEngine } from "@/lib/studio/engine";
import { COMFY_LAUNCH, layoutScript } from "@/lib/studio/windows";

export function SetupView() {
  const rootPath = useStudio((s) => s.rootPath);
  const engineUrl = useStudio((s) => s.engineUrl);
  const models = useStudio((s) => s.models);
  const linkLabel = useStudio((s) => s.linkLabel);
  const setRootPath = useStudio((s) => s.setRootPath);
  const setEngineUrl = useStudio((s) => s.setEngineUrl);
  const replaceModels = useStudio((s) => s.replaceModels);
  const restoreDemo = useStudio((s) => s.restoreDemo);
  const setRoot = useStudio((s) => s.setRootPath);
  const fileRef = useRef<HTMLInputElement>(null);
  const [probe, setProbe] = useState<string>("Not checked");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  const total = models.reduce((sum, model) => sum + (model.bytes || 0), 0);

  async function link() {
    setBusy(true);
    setNote("");
    try {
      const picked = await pickModelsFolder();
      if (!picked) {
        setNote("This browser cannot open a folder. Import the manifest from the Windows script instead.");
        return;
      }
      replaceModels(picked.models, picked.name);
      setNote(picked.models.length ? `Linked “${picked.name}” · ${picked.models.length} weights.` : `“${picked.name}” has no recognized weight files yet.`);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setNote(error instanceof Error ? error.message : "Could not read that folder.");
    } finally {
      setBusy(false);
    }
  }

  async function onManifest(file: File) {
    const text = await file.text();
    const parsed = modelsFromManifest(JSON.parse(text));
    if (!parsed) {
      setNote("That file is not a LocGENStudio manifest.");
      return;
    }
    replaceModels(parsed.models, file.name);
    if (parsed.root) setRoot(parsed.root);
    setNote(`Imported ${parsed.models.length} files${parsed.root ? ` from ${parsed.root}` : ""}.`);
  }

  return (
    <div className="h-full overflow-auto bg-bg">
      <div className="mx-auto grid max-w-5xl gap-6 px-4 py-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section>
          <p className="text-xs tracking-widest text-signal uppercase">Windows 11</p>
          <h2 className="mt-1 font-display text-4xl text-balance text-fg">One models folder. Inference stays on this PC.</h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-pretty text-muted">
            Put diffusion weights, LoRAs, text encoders, VAEs and CLIP files under a single root, in the same layout a local engine expects. Run compiles the canvas and samples those files. Nothing is uploaded.
          </p>

          <label className="mt-6 block text-sm text-muted">
            Model root
            <input className="field mt-1 font-mono text-sm" value={rootPath} onChange={(e) => setRootPath(e.target.value)} spellCheck={false} />
          </label>
          <div className="mt-2 flex flex-wrap gap-2">
            {PATH_PRESETS.map((preset) => (
              <button key={preset.path} type="button" onClick={() => setRootPath(preset.path)} className="h-9 rounded-full bg-surface px-3 text-sm text-fg">
                {preset.label}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-sm text-muted">
            Local engine URL
            <input className="field mt-1" value={engineUrl} onChange={(e) => setEngineUrl(e.target.value)} spellCheck={false} />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" disabled={busy} onClick={link} className="h-11 rounded-full bg-accent px-4 text-sm font-medium text-accent-ink disabled:opacity-50">
              {canLinkFolder() ? "Link folder on this PC" : "Folder link unavailable"}
            </button>
            <button type="button" onClick={() => fileRef.current?.click()} className="h-11 rounded-full border border-line px-4 text-sm text-fg">
              Import manifest
            </button>
            <button type="button" onClick={restoreDemo} className="h-11 rounded-full border border-line px-4 text-sm text-muted">
              Restore sample library
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json,.json"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void onManifest(file).catch(() => setNote("Could not read that JSON."));
                event.target.value = "";
              }}
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            {linkLabel ? `Last link: ${linkLabel}. ` : ""}
            {models.filter((m) => m.source === "demo").length === models.length
              ? "Showing a sample library so the canvas works before you point it at disk."
              : `${models.length} indexed · ${formatBytes(total)}.`}
            {note ? ` ${note}` : ""}
          </p>

          <div className="mt-6">
            <button
              type="button"
              className="h-11 rounded-full bg-fg px-4 text-sm font-medium text-bg"
              onClick={() => download("Start-LocGENStudio.ps1", layoutScript(rootPath))}
            >
              Download Windows starter
            </button>
            <a href="/locgen-engine.zip" download className="inline-flex h-11 items-center rounded-full border border-line px-4 text-sm text-fg">
              Download engine
            </a>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              The starter creates diffusion_models, loras, text_encoders, vae, clip and the rest of the tree, writes locgen-manifest.json, and starts the engine in pythonembedded. Unzip the engine beside that folder first. Import the manifest here, then press Run.
            </p>
          </div>

          <pre className="mt-6 overflow-auto rounded-2xl border border-line bg-surface p-4 text-xs leading-relaxed text-fg">{COMFY_LAUNCH}</pre>
          <button
            type="button"
            className="mt-3 h-10 rounded-full border border-line px-4 text-sm text-fg"
            onClick={() => {
              setProbe("Checking…");
              void probeEngine(engineUrl).then((result) => setProbe(result.ok ? result.message : result.message));
            }}
          >
            Check engine
          </button>
          <p className="mt-2 text-sm text-muted">{probe}</p>
        </section>

        <section className="rounded-2xl border border-line bg-surface">
          <header className="border-b border-line px-4 py-3">
            <h3 className="font-display text-2xl text-fg">Folder map</h3>
            <p className="text-sm text-muted">Counts from the library currently loaded.</p>
          </header>
          <ul>
            {FOLDERS.map((folder) => {
              const files = models.filter((model) => model.folder === folder.id);
              return (
                <li key={folder.id} className="border-b border-line px-4 py-3 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm text-fg">{folder.label}</p>
                    <p className="text-sm text-signal tabular-nums">{files.length}</p>
                  </div>
                  <p className="text-xs text-muted">
                    {folder.id}/ · {folder.hint}
                  </p>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}

function download(filename: string, text: string) {
  const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
