import {
  MODEL_EXTS,
  type FolderId,
  type ModelFile,
  guessFamily,
  normalizeFolder,
  uid,
} from "@/lib/studio/model";

type Handle = {
  kind: "file" | "directory";
  name: string;
  getFile?: () => Promise<File>;
  values?: () => AsyncIterable<Handle>;
};

function isWeight(name: string) {
  const lower = name.toLowerCase();
  return MODEL_EXTS.some((ext) => lower.endsWith(ext));
}

async function walk(dir: Handle, folder: FolderId, prefix: string, out: ModelFile[], left: { n: number }) {
  if (!dir.values || left.n <= 0) return;
  for await (const entry of dir.values()) {
    if (left.n <= 0) return;
    if (entry.kind === "file") {
      if (!isWeight(entry.name) || !entry.getFile) continue;
      const file = await entry.getFile();
      const name = prefix ? `${prefix}/${entry.name}` : entry.name;
      out.push({
        id: uid("file"),
        name,
        folder,
        bytes: file.size,
        family: guessFamily(name, folder),
        source: "scan",
      });
      left.n -= 1;
    } else if (entry.kind === "directory" && prefix.split("/").length < 3) {
      await walk(entry, folder, prefix ? `${prefix}/${entry.name}` : entry.name, out, left);
    }
  }
}

export async function scanModelsRoot(root: Handle): Promise<ModelFile[]> {
  const out: ModelFile[] = [];
  const left = { n: 2000 };
  const own = normalizeFolder(root.name);
  if (own && root.values) {
    await walk(root, own, "", out, left);
    return out;
  }
  if (!root.values) return out;
  for await (const entry of root.values()) {
    if (entry.kind !== "directory") continue;
    const folder = normalizeFolder(entry.name);
    if (!folder) continue;
    await walk(entry, folder, "", out, left);
  }
  return out;
}

export function canLinkFolder(): boolean {
  return typeof window !== "undefined" && "showDirectoryPicker" in window;
}

export async function pickModelsFolder(): Promise<{ name: string; models: ModelFile[] } | null> {
  const picker = (window as unknown as { showDirectoryPicker?: (o?: { mode?: string }) => Promise<Handle & { name: string }> }).showDirectoryPicker;
  if (!picker) return null;
  const handle = await picker({ mode: "read" });
  const models = await scanModelsRoot(handle);
  return { name: handle.name, models };
}

export type ManifestModel = {
  name?: string;
  folder?: string;
  bytes?: number;
  family?: ModelFile["family"];
  note?: string;
};

export function modelsFromManifest(body: unknown): { root?: string; models: ModelFile[] } | null {
  if (!body || typeof body !== "object") return null;
  const record = body as { root?: unknown; models?: unknown };
  if (!Array.isArray(record.models)) return null;
  const models: ModelFile[] = [];
  for (const item of record.models as ManifestModel[]) {
    if (!item || typeof item.name !== "string" || typeof item.folder !== "string") continue;
    const folder = normalizeFolder(item.folder);
    if (!folder) continue;
    const name = item.name.replace(/\\/g, "/").replace(/^\//, "");
    models.push({
      id: uid("man"),
      name,
      folder,
      bytes: typeof item.bytes === "number" ? item.bytes : 0,
      family: item.family ?? guessFamily(name, folder),
      source: "scan",
      note: item.note,
    });
  }
  return { root: typeof record.root === "string" ? record.root : undefined, models };
}
