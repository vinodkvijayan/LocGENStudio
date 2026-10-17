"""Model folder map. Same tree a Comfy-style models root uses."""

from __future__ import annotations

import os
from pathlib import Path

FOLDERS = (
    "checkpoints",
    "diffusion_models",
    "unet",
    "loras",
    "vae",
    "clip",
    "text_encoders",
    "clip_vision",
    "embeddings",
    "controlnet",
    "upscale_models",
    "configs",
)

ALIASES = {
    "text-encoder": "text_encoders",
    "text_encoder": "text_encoders",
    "diffussion_models": "diffusion_models",
    "diffusion-models": "diffusion_models",
}

_roots: list[Path] = []
_output: Path | None = None


def set_models_root(path: str | os.PathLike[str]) -> Path:
    root = Path(path).expanduser().resolve()
    root.mkdir(parents=True, exist_ok=True)
    for name in FOLDERS:
        (root / name).mkdir(exist_ok=True)
    _roots.clear()
    _roots.append(root)
    return root


def set_output_dir(path: str | os.PathLike[str]) -> Path:
    global _output
    folder = Path(path).expanduser().resolve()
    folder.mkdir(parents=True, exist_ok=True)
    _output = folder
    return folder


def output_dir() -> Path:
    if _output is None:
        root = _roots[0] if _roots else Path.cwd()
        return set_output_dir(root.parent / "output")
    return _output


def _search_dirs(folder: str) -> list[Path]:
    names = [folder]
    for alias, canonical in ALIASES.items():
        if canonical == folder:
            names.append(alias)
    if folder == "diffusion_models":
        names.append("unet")
    if folder == "text_encoders":
        names.append("clip")
    found: list[Path] = []
    for root in _roots:
        for name in names:
            path = root / name
            if path.is_dir() and path not in found:
                found.append(path)
    return found


def resolve_file(folder: str, name: str) -> Path:
    rel = Path(name.replace("\\", "/"))
    if rel.is_absolute() or ".." in rel.parts:
        raise FileNotFoundError(name)
    hits: list[Path] = []
    for directory in _search_dirs(folder):
        candidate = (directory / rel).resolve()
        if directory.resolve() not in candidate.parents and candidate != directory.resolve():
            continue
        if candidate.is_file():
            hits.append(candidate)
    if not hits:
        raise FileNotFoundError(f"{name} is not under {folder}/")
    return hits[0]
