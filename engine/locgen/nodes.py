"""Node set used by the LocGENStudio canvas compiler."""

from __future__ import annotations

from dataclasses import dataclass, field, replace
from pathlib import Path
from typing import Any

from locgen.folders import output_dir, resolve_file


@dataclass
class ModelRef:
    kind: str
    path: str
    dtype: str = "default"
    loras: list[tuple[str, float, float]] = field(default_factory=list)


@dataclass
class ClipRef:
    paths: list[str]
    kind: str = "flux"
    loras: list[tuple[str, float]] = field(default_factory=list)


@dataclass
class VaeRef:
    path: str | None


@dataclass
class Cond:
    text: str
    clip: ClipRef
    guidance: float | None = None


@dataclass
class Latent:
    width: int
    height: int
    batch: int = 1
    frames: int = 1
    images: list[Any] | None = None
    request: dict | None = None


def guess_kind(name: str) -> str:
    raw = name.lower()
    n = "".join(ch for ch in raw if ch.isalnum() or ch == ".")
    if "krea2" in n or "krea-2" in raw:
        return "krea2"
    if "zimage" in n:
        return "zimage"
    if "minimax" in n or "hailuo" in n:
        return "minimax"
    if "ltxv" in n or "ltx2" in n or "ltx-2" in raw or "ltx_2" in raw:
        return "ltxv"
    if "flux2" in n or "klein" in n or "flux-2" in raw or "flux_2" in raw:
        return "flux2"
    if "qwen" in n:
        return "qwen"
    if "flux" in n:
        return "flux"
    if "wan" in n:
        return "wan"
    if "hunyuan" in n:
        return "hunyuan"
    if "sd3" in n:
        return "sd3"
    if "xl" in n:
        return "sdxl"
    return "unet"


def _file(folder: str, name: str) -> str:
    return str(resolve_file(folder, name))


class UNETLoader:
    def run(self, unet_name: str, weight_dtype: str = "default"):
        folder = "diffusion_models"
        try:
            path = _file(folder, unet_name)
        except FileNotFoundError:
            path = _file("unet", unet_name)
        kind = guess_kind(unet_name)
        if kind == "unet":
            kind = "flux" if "flux" in Path(unet_name).name.lower() else "unet"
        return (ModelRef(kind=kind, path=path, dtype=weight_dtype),)


class CheckpointLoaderSimple:
    def run(self, ckpt_name: str):
        path = _file("checkpoints", ckpt_name)
        lower = Path(ckpt_name).name.lower()
        kind = guess_kind(ckpt_name)
        if kind == "unet":
            kind = "sdxl" if "xl" in lower else "sd15"
        model = ModelRef(kind=kind, path=path)
        clip = ClipRef(paths=[], kind=kind)
        vae = VaeRef(path=None)
        return (model, clip, vae)


class DualCLIPLoader:
    def run(self, clip_name1: str, clip_name2: str, type: str = "flux"):
        return (ClipRef(paths=[_file("text_encoders", clip_name1), _file("text_encoders", clip_name2)], kind=type),)


class CLIPLoader:
    def run(self, clip_name: str, type: str = "stable_diffusion"):
        return (ClipRef(paths=[_file("text_encoders", clip_name)], kind=type),)


class VAELoader:
    def run(self, vae_name: str):
        return (VaeRef(path=_file("vae", vae_name)),)


class LoraLoader:
    def run(self, model: ModelRef, clip: ClipRef, lora_name: str, strength_model: float = 1, strength_clip: float = 1):
        path = _file("loras", lora_name)
        sm = float(strength_model)
        sc = float(strength_clip)
        return (
            replace(model, loras=[*model.loras, (path, sm, sc)]),
            replace(clip, loras=[*clip.loras, (path, sc)]),
        )


class CLIPTextEncode:
    def run(self, text: str, clip: ClipRef):
        return (Cond(text=text or "", clip=clip),)


class FluxGuidance:
    def run(self, conditioning: Cond, guidance: float):
        return (replace(conditioning, guidance=float(guidance)),)


class EmptyLatentImage:
    def run(self, width: int, height: int, batch_size: int = 1):
        return (Latent(width=int(width), height=int(height), batch=int(batch_size), frames=1),)


class EmptySD3LatentImage(EmptyLatentImage):
    pass


class EmptyHunyuanLatentVideo:
    def run(self, width: int, height: int, length: int = 49, batch_size: int = 1):
        return (Latent(width=int(width), height=int(height), batch=int(batch_size), frames=int(length)),)


class EmptyLTXVLatentVideo(EmptyHunyuanLatentVideo):
    pass


class KSampler:
    def run(
        self,
        model: ModelRef,
        seed: int,
        steps: int,
        cfg: float,
        sampler_name: str,
        scheduler: str,
        positive: Cond,
        negative: Cond,
        latent_image: Latent,
        denoise: float = 1,
    ):
        request = {
            "model": model,
            "positive": positive,
            "negative": negative,
            "steps": int(steps),
            "cfg": float(cfg),
            "guidance": float(positive.guidance if positive.guidance is not None else cfg),
            "seed": int(seed),
            "sampler": sampler_name,
            "scheduler": scheduler,
            "denoise": float(denoise),
            "frames": int(latent_image.frames or 1),
        }
        return (Latent(width=latent_image.width, height=latent_image.height, batch=latent_image.batch, frames=latent_image.frames, request=request),)


class VAEDecode:
    def run(self, samples: Latent, vae: VaeRef):
        if samples.images:
            return (samples.images[0],)
        if not samples.request:
            raise RuntimeError("Nothing was sampled.")
        from locgen.sample import sample_image

        image = sample_image(vae_path=vae.path, width=samples.width, height=samples.height, **samples.request)
        return (image,)


class SaveImage:
    def run(self, images: Any, filename_prefix: str = "locgen"):
        from locgen.sample import save_png

        return (save_png(images, filename_prefix, output_dir()),)


NODE_CLASS_MAPPINGS = {
    "UNETLoader": UNETLoader,
    "CheckpointLoaderSimple": CheckpointLoaderSimple,
    "DualCLIPLoader": DualCLIPLoader,
    "CLIPLoader": CLIPLoader,
    "VAELoader": VAELoader,
    "LoraLoader": LoraLoader,
    "CLIPTextEncode": CLIPTextEncode,
    "FluxGuidance": FluxGuidance,
    "EmptyLatentImage": EmptyLatentImage,
    "EmptySD3LatentImage": EmptySD3LatentImage,
    "EmptyHunyuanLatentVideo": EmptyHunyuanLatentVideo,
    "EmptyLTXVLatentVideo": EmptyLTXVLatentVideo,
    "KSampler": KSampler,
    "VAEDecode": VAEDecode,
    "SaveImage": SaveImage,
}
