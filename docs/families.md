# Families

The diffusion filename picks the family. The graph then asks for the text encoder type and the latent that family expects. Swapping a Qwen file into a Flux graph, or a Flux file into a Krea graph, compiles the wrong loader. Change the diffusion file and use the matching template, or rewire the text encoder and VAE.

Templates live under **Graphs**. Steps and CFG below are the template defaults, not a claim that every finetune wants them.

## Flux

Files: `flux1-dev`, `flux1-schnell`, and other names containing `flux` but not `flux-2` or `klein`.

| Slot | Where | Typical file |
|---|---|---|
| Diffusion | `diffusion_models` | `flux1-dev-fp8.safetensors` |
| CLIP-L | `text_encoders` | `clip_l.safetensors` |
| T5-XXL | `text_encoders` | `t5xxl_fp8_e4m3fn.safetensors` |
| VAE | `vae` | `ae.safetensors` |

Both encoders must be wired into the positive prompt. The compiler emits `DualCLIPLoader` with type `flux`. With CFG above 1 it inserts `FluxGuidance` and sets the sampler CFG to 1. That is the Flux dev pattern. Schnell stays at CFG 1 and 4 steps, and does not need guidance.

Dev and schnell are different licenses. See [NOTES.md](../NOTES.md).

LoRAs trained on Flux go on a LoRA node between the diffusion loader and the sampler.

## Flux 2 Klein

Names containing `flux-2`, `flux_2`, `flux2`, or `klein`.

| Slot | Typical file |
|---|---|
| Diffusion | `flux-2-klein-9b.safetensors` (4B exists too) |
| Text encoder | one Qwen3, `qwen_3_8b` or `qwen_3_4b` matched to the size |
| VAE | `flux2-vae.safetensors` |

One encoder. `CLIPLoader` type `flux2`. The template is 4 steps, CFG 1, 1024×1024. There is no second CLIP-L tower and no Flux guidance node.

## Krea 2

Names containing `krea2`, `krea-2`, or `krea 2`.

| Slot | Typical file |
|---|---|
| Diffusion | `krea2_turbo_….safetensors` or `krea2_raw_….safetensors` |
| Text encoder | `qwen3vl_4b_….safetensors` |
| VAE | `qwen_image_vae.safetensors` |

`CLIPLoader` type `krea2`. Turbo is the distilled checkpoint: 8 steps, CFG 1. The raw checkpoint wants more steps. The template assumes turbo. If you load the raw file, raise steps before you judge the model.

The VAE is the Qwen image VAE, not `ae.safetensors`.

## Qwen Image 2.1

Names containing `qwen`. This also matches older Qwen Image files. The pipeline class tried first is `QwenImage21Pipeline`, then `QwenImagePipeline`.

| Slot | Typical file |
|---|---|
| Diffusion | `qwen_image_2.1_bf16` or `qwen_image_2.1_int8_convrot` |
| Text encoder | `qwen3vl_8b_bf16` or `qwen3vl_8b_int8_convrot` |
| VAE | `qwen_image_2.1_vae_bf16.safetensors` |

`CLIPLoader` type `qwen_image`. Template: 20 steps, CFG 1, 1328×1328. A turbo LoRA, when you have one, is a LoRA node at strength 1, with steps around 8 and CFG 1. The base model is happier with more steps than the turbo path.

Prompt-enhancer weights (`qwen3.5_9b_…_pe_`) are not the diffusion file and not the 8B encoder. Do not put them on the diffusion node.

The Qwen Research License is the usual grant on these weights. Read it.

Square sizes that stay on a 16-pixel lattice and are known to behave: 1328, and the 1664×928 / 928×1664 pair. The sampler will accept other sizes. The model may not like them.

## Z-Image

Names containing `z-image`, `z_image`, or `zimage`.

| Slot | Typical file |
|---|---|
| Diffusion | `z_image_turbo_….safetensors` |
| Text encoder | a Qwen3 encoder, often the 4B |
| VAE | the VAE that shipped with the release; the template uses the Qwen image VAE as a stand-in label |

`CLIPLoader` type `qwen_image`, because the text tower is a Qwen encoder. Template: 8 steps, CFG 1, 1024×1024. Turbo is a distilled model. Extra steps past the distilled budget rarely help and sometimes hurt.

