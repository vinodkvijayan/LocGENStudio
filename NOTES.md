# Notes

Read this before you treat a template as a promise about VRAM, licenses, or video files.

## The studio and the engine are different programs

The studio is the graph editor in the browser. It stores the library, the graphs, and the run history in `localStorage` under the key `locgen-studio-v1`. That data stays in the browser profile. It is not an account and it does not sync.

The engine is a Python process on the PC. It is the only part that opens weight files. If the engine is not running, the canvas still compiles and Runs explains that the browser could not reach `127.0.0.1:8188`.

A hosted preview of the studio cannot see your GPU and cannot read `C:\LocGENStudio`. Use the studio against the engine on the same machine.

## Sample cards are not weights

The library ships with named samples so a graph can be wired before any scan. Those entries are marked as samples. Run blocks them on purpose. Import the manifest or link the folder, then pick the files that were actually found on disk.

Choosing a template adds sample cards only for files the graph needs and that are not already in the library. It does not delete a library you already imported.

## What is sampled

The engine executes this node set:

- `UNETLoader`, `CheckpointLoaderSimple`
- `DualCLIPLoader`, `CLIPLoader`
- `LoraLoader`
- `VAELoader`
- `CLIPTextEncode`, `FluxGuidance`
- `EmptyLatentImage`, `EmptySD3LatentImage`
- `EmptyHunyuanLatentVideo`, `EmptyLTXVLatentVideo`
- `KSampler`, `VAEDecode`, `SaveImage`

Flux dev and schnell go through a Flux pipeline: diffusion file, CLIP-L, T5, and `ae.safetensors`. If guidance is above 1, the graph adds `FluxGuidance` and the sampler CFG is sent as 1.

SDXL and SD 1.5 load with the checkpoint pipeline. A VAE node, if you wire one, replaces the VAE packed in the checkpoint.

Krea 2, Qwen Image, Z-Image, Flux 2 Klein, Wan, LTX, MiniMax, and Hunyuan go through the matching diffusers pipeline when that class exists in `pythonembedded`. The loader tries the pipeline’s single-file entry first, then the transformer’s single-file entry plus the VAE and text encoder.

## What is not sampled

These folders are scanned and shown so the library matches a Comfy-style tree. The graph runner does not execute them:

- ControlNet, IP-Adapter, CLIP vision, style models
- upscale models, hypernetworks, GLIGEN, PhotoMaker
- embeddings (you can still type the embedding name into a prompt on SD 1.5-style runs, if the checkpoint pipeline understands it)
- audio VAEs and audio encoders
- `model_patches` and latent upscalers

GGUF names are indexed. Sampling expects a single-file load that diffusers understands, which in practice means safetensors or ckpt. A GGUF diffusion file will fail at load time with the pipeline error, not with a fake image.

One job runs at a time. The next waits on the engine queue.

## Video comes back as a still

Wan, LTX, and MiniMax compile as video graphs. The latent length is the Frames value. The pipeline is asked for that many frames. Runs displays the first frame, saved as a PNG. There is no timeline in the studio and no audio mux. Use Frames for length, not Batch. Batch is a batch of clips, and it multiplies VRAM.

MiniMax H3 in the wild is often a first-and-last-frame or reference clip model. The template is a text-to-video graph. If your file is the FL2VA or Ref2VA variant, a text-only run may be the wrong graph for that checkpoint. The job error will come from the loader or the pipeline, not from the canvas pretending it worked.

## Text encoders that are a single safetensors

CLIP-L and T5 have small configs in the engine, so a lone `.safetensors` can be loaded for Flux.

Qwen3-VL and Gemma do not. If the diffusion pipeline cannot open the diffusion file by itself, the engine asks you to place that encoder as a folder containing `config.json` and the tokenizer, next to the weights. A single `qwen3vl_8b.safetensors` with no tokenizer will not be guessed into a working encoder.

Some releases also ship a tokenizer directory beside the safetensors. Keep it. The Flux path looks for `text_encoders\clip_tokenizer` and `text_encoders\t5_tokenizer`.

## LoRAs

