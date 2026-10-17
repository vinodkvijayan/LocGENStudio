import type { ComfyNode } from "@/lib/studio/compile";

export type Probe = { ok: boolean; message: string };

export function friendlyFetchError(error: unknown): string {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "The local engine did not answer in time.";
  }
  const raw = error instanceof Error ? error.message : "Request failed";
  if (/failed to fetch|networkerror|load failed|abort/i.test(raw)) {
    return "This browser could not reach the local engine. On Windows 11, run Start-LocGENStudio.ps1 so it listens on 127.0.0.1:8188 and can read the models folder.";
  }
  return raw;
}

export async function probeEngine(url: string): Promise<Probe> {
  const base = url.replace(/\/$/, "");
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(`${base}/system_stats`, { signal: ctrl.signal });
    if (!res.ok) return { ok: false, message: `Engine answered HTTP ${res.status}` };
    const data = (await res.json()) as { devices?: { name?: string }[]; system?: { comfyui_version?: string } };
    const gpu = data.devices?.[0]?.name;
    const ver = data.system?.comfyui_version;
    const bits = [gpu, ver ? `engine ${ver}` : "local engine"].filter(Boolean);
    return { ok: true, message: bits.join(" · ") };
  } catch (error) {
    return { ok: false, message: friendlyFetchError(error) };
  } finally {
    clearTimeout(timer);
  }
}

export async function listLlmModels(engineUrl: string, base: string): Promise<string[]> {
  const root = engineUrl.replace(/\/$/, "");
  try {
    const res = await fetch(`${root}/llm/models?base=${encodeURIComponent(base)}`);
    if (!res.ok) return [];
    const data = (await res.json()) as { models?: string[] };
    return Array.isArray(data.models) ? data.models : [];
  } catch {
    return [];
  }
}

export async function queuePrompt(url: string, prompt: Record<string, ComfyNode>): Promise<string> {
  const base = url.replace(/\/$/, "");
  const res = await fetch(`${base}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, client_id: crypto.randomUUID() }),
  });
  const body = (await res.json().catch(() => ({}))) as {
    prompt_id?: string;
    error?: { message?: string } | string;
    node_errors?: unknown;
  };
  if (!res.ok || !body.prompt_id) {
    const err = typeof body.error === "string" ? body.error : body.error?.message;
    const extra = body.node_errors ? ` ${JSON.stringify(body.node_errors).slice(0, 280)}` : "";
    throw new Error((err || `HTTP ${res.status}`) + extra);
  }
  return body.prompt_id;
}

type HistoryImage = { filename: string; subfolder: string; type: string };

export async function pollImage(url: string, promptId: string, onTick: (message: string) => void): Promise<string | null> {
  const base = url.replace(/\/$/, "");
  for (let i = 0; i < 150; i += 1) {
    await wait(2000);
    onTick(await queueMessage(base, promptId, i));
    let data: Record<string, { outputs?: Record<string, { images?: HistoryImage[] }>; status?: { status_str?: string; completed?: boolean; messages?: unknown[] } }>;
    try {
      const res = await fetch(`${base}/history/${promptId}`);
      if (!res.ok) continue;
      data = (await res.json()) as typeof data;
    } catch {
      continue;
    }
    const item = data[promptId];
    if (!item) continue;
    const outputs = item.outputs ?? {};
    for (const key of Object.keys(outputs)) {
      const image = outputs[key]?.images?.[0];
      if (image) return loadImage(base, image);
    }
    if (item.status?.status_str === "error") throw new Error(historyError(item.status.messages));
    if (item.status?.completed) return null;
  }
  throw new Error("The local engine is still sampling. Check its window, then open the image from the output folder.");
}

function historyError(messages: unknown[] | undefined): string {
  const fallback = "The local engine marked the job as an error.";
  const row = messages?.[0];
  if (!Array.isArray(row)) return fallback;
  const detail = row[1];
  if (detail && typeof detail === "object" && "exception_message" in detail) {
    const message = (detail as { exception_message?: unknown }).exception_message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

async function queueMessage(base: string, promptId: string, tick: number): Promise<string> {
  try {
    const res = await fetch(`${base}/queue`);
    if (res.ok) {
      const body = (await res.json()) as { queue_running?: unknown[][]; queue_pending?: unknown[][] };
      const running = body.queue_running ?? [];
      const pending = body.queue_pending ?? [];
      const active = running.some((row) => row[1] === promptId);
      const waiting = pending.some((row) => row[1] === promptId);
      if (active) return "Sampling on this PC";
      if (waiting) return `Waiting in the local queue (${pending.length})`;
    }
  } catch {
    // History is the source of truth if the queue endpoint is quiet.
  }
  return tick < 2 ? "Loading weights from the models folder" : "Sampling";
}

async function loadImage(base: string, image: HistoryImage): Promise<string> {
  const remote = viewUrl(base, image.filename, image.subfolder ?? "", image.type ?? "output");
  try {
    const res = await fetch(remote);
    if (!res.ok) return remote;
    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch {
    return remote;
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function viewUrl(engine: string, filename: string, subfolder = "", type = "output") {
  const q = new URLSearchParams({ filename, subfolder, type });
  return `${engine.replace(/\/$/, "")}/view?${q.toString()}`;
}
