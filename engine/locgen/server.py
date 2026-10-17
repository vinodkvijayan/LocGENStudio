"""HTTP front for the local graph runner.

The studio talks to /system_stats, /prompt, /history, /queue and /view.
/prompt returns immediately. Sampling happens on a worker thread.
"""

from __future__ import annotations

import argparse
import json
import queue
import threading
import time
import uuid
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

from locgen import __version__
from locgen.folders import output_dir, set_models_root, set_output_dir
from locgen.graph import GraphError, execute
from locgen.runtime import embedded_python

_jobs: dict[str, dict] = {}
_lock = threading.Lock()
_pending: queue.Queue[str] = queue.Queue()


def _device_name() -> str:
    try:
        import torch

        if torch.cuda.is_available():
            return torch.cuda.get_device_name(0)
    except Exception:
        pass
    embed = embedded_python()
    if embed is not None:
        return f"pythonembedded ({embed.parent.name})"
    return "CPU"


def _llm_models(base: str) -> list[str]:
    import urllib.request

    if not base.startswith(("http://127.0.0.1", "http://localhost")):
        return []
    try:
        with urllib.request.urlopen(base + "/models", timeout=4) as response:
            payload = json.load(response)
    except Exception:
        return []
    rows = []
    if isinstance(payload, dict):
        rows = payload.get("data") or payload.get("models") or []
    names = []
    for row in rows or []:
        if isinstance(row, str):
            names.append(row)
        elif isinstance(row, dict):
            name = row.get("id") or row.get("name") or row.get("model")
            if name:
                names.append(str(name))
    return names


def _record(prompt_id: str, **fields) -> None:
    with _lock:
        item = _jobs.setdefault(prompt_id, {})
        item.update(fields)


def _worker() -> None:
    while True:
        prompt_id = _pending.get()
        with _lock:
            job = dict(_jobs.get(prompt_id, {}))
        prompt = job.get("prompt")
        if not isinstance(prompt, dict):
            continue
        _record(prompt_id, state="running")
        try:
            outputs = execute(prompt)
            _record(
                prompt_id,
                state="done",
                history={
                    "outputs": outputs,
                    "status": {"status_str": "success", "completed": True, "messages": []},
                },
            )
        except GraphError as exc:
            _fail(prompt_id, str(exc), exc.node_id)
        except Exception as exc:
            _fail(prompt_id, str(exc), None)


def _fail(prompt_id: str, message: str, node_id: str | None) -> None:
    detail = {"exception_message": message, "node_id": node_id}
    _record(
        prompt_id,
        state="done",
        history={
            "outputs": {},
            "status": {
                "status_str": "error",
                "completed": False,
                "messages": [["execution_error", detail]],
            },
        },
    )


def _safe_output(filename: str, subfolder: str) -> Path | None:
    root = output_dir().resolve()
    rel = Path(subfolder.replace("\\", "/").strip("/")) if subfolder else Path(".")
    name = Path(filename.replace("\\", "/"))
    if name.is_absolute() or ".." in name.parts or rel.is_absolute() or ".." in rel.parts:
        return None
    path = (root / rel / name.name).resolve()
    if root not in path.parents and path != root:
        return None
    if not path.is_file():
        return None
    return path


class Handler(BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"

    def log_message(self, fmt: str, *args) -> None:
        print(f"[locgen] {self.address_string()} {fmt % args}")

    def _cors(self) -> None:
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _json(self, code: int, payload: dict) -> None:
        raw = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(raw)))
        self.end_headers()
        self.wfile.write(raw)

    def do_OPTIONS(self) -> None:
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        path = parsed.path
        if path == "/system_stats":
            self._json(
                200,
                {
                    "system": {
                        "os": "windows",
                        "comfyui_version": f"LocGEN {__version__}",
                        "embedded_python": str(embedded_python() or ""),
                    },
                    "devices": [{"name": _device_name(), "type": "cuda", "index": 0}],
                },
            )
            return
        if path == "/llm/models":
            base = (parse_qs(parsed.query).get("base") or [""])[0].rstrip("/")
            self._json(200, {"models": _llm_models(base)})
            return
            with _lock:
                running = [[0, pid] for pid, job in _jobs.items() if job.get("state") == "running"]
                pending = [[0, pid] for pid, job in _jobs.items() if job.get("state") == "pending"]
            self._json(200, {"queue_running": running, "queue_pending": pending})
            return
        if path == "/history":
            with _lock:
                payload = {pid: job["history"] for pid, job in _jobs.items() if "history" in job}
            self._json(200, payload)
            return
        if path.startswith("/history/"):
            prompt_id = path[len("/history/") :]
            with _lock:
                job = _jobs.get(prompt_id)
                history = job.get("history") if job else None
            self._json(200, {prompt_id: history} if history else {})
            return
        if path == "/view":
            query = parse_qs(parsed.query)
            filename = (query.get("filename") or [""])[0]
            subfolder = (query.get("subfolder") or [""])[0]
            image = _safe_output(filename, subfolder)
            if image is None:
                self._json(404, {"error": "missing image"})
                return
            data = image.read_bytes()
            self.send_response(200)
            self._cors()
            self.send_header("Content-Type", "image/png")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        self._json(404, {"error": "not found"})

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path != "/prompt":
            self._json(404, {"error": "not found"})
            return
        length = int(self.headers.get("Content-Length") or "0")
        raw = self.rfile.read(length) if length else b"{}"
        try:
            body = json.loads(raw.decode("utf-8") or "{}")
        except json.JSONDecodeError:
            self._json(400, {"error": {"message": "Prompt body is not JSON."}, "node_errors": {}})
            return
        prompt = body.get("prompt") if isinstance(body, dict) else None
        if not isinstance(prompt, dict):
            self._json(400, {"error": {"message": "Missing prompt object."}, "node_errors": {}})
            return
        try:
            from locgen.graph import validate

            validate(prompt)
        except GraphError as exc:
            node_errors = {exc.node_id: {"errors": [{"message": str(exc)}]}} if exc.node_id else {}
            self._json(400, {"error": {"message": str(exc)}, "node_errors": node_errors})
            return
        prompt_id = str(uuid.uuid4())
        _record(prompt_id, state="pending", prompt=prompt, queued=time.time())
        _pending.put(prompt_id)
        self._json(200, {"prompt_id": prompt_id, "number": 0})


def main() -> None:
    parser = argparse.ArgumentParser(description="LocGENStudio local inference")
    parser.add_argument("--models", default=r"C:\LocGENStudio\models")
    parser.add_argument("--output", default="")
    parser.add_argument("--listen", default="127.0.0.1")
    parser.add_argument("--port", type=int, default=8188)
    args = parser.parse_args()
    root = set_models_root(args.models)
    out = set_output_dir(args.output) if args.output else set_output_dir(root.parent / "output")
    thread = threading.Thread(target=_worker, name="locgen-sample", daemon=True)
    thread.start()
    server = ThreadingHTTPServer((args.listen, args.port), Handler)
    print(f"LocGENStudio engine {__version__}")
    print(f"Models:  {root}")
    print(f"Output:  {out}")
    print(f"Listen:  http://{args.listen}:{args.port}")
    server.serve_forever()
