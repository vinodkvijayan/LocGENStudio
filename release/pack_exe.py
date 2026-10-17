"""Append the studio zip to the Windows launcher.

    python release/pack_exe.py --stub release/LocGENStudio-stub.exe --studio dist/client --out release/LocGENStudio.exe

pythonembedded is included when --python points at a folder that contains python.exe.
Models are never packed.
"""

from __future__ import annotations

import argparse
import io
import zipfile
from pathlib import Path


def add_tree(archive: zipfile.ZipFile, source: Path, prefix: str) -> None:
    for path in sorted(source.rglob("*")):
        if not path.is_file():
            continue
        if "__pycache__" in path.parts or path.suffix == ".pyc":
            continue
        rel = path.relative_to(source).as_posix()
        archive.write(path, f"{prefix}/{rel}")


def build_zip(root: Path, studio: Path, python_dir: Path | None, version: str) -> bytes:
    buf = io.BytesIO()
    with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        add_tree(archive, root / "engine", "engine")
        add_tree(archive, studio, "studio")
        if python_dir is not None:
            add_tree(archive, python_dir, "pythonembedded")
        archive.writestr("VERSION", version.strip() + "\n")
    return buf.getvalue()


def pack(stub: Path, payload: bytes, out: Path) -> None:
    body = stub.read_bytes()
    if body.endswith(b"LOCGEN01"):
        raise SystemExit(f"{stub} already has a payload. Use the stub exe.")
    out.write_bytes(body + payload + len(payload).to_bytes(8, "little") + b"LOCGEN01")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--stub", type=Path, required=True)
    parser.add_argument("--studio", type=Path, required=True)
    parser.add_argument("--python", type=Path, default=None)
    parser.add_argument("--version", default="0.10.0")
    parser.add_argument("--out", type=Path, required=True)
    args = parser.parse_args()
    root = Path(__file__).resolve().parents[1]
    if not (args.studio / "index.html").is_file():
        raise SystemExit(f"No index.html in {args.studio}")
    payload = build_zip(root, args.studio, args.python, args.version)
    pack(args.stub, payload, args.out)
    print(f"Wrote {args.out} ({args.out.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