The pipeline class is `ZImagePipeline`.

## SDXL and SD 1.5

These are checkpoints, not diffusion-folder files.

| Family | How a name matches | Loader |
|---|---|---|
| SDXL | `sdxl`, `juggernaut`, or `xl` as its own token | `CheckpointLoaderSimple` |
| SD 1.5 | `sd15`, `1.5`, `v1-5` | `CheckpointLoaderSimple` |

CLIP and VAE ride inside the file. You can still wire a VAE node. You usually do, for a finetune that was trained on a specific VAE. Wiring text encoders replaces the checkpoint CLIP. Leaving them off is the normal SDXL graph.

Template for SDXL base: 28 steps, CFG 6, `dpmpp_2m` / `karras`, 1024×1024.

## SD3

Names containing `sd3`. Treated as a diffusion-folder model with a dual text encoder when you wire two files, type `sd3`. Guidance follows the Flux pattern when CFG is above 1. The engine’s dedicated sampler path for SD3 is the modern pipeline table only if the filename did not fall through to another family. A plain SD3 checkpoint in `checkpoints` is loaded as a checkpoint, not as Flux.

## Wan 2.2

Names containing `wan`, and UMT5 text encoders.

| Slot | Typical file |
|---|---|
| Diffusion | `wan2.2_t2v_….safetensors` |
| Text encoder | `umt5_xxl_….safetensors` |
| VAE | `wan_2.1_vae.safetensors` (2.2 still uses this VAE in most packs) |

`CLIPLoader` type `wan`. Latent node `EmptyHunyuanLatentVideo`. Template: 20 steps, CFG 5, 832×480, 49 frames.

High-noise and low-noise pairs exist in Wan 2.2 packs. The template loads the one file you select. It does not chain the two-stage expert schedule by itself. If your pack documents a two-model graph, this template is the single-file version.

## LTX 2.5

Names containing `ltxv`, `ltx-2`, `ltx_2`, `ltx2`, and Gemma encoders.

| Slot | Typical file |
|---|---|
| Diffusion | `ltx-2.5-22b-distilled-….safetensors` |
| Text encoder | `gemma…ltx-2.5….safetensors` |
| VAE | `ltx-2.5-video-vae-bf16.safetensors` |

`CLIPLoader` type `ltxv`. Latent node `EmptyLTXVLatentVideo`. Template: 8 steps, CFG 1, 768×448, 49 frames, because the distilled checkpoint is the one most people run.

An audio VAE is a separate file in the full pack. The studio samples the picture and keeps the first frame. It does not mux audio.

The pipeline class tried first is `LTX2Pipeline`, then `LTXPipeline`.

## MiniMax H3

Names containing `minimax` or `hailuo`.

| Slot | Typical file |
|---|---|
| Diffusion | `minimax_h3_fl2va_….safetensors` or `minimax_h3_ref2va_….safetensors` |
| Text encoder | `qwen3vl_32b_minimax_h3_….safetensors` |
| VAE | `minimax_h3_video_vae_fp16.safetensors` |

`CLIPLoader` type `minimax`. Latent node `EmptyHunyuanLatentVideo`. Template: 20 steps, CFG 1, 768×448, 49 frames.

The 32B encoder dominates VRAM. An fp8 or int8 pack is the realistic file on a single consumer GPU. The audio VAE in the pack is not wired by the template.

Pipeline class: `MiniMaxH3Pipeline`.

## Hunyuan

Names containing `hunyuan`. Dual encoder when two text files are wired, type `hunyuan_video`, video latent. Pipeline class `HunyuanVideoPipeline`. There is no dedicated template. Build it from the Wan template and swap the files, or add the nodes by hand.

## Quick recognition

| Substring | Family |
|---|---|
| `krea2`, `krea-2` | Krea 2 |
| `zimage`, `z-image`, `z_image` | Z-Image |
| `minimax`, `hailuo` | MiniMax H3 |
| `ltxv`, `ltx-2`, `ltx2` | LTX 2.5 |
| `flux2`, `flux-2`, `klein` | Flux 2 Klein |
| `qwen` | Qwen Image |
| `flux` | Flux |
| `wan`, `umt5` | Wan |
| `gemma` | LTX 2.5 |
| `t5` | Flux |
| `xl` | SDXL |
