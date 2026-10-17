"""Graph and HTTP checks that do not load weights.

Run from the engine directory:

    python -m locgen.selftest
"""

from __future__ import annotations

import json
import tempfile
import threading
import time
import urllib.request
from http.server import ThreadingHTTPServer
from pathlib import Path

from locgen.folders import set_models_root, set_output_dir
from locgen.graph import GraphError, execute
from locgen.server import Handler, _worker


def _prompt(missing_vae: bool = False) -> dict:
    return {
        "1": {"class_type": "CheckpointLoaderSimple", "inputs": {"ckpt_name": "demo.safetensors"}},
        "2": {"class_type": "CLIPTextEncode", "inputs": {"text": "a room", "clip": ["1", 1]}},
        "3": {"class_type": "CLIPTextEncode", "inputs": {"text": "", "clip": ["1", 1]}},
        "4": {"class_type": "EmptyLatentImage", "inputs": {"width": 64, "height": 64, "batch_size": 1}},
        "5": {
            "class_type": "KSampler",
            "inputs": {
                "model": ["1", 0],
                "seed": 1,
                "steps": 1,
                "cfg": 1,
                "sampler_name": "euler",
                "scheduler": "normal",
                "positive": ["2", 0],
                "negative": ["3", 0],
                "latent_image": ["4", 0],
                "denoise": 1,
            },
        },
        "6": {
            "class_type": "VAEDecode",
            "inputs": {"samples": ["5", 0], "vae": ["1", 2]},
        },
        "7": {"class_type": "SaveImage", "inputs": {"images": ["6", 0], "filename_prefix": "locgen/selftest"}},
        "_skip": missing_vae,
    }


class _FakeImage:
    def save(self, path: Path) -> None:
        Path(path).write_bytes(b"\x89PNG\r\n\x1a\n")


def _patch_sample(monkey):
    import locgen.sample as sample

    monkey["sample_image"] = sample.sample_image
    sample.sample_image = lambda **kwargs: _FakeImage()


def _restore_sample(monkey):
    import locgen.sample as sample

    sample.sample_image = monkey["sample_image"]


def test_graph() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "models"
        ckpt = root / "checkpoints"
        set_models_root(root)
        set_output_dir(Path(tmp) / "output")
        ckpt.mkdir(parents=True, exist_ok=True)
        (ckpt / "demo.safetensors").write_bytes(b"not-a-weight")
        saved = {}
        _patch_sample(saved)
        try:
            prompt = _prompt()
            del prompt["_skip"]
            outputs = execute(prompt)
        finally:
            _restore_sample(saved)
        images = outputs["7"]["images"]
        assert images[0]["filename"].endswith(".png"), images
        assert images[0]["subfolder"] == "locgen", images
        assert (Path(tmp) / "output" / "locgen" / images[0]["filename"]).is_file()


def test_missing_weight() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        set_models_root(Path(tmp) / "models")
        prompt = _prompt()
        del prompt["_skip"]
        try:
            execute(prompt)
        except GraphError as exc:
            assert "demo.safetensors" in str(exc), exc
            assert exc.node_id == "1"
            return
        raise AssertionError("missing weight should fail")


def test_unknown_node() -> None:
    try:
        execute({"1": {"class_type": "NotANode", "inputs": {}}})
    except GraphError as exc:
        assert exc.node_id == "1"
        return
    raise AssertionError("unknown node should fail")


def test_http() -> None:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp) / "models"
        set_models_root(root)
        set_output_dir(Path(tmp) / "output")
        (root / "checkpoints").mkdir(parents=True, exist_ok=True)
        (root / "checkpoints" / "demo.safetensors").write_bytes(b"x")
        saved = {}
        _patch_sample(saved)
        threading.Thread(target=_worker, daemon=True).start()
        server = ThreadingHTTPServer(("127.0.0.1", 0), Handler)
        port = server.server_address[1]
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            base = f"http://127.0.0.1:{port}"
            stats = json.load(urllib.request.urlopen(base + "/system_stats"))
            assert stats["system"]["comfyui_version"].startswith("LocGEN"), stats
            prompt = _prompt()
            del prompt["_skip"]
            req = urllib.request.Request(
                base + "/prompt",
                data=json.dumps({"prompt": prompt, "client_id": "selftest"}).encode(),
                headers={"Content-Type": "application/json"},
            )
            queued = json.load(urllib.request.urlopen(req))
            prompt_id = queued["prompt_id"]
            image = None
            for _ in range(50):
                history = json.load(urllib.request.urlopen(f"{base}/history/{prompt_id}"))
                item = history.get(prompt_id)
                if item:
                    image = item["outputs"]["7"]["images"][0]
                    break
                time.sleep(0.05)
            assert image is not None, "history never stored the image"
            view = urllib.request.urlopen(
                f"{base}/view?filename={image['filename']}&subfolder={image['subfolder']}&type=output"
            )
            assert view.read(8) == b"\x89PNG\r\n\x1a\n"
            blocked = urllib.request.Request(f"{base}/view?filename=..%2Fsecret.png&subfolder=&type=output")
            try:
                urllib.request.urlopen(blocked)
            except Exception as exc:
                assert getattr(exc, "code", None) == 404, exc
            else:
                raise AssertionError("path escape should 404")
        finally:
            server.shutdown()
            _restore_sample(saved)


def test_edit_and_enhancer() -> None:
    import base64
    import io
    from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

    from PIL import Image

    picture = Image.new("RGB", (32, 24), (20, 40, 60))
    buf = io.BytesIO()
    picture.save(buf, format="PNG")
    data = "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()
    seen = {"n": 0}

    class Reply(BaseHTTPRequestHandler):
        def do_POST(self):
            length = int(self.headers.get("Content-Length", "0"))
            body = json.loads(self.rfile.read(length) or b"{}")
            assert body["model"] == "llama-test"
            assert "a street" in body["messages"][1]["content"]
            seen["n"] += 1
            raw = json.dumps({"choices": [{"message": {"content": "late afternoon street, natural skin, 50mm"}}]}).encode()
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Content-Length", str(len(raw)))
            self.end_headers()
            self.wfile.write(raw)

        def log_message(self, fmt, *args):
            return

    server = ThreadingHTTPServer(("127.0.0.1", 0), Reply)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    host, port = server.server_address
    try:
        with tempfile.TemporaryDirectory() as tmp:
            set_output_dir(Path(tmp) / "output")
            saved = execute(
                {
                    "1": {"class_type": "LoadImage", "inputs": {"image": data}},
                    "2": {
                        "class_type": "ImagePadForOutpaint",
                        "inputs": {"image": ["1", 0], "left": 8, "right": 4, "top": 2, "bottom": 6, "feathering": 1},
                    },
                    "3": {"class_type": "SaveImage", "inputs": {"images": ["2", 0], "filename_prefix": "locgen/pad"}},
                    "4": {
                        "class_type": "PromptEnhancer",
                        "inputs": {
                            "prompt": "a street",
                            "model": "llama-test",
                            "system": "Rewrite.",
                            "base_url": f"http://{host}:{port}/v1",
                            "temperature": 0.2,
                        },
                    },
                }
            )
            assert saved["3"]["images"][0]["filename"].startswith("pad_")
            opened = Image.open(next((Path(tmp) / "output").rglob("*.png")))
            assert opened.size == (32 + 12, 24 + 8)
            assert seen["n"] == 1
    finally:
        server.shutdown()


def main() -> None:
    test_unknown_node()
    test_missing_weight()
    test_graph()
    test_edit_and_enhancer()
    test_http()
    print("locgen selftest ok")


if __name__ == "__main__":
    main()
