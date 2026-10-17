import { useMemo, useState } from "react";
import { renderMarkdown } from "@/lib/studio/markdown";
import readme from "../../../README.md?raw";
import howto from "../../../HOWTO.md?raw";
import notes from "../../../NOTES.md?raw";
import models from "../../../docs/models.md?raw";
import families from "../../../docs/families.md?raw";
import graph from "../../../docs/graph.md?raw";
import engine from "../../../docs/engine.md?raw";
import windows from "../../../docs/windows.md?raw";
import trouble from "../../../docs/troubleshooting.md?raw";

const PAGES = [
  { id: "README.md", label: "Read me", source: readme },
  { id: "HOWTO.md", label: "How to", source: howto },
  { id: "NOTES.md", label: "Notes", source: notes },
  { id: "docs/models.md", label: "Models folder", source: models },
  { id: "docs/families.md", label: "Families", source: families },
  { id: "docs/graph.md", label: "Graph", source: graph },
  { id: "docs/engine.md", label: "Engine", source: engine },
  { id: "docs/windows.md", label: "Windows starter", source: windows },
  { id: "docs/troubleshooting.md", label: "Troubleshooting", source: trouble },
] as const;

function resolve(href: string, current: string): string | null {
  const base = current.includes("/") ? current.slice(0, current.lastIndexOf("/") + 1) : "";
  const next = href.startsWith("../") ? href.slice(3) : `${base}${href}`;
  return PAGES.some((page) => page.id === next) ? next : null;
}

export function DocsView() {
  const [pageId, setPageId] = useState<(typeof PAGES)[number]["id"]>("README.md");
  const page = PAGES.find((item) => item.id === pageId) ?? PAGES[0];
  const html = useMemo(() => renderMarkdown(page.source), [page.source]);

  function download() {
    const name = page.id.split("/").pop() ?? "LocGENStudio.md";
    const url = URL.createObjectURL(new Blob([page.source], { type: "text/markdown" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="h-full overflow-hidden bg-bg">
      <div className="mx-auto flex h-full max-w-6xl">
        <aside className="hidden w-52 shrink-0 overflow-auto border-r border-line py-4 md:block">
          <p className="px-4 text-xs tracking-widest text-signal uppercase">Guides</p>
          <ul className="mt-3">
            {PAGES.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setPageId(item.id)}
                  className={`block w-full px-4 py-2 text-left text-sm ${item.id === page.id ? "bg-surface text-fg" : "text-muted"}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <article className="min-w-0 flex-1 overflow-auto px-4 py-6 md:px-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 md:hidden">
            <label className="min-w-0 flex-1 text-sm text-muted">
              Guide
              <select className="field mt-1" value={page.id} onChange={(event) => setPageId(event.target.value as (typeof PAGES)[number]["id"])}>
                {PAGES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-4 flex justify-end">
            <button type="button" onClick={download} className="h-10 rounded-full border border-line px-4 text-sm text-fg">
              Download this page
            </button>
          </div>
          <div
            className="docs-body"
            onClick={(event) => {
              const link = (event.target as HTMLElement).closest("a[data-doc]");
              if (!link) return;
              event.preventDefault();
              const next = resolve(link.getAttribute("data-doc") ?? "", page.id);
              if (next) setPageId(next as (typeof PAGES)[number]["id"]);
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </article>
      </div>
    </div>
  );
}
