"""Weight loading and sampling.

torch, diffusers, transformers, safetensors and pillow are imported from the
pythonembedded runtime. They are not imported until a real sample runs.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any

from locgen.nodes import Cond, ModelRef


def _device_and_dtype():
    import torch

    if torch.cuda.is_available():
        return "cuda", torch.bfloat16
    return "cpu", torch.float32


def _torch_dtype(name: str, fallback):
    import torch

    table = {
        "fp8_e4m3fn": getattr(torch, "float8_e4m3fn", fallback),
        "fp8_e5m2": getattr(torch, "float8_e5m2", fallback),
    }
    return table.get(name, fallback)


def _apply_loras(pipe, loras: list[tuple[str, float, float]]) -> None:
    if not loras:
        return
    names = []
    weights = []
    for index, (path, strength, _clip) in enumerate(loras):
        adapter = f"locgen_{index}"
        pipe.load_lora_weights(path, adapter_name=adapter)
        names.append(adapter)
        weights.append(float(strength))
    pipe.set_adapters(names, adapter_weights=weights)


def _load_dir_encoder(path: Path, kind: str):
    if kind == "t5":
        from transformers import T5EncoderModel

        return T5EncoderModel.from_pretrained(path, local_files_only=True)
    from transformers import CLIPTextModel

    return CLIPTextModel.from_pretrained(path, local_files_only=True)


def _load_file_encoder(path: Path, kind: str):
    from safetensors.torch import load_file

    config_dir = Path(__file__).resolve().parent / "configs" / ("t5" if kind == "t5" else "clip_l")
    state = load_file(str(path))
    cleaned = {}
    for key, value in state.items():
        name = key
        for prefix in ("conditioner.embedders.0.transformer.", "conditioner.embedders.1.model.", "clip_l.", "t5xxl."):
            if name.startswith(prefix):
                name = name[len(prefix) :]
        cleaned[name] = value
    if kind == "t5":
        from transformers import T5Config, T5EncoderModel

        model = T5EncoderModel(T5Config.from_pretrained(config_dir))
    else:
        from transformers import CLIPTextConfig, CLIPTextModel

        model = CLIPTextModel(CLIPTextConfig.from_pretrained(config_dir))
    missing, unexpected = model.load_state_dict(cleaned, strict=False)
    if len(missing) > len(cleaned) * 0.5:
        raise RuntimeError(
            f"{path.name} does not match the {kind} encoder layout ({len(missing)} missing keys). "
            "Use a text-encoder folder that contains config.json, or a Comfy-exported CLIP-L / T5 safetensors."
        )
    if unexpected and len(unexpected) > len(cleaned) * 0.5:
        raise RuntimeError(f"{path.name} has an unrecognised key layout.")
    return model


def _encoder(path: str):
    file = Path(path)
    raw = file.name.lower()
    if any(token in raw for token in ("qwen", "gemma", "llama", "minimax")):
        if file.is_dir():
            from transformers import AutoModel

            return AutoModel.from_pretrained(file, local_files_only=True), "other"
        raise RuntimeError(
            f"{file.name} is a single-file text encoder. The diffusion loader could not open the weight by itself. "
            "Use a diffusers build that supports this family, or place the encoder as a folder with config.json and its tokenizer."
        )
    kind = "t5" if any(token in raw for token in ("t5", "umt5")) else "clip"
    if file.is_dir():
        return _load_dir_encoder(file, kind), kind
    return _load_file_encoder(file, kind), kind


def _tokenizer(kind: str, sibling: Path):
    local = sibling.parent / ("t5_tokenizer" if kind == "t5" else "clip_tokenizer")
    if kind == "t5":
        from transformers import T5TokenizerFast

        if local.is_dir():
            return T5TokenizerFast.from_pretrained(local, local_files_only=True)
        return T5TokenizerFast.from_pretrained("google/t5-v1_1-xxl", local_files_only=False)
    from transformers import CLIPTokenizer

    if local.is_dir():
        return CLIPTokenizer.from_pretrained(local, local_files_only=True)
    return CLIPTokenizer.from_pretrained("openai/clip-vit-large-patch14", local_files_only=False)


def _move(pipe, dtype):
    device, _ = _device_and_dtype()
    if device == "cuda":
        pipe.enable_model_cpu_offload()
    else:
        pipe.to("cpu")
    if getattr(pipe, "vae", None) is not None and hasattr(pipe.vae, "enable_tiling"):
        pipe.vae.enable_tiling()
    return pipe


def _flux(
    model: ModelRef,
    positive: Cond,
    negative: Cond,
    vae_path: str | None,
    width,
    height,
    steps,
    guidance,
    seed,
):
    import torch
    from diffusers import AutoencoderKL, FlowMatchEulerDiscreteScheduler, FluxPipeline, FluxTransformer2DModel

    dtype = _torch_dtype(model.dtype, torch.bfloat16 if torch.cuda.is_available() else torch.float32)
    transformer = FluxTransformer2DModel.from_single_file(model.path, torch_dtype=dtype)
    if not vae_path:
        raise RuntimeError("Flux needs a VAE such as ae.safetensors in vae/.")
    vae = AutoencoderKL.from_single_file(vae_path, torch_dtype=dtype)
    clip_model = None
    t5_model = None
    clip_tok = None
    t5_tok = None
    for path in positive.clip.paths:
        encoder, kind = _encoder(path)
        if kind == "t5":
            t5_model = encoder
            t5_tok = _tokenizer("t5", Path(path))
        else:
            clip_model = encoder
            clip_tok = _tokenizer("clip", Path(path))
    if clip_model is None or t5_model is None:
        raise RuntimeError("Flux needs CLIP-L and T5-XXL in text_encoders/.")
    pipe = FluxPipeline(
        scheduler=FlowMatchEulerDiscreteScheduler(),
        text_encoder=clip_model,
        tokenizer=clip_tok,
        text_encoder_2=t5_model,
        tokenizer_2=t5_tok,
        vae=vae,
        transformer=transformer,
    )
    pipe = _move(pipe, dtype)
    _apply_loras(pipe, model.loras)
    generator = torch.Generator(device="cpu").manual_seed(int(seed))
    result = pipe(
        prompt=positive.text,
        prompt_2=positive.text,
        negative_prompt=negative.text or None,
        width=int(width),
        height=int(height),
        num_inference_steps=int(steps),
        guidance_scale=float(guidance),
        generator=generator,
        output_type="pil",
    )
    return result.images[0]


def _checkpoint(
    model: ModelRef,
    positive: Cond,
    negative: Cond,
    vae_path: str | None,
    width,
    height,
    steps,
    cfg,
    seed,
    sampler,
):
    import torch
    from diffusers import AutoencoderKL, StableDiffusionPipeline, StableDiffusionXLPipeline

    _, dtype = _device_and_dtype()
    loader = StableDiffusionXLPipeline if model.kind == "sdxl" else StableDiffusionPipeline
    try:
        pipe = loader.from_single_file(model.path, torch_dtype=dtype, local_files_only=True)
    except Exception:
        pipe = loader.from_single_file(model.path, torch_dtype=dtype)
    if vae_path:
        pipe.vae = AutoencoderKL.from_single_file(vae_path, torch_dtype=dtype)
    pipe = _move(pipe, dtype)
    _apply_loras(pipe, model.loras)
    generator = torch.Generator(device="cpu").manual_seed(int(seed))
    kwargs = {
        "prompt": positive.text,
        "negative_prompt": negative.text or None,
        "width": int(width),
        "height": int(height),
        "num_inference_steps": int(steps),
        "guidance_scale": float(cfg),
        "generator": generator,
    }
    if sampler:
        kwargs["num_inference_steps"] = int(steps)
    result = pipe(**kwargs)
    return result.images[0]


def _first_class(module, names: tuple[str, ...]):
    for name in names:
        cls = getattr(module, name, None)
        if cls is not None:
            return cls
    return None


def _take_image(result):
    images = getattr(result, "images", None)
    if images:
        return images[0]
    frames = getattr(result, "frames", None)
    if frames:
        first = frames[0]
        if isinstance(first, (list, tuple)):
            return first[0]
        return first
    if isinstance(result, (list, tuple)) and result:
        return result[0]
    raise RuntimeError("The pipeline returned no image.")


def _invoke(pipe, kwargs: dict):
    from inspect import Parameter, signature

    sig = signature(pipe.__call__)
    if any(param.kind == Parameter.VAR_KEYWORD for param in sig.parameters.values()):
        return pipe(**kwargs)
    allowed = {key: value for key, value in kwargs.items() if key in sig.parameters}
    return pipe(**allowed)


_MODERN = {
    "krea2": ("Krea2Pipeline", ("Krea2Transformer2DModel",)),
    "qwen": ("QwenImage21Pipeline", ("QwenImage21Transformer2DModel", "QwenImageTransformer2DModel")),
    "zimage": ("ZImagePipeline", ("ZImageTransformer2DModel",)),
    "flux2": ("Flux2Pipeline", ("Flux2Transformer2DModel",)),
    "wan": ("WanPipeline", ("WanTransformer3DModel",)),
    "ltxv": ("LTX2Pipeline", ("LTX2VideoTransformer3DModel", "LTXVideoTransformer3DModel")),
    "minimax": ("MiniMaxH3Pipeline", ("MiniMaxH3Transformer3DModel",)),
    "hunyuan": ("HunyuanVideoPipeline", ("HunyuanVideoTransformer3DModel",)),
}


def _modern(model: ModelRef, positive: Cond, negative: Cond, vae_path: str | None, width, height, steps, cfg, seed, frames):
    import torch
    import diffusers

    pipe_name, transformer_names = _MODERN[model.kind]
    pipe_cls = getattr(diffusers, pipe_name, None)
    if pipe_cls is None and model.kind == "qwen":
        pipe_cls = getattr(diffusers, "QwenImagePipeline", None)
    if pipe_cls is None and model.kind == "ltxv":
        pipe_cls = getattr(diffusers, "LTXPipeline", None)
    if pipe_cls is None:
        raise RuntimeError(
            f"{model.kind} needs a newer diffusers in pythonembedded (looking for {pipe_name}). "
            "The graph is valid. Upgrade diffusers, then run again."
        )
    dtype = _torch_dtype(model.dtype, torch.bfloat16 if torch.cuda.is_available() else torch.float32)
    pipe = None
    try:
        pipe = pipe_cls.from_single_file(model.path, torch_dtype=dtype)
    except Exception:
        pipe = None
    if pipe is None:
        transformer_cls = _first_class(diffusers, transformer_names)
        if transformer_cls is None or not hasattr(transformer_cls, "from_single_file"):
            raise RuntimeError(f"{pipe_name} could not read {Path(model.path).name} as a single file.")
        transformer = transformer_cls.from_single_file(model.path, torch_dtype=dtype)
        kwargs = {"transformer": transformer, "torch_dtype": dtype}
        if vae_path:
            from diffusers import AutoencoderKL

            kwargs["vae"] = AutoencoderKL.from_single_file(vae_path, torch_dtype=dtype)
        if positive.clip.paths:
            encoder, _kind = _encoder(positive.clip.paths[0])
            kwargs["text_encoder"] = encoder
        pipe = pipe_cls(**{key: value for key, value in kwargs.items() if key != "torch_dtype"})
    elif vae_path:
        try:
            from diffusers import AutoencoderKL

            pipe.vae = AutoencoderKL.from_single_file(vae_path, torch_dtype=dtype)
        except Exception:
            pass
    pipe = _move(pipe, dtype)
    _apply_loras(pipe, model.loras)
    generator = torch.Generator(device="cpu").manual_seed(int(seed))
    call = {
        "prompt": positive.text,
        "negative_prompt": negative.text or None,
        "width": int(width),
        "height": int(height),
        "num_inference_steps": int(steps),
        "guidance_scale": float(cfg),
        "generator": generator,
        "num_frames": int(frames),
    }
    return _take_image(_invoke(pipe, call))


def _edit_classes(kind: str, mode: str) -> tuple[str, ...]:
    if mode == "inpaint":
        return {
            "sdxl": ("StableDiffusionXLInpaintPipeline",),
            "sd15": ("StableDiffusionInpaintPipeline",),
            "flux": ("FluxFillPipeline",),
            "flux2": ("Flux2FillPipeline",),
            "krea2": ("Krea2InpaintPipeline", "QwenImageInpaintPipeline"),
            "qwen": ("QwenImageInpaintPipeline", "QwenImageEditPlusPipeline"),
            "zimage": ("ZImageInpaintPipeline",),
        }.get(kind, ())
    return {
        "sdxl": ("StableDiffusionXLImg2ImgPipeline",),
        "sd15": ("StableDiffusionImg2ImgPipeline",),
        "flux": ("FluxImg2ImgPipeline",),
        "flux2": ("Flux2Img2ImgPipeline",),
        "krea2": ("Krea2Img2ImgPipeline", "QwenImageImg2ImgPipeline"),
        "qwen": ("QwenImageImg2ImgPipeline", "QwenImageEditPipeline"),
        "zimage": ("ZImageImg2ImgPipeline",),
    }.get(kind, ())


def _edit_image(model, positive, negative, vae_path, width, height, steps, cfg, seed, denoise, init_image, mask, edit_mode):
    import torch
    import diffusers

    mode = "inpaint" if edit_mode == "outpaint" or mask is not None and edit_mode != "edit" else "edit"
    if edit_mode == "inpaint" or edit_mode == "outpaint":
        mode = "inpaint"
    names = _edit_classes(model.kind, mode)
    pipe_cls = _first_class(diffusers, names) if names else None
    if pipe_cls is None:
        wanted = names[0] if names else f"{model.kind} img2img"
        raise RuntimeError(
            f"{model.kind} {edit_mode} needs {wanted} in the diffusers build inside pythonembedded. "
            "Text-to-image still runs. Upgrade diffusers, or use an SDXL checkpoint for edit, inpaint, and outpaint."
        )
    dtype = _torch_dtype(model.dtype, torch.float16 if torch.cuda.is_available() else torch.float32)
    try:
        pipe = pipe_cls.from_single_file(model.path, torch_dtype=dtype, local_files_only=True)
    except Exception:
        pipe = pipe_cls.from_single_file(model.path, torch_dtype=dtype)
    if vae_path:
        try:
            from diffusers import AutoencoderKL

            pipe.vae = AutoencoderKL.from_single_file(vae_path, torch_dtype=dtype)
        except Exception:
            pass
    if positive.clip.paths and model.kind not in ("sdxl", "sd15"):
        try:
            encoder, _kind = _encoder(positive.clip.paths[0])
            pipe.text_encoder = encoder
        except Exception:
            pass
    pipe = _move(pipe, dtype)
    _apply_loras(pipe, model.loras)
    image = init_image.convert("RGB").resize((int(width), int(height)))
    strength = min(1.0, max(0.01, float(denoise)))
    generator = torch.Generator(device="cpu").manual_seed(int(seed))
    call = {
        "prompt": positive.text,
        "negative_prompt": negative.text or None,
        "image": image,
        "strength": strength,
        "width": int(width),
        "height": int(height),
        "num_inference_steps": int(steps),
        "guidance_scale": float(cfg if model.kind in ("sdxl", "sd15") else max(cfg, 1)),
        "generator": generator,
    }
    if mode == "inpaint":
        painted = mask.convert("L").resize((int(width), int(height))) if mask is not None else None
        if painted is None:
            raise RuntimeError("Inpaint and outpaint need a mask. Paint the area to change, or set padding for outpaint.")
        call["mask_image"] = painted
    return _take_image(_invoke(pipe, call))


def sample_image(
    model: ModelRef,
    positive: Cond,
    negative: Cond,
    vae_path: str | None,
    width: int,
    height: int,
    steps: int,
    cfg: float,
    guidance: float,
    seed: int,
    sampler: str,
    scheduler: str,
    denoise: float,
    frames: int = 1,
    init_image: Any = None,
    mask: Any = None,
    edit_mode: str = "generate",
) -> Any:
    del scheduler
    if init_image is not None and edit_mode in ("edit", "inpaint", "outpaint"):
        return _edit_image(
            model,
            positive,
            negative,
            vae_path,
            width,
            height,
            steps,
            cfg if model.kind in ("sdxl", "sd15") else guidance,
            seed,
            denoise,
            init_image,
            mask,
            edit_mode,
        )
    if model.kind == "flux":
        if positive.clip.paths:
            return _flux(model, positive, negative, vae_path, width, height, steps, guidance, seed)
        raise RuntimeError("The Flux graph has no text encoders.")
    if model.kind in ("sdxl", "sd15"):
        return _checkpoint(model, positive, negative, vae_path, width, height, steps, cfg, seed, sampler)
    if model.kind in _MODERN:
        if not positive.clip.paths and model.kind not in ("sdxl", "sd15"):
            raise RuntimeError(f"{model.kind} needs its text encoder wired to the prompt.")
        return _modern(model, positive, negative, vae_path, width, height, steps, cfg, seed, frames)
    if model.kind == "unet":
        raise RuntimeError("This diffusion file is not a family the engine knows yet.")
    raise RuntimeError(f"No sampler for model kind {model.kind}.")


def save_png(image: Any, prefix: str, folder: Path) -> list[dict]:
    safe = prefix.replace("\\", "/").strip("/") or "locgen"
    rel = Path(safe)
    if rel.is_absolute() or ".." in rel.parts:
        rel = Path("locgen")
    target_dir = folder / rel.parent
    target_dir.mkdir(parents=True, exist_ok=True)
    stem = rel.name
    existing = list(target_dir.glob(f"{stem}_*.png"))
    filename = f"{stem}_{len(existing) + 1:05d}.png"
    path = target_dir / filename
    if hasattr(image, "save"):
        image.save(path)
    else:
        raise RuntimeError("The sampler did not return an image.")
    subfolder = "" if rel.parent == Path(".") else str(rel.parent).replace("\\", "/")
    return [{"filename": filename, "subfolder": subfolder, "type": "output"}]