A LoRA node sits on the model line between the diffusion loader and the sampler. Strength is model strength and CLIP strength. The engine applies the file with the diffusers LoRA loader.

Many LoRAs that were trained for a Comfy graph use key names diffusers does not map. Those fail on the job, with the exception text. A failure is not a silent skip. Body-only or style LoRAs for Krea 2 and Flux belong in `loras\` and on a LoRA node of a graph for that same family.

## Licenses sit on the weights

LocGENStudio does not grant a license to any model. The file you downloaded keeps the license it shipped with.

Pay attention in particular to:

- Qwen Image 2.1 is commonly distributed under the Qwen Research License, which is not a general commercial grant. Read the license next to the weights before you publish the output.
- Flux dev has its own non-commercial terms. Schnell is a different license. Do not assume they match.
- Krea 2, Wan, LTX, MiniMax, and Z-Image each have their own terms.

The sample names in the library are labels, not copies of those weights, and they are not a redistribution.

## VRAM, roughly

These are planning numbers, not measurements on your card. Offload is enabled when CUDA is present, and the VAE is tiled when the pipeline allows it. That lowers the peak and raises the time.

| Setup | What usually fits |
|---|---|
| 8 GB | SD 1.5. SDXL is tight. Flux and the 2026 models generally do not. |
| 12 GB | SDXL. Flux schnell in fp8 sometimes, with offload and patience. |
| 16 GB | Flux fp8, Krea 2 turbo, Z-Image turbo, Qwen Image 2.1 in the int8 pack. Wan and LTX at modest frames. |
| 24 GB and up | Flux fp16, longer video, MiniMax H3 more comfortably. |

Qwen3-VL 8B plus a diffusion file is two large loads. The int8 and fp8 packs exist because the bf16 pair does not fit a 16 GB card. MiniMax’s 32B text encoder is larger still.

If a run dies in the engine window with an out-of-memory message, lower frames, lower resolution, or switch to the quantized file. The studio does not catch CUDA OOM before it happens.

## Time

The browser gives up after about five minutes of polling (150 checks, two seconds apart). A first Flux load on a cold cache can spend most of that in weight loading. If the engine window is still sampling, the PNG still appears in `output\` even when Runs says the engine is still working. Raise nothing in the browser. Wait, then open the output folder.

## Filenames and family detection

Detection is by name, in this order: Krea 2, Z-Image, MiniMax, LTX, Flux 2 / Klein, Qwen, Flux, Wan / UMT5, Hunyuan, SD3, SDXL, SD 1.5, Gemma as LTX, T5 as Flux.

So `umt5` is Wan, not Flux. `flux-2-klein` is Klein, not Flux 1. `qwen3vl` on a text encoder is Qwen even when you use it for Krea 2. That is fine. The diffusion file decides the pipeline. The text encoder is just the file you wired.

`xl` inside a later token will not steal a file that already matched Qwen or LTX. A checkpoint whose name contains `xl` is SDXL.

## Security of the engine

The engine listens on `127.0.0.1` only, with open CORS so the page can call it. It will not read a path that contains `..` or an absolute path inside a filename. `/view` only serves files under the output directory.

Do not expose port 8188 to your LAN. Anyone who can post to it can run your GPU and read output images.

## Browser storage

Clearing site data drops graphs and the library index. It does not touch the models folder or `output\`. Export is the manifest on disk, which is the thing worth keeping. Graphs themselves are only in the browser.

The engine URL defaults to `http://127.0.0.1:8188`. Change it on the Windows tab if you started the engine on another port. Pass the same port to the starter as `-Port`.

## Diffusers mismatch

A graph can be valid while the installed diffusers is too old. The job text names the pipeline class it looked for, for example `QwenImage21Pipeline` or `Krea2Pipeline`. Upgrade diffusers inside `pythonembedded` and start the engine again. You do not need a new studio graph.

## Not a ComfyUI install

The starter used to look for a separate ComfyUI checkout. It no longer does. The process that must be running is `engine\main.py`. Node class names match the ones the canvas has always compiled, so the prompt JSON is familiar if you have used those loaders. The implementation is LocGENStudio’s, and it only runs the node set listed above.
