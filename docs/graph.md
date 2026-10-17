# Graph

A workflow is nodes and wires. Run does not send the drawing. It sends a compiled prompt: a map of node id to `class_type` and `inputs`. Links are `[nodeId, slot]`, the same shape a Comfy-style client posts to `/prompt`.

## Nodes

| Kind | Role | Outputs |
|---|---|---|
| Diffusion | One weight file. Checkpoint or diffusion folder. | model, and for a checkpoint also clip and vae |
| LoRA | Applied to the model line. Optional. | model, clip |
| Text encoder | CLIP, T5, Qwen, UMT5, Gemma | clip |
| VAE | The decode VAE, and for Flux the file the pipeline must load | vae |
| Prompt | Positive or negative text | conditioning |
| Sampler | Steps, CFG, size, seed, batch, frames | image |
| Save | Filename prefix |  |

Add them from the + button, or drag a library row onto the canvas. Dragging picks the node kind from the folder: checkpoints and diffusion models become diffusion nodes, LoRAs become LoRA nodes, VAEs become VAE nodes, text encoders become text encoder nodes.

## How to wire a still

1. Text encoder `clip` → prompt `clip`.
2. Prompt `conditioning` → sampler `positive`.
3. A second prompt, if you want a negative, the same way into `negative`.
4. Diffusion `model` → sampler `model`.
5. If you use a LoRA: diffusion → LoRA `model`, LoRA `model` → sampler `model`. The compiler also needs the clip line through the LoRA, and it will attach the clip from the prompt side when it builds the prompt JSON.
6. VAE → sampler `vae`.
7. Sampler `image` → save.

Flux wants two text encoder nodes, both wired to the positive prompt’s clip port.

The model chain must be diffusion, then zero or more LoRAs, then the sampler. Anything else on that chain is an error.

## Inspector

Select a node.

- Diffusion: file, and a weight dtype of `default`, `fp8_e4m3fn`, or `fp8_e5m2`. Dtype is a hint to the loader. The file’s own packing wins when the pipeline ignores the hint.
- LoRA: file, model strength, CLIP strength. 1 is full strength. 0.6 to 0.8 is a usual range for a style LoRA.
- Prompt: positive or negative, and the text.
- Sampler: steps, CFG / guidance, width, height, batch, frames, denoise, sampler name, scheduler, seed.
- Save: prefix, default `locgen`.

Width and height step by 64 and allow 256 to 2560. Frames run from 1 to 241. Batch runs from 1 to 8. Video families should keep batch at 1 and use frames.

Sampler names: euler, euler ancestral, dpmpp 2m, dpmpp sde, uni_pc, heun, ddim, lcm.

Schedulers: simple, normal, karras, beta, exponential, sgm uniform.

The engine passes steps, CFG, seed, width, and height through. Sampler name and scheduler are stored on the job. Diffusers pipelines used for the newer families have their own schedulers, so those two fields do not retune a Krea or Qwen run the way they retune an SDXL checkpoint. Euler and simple are the honest defaults.

Denoise is kept on the graph for img2img-style jobs. The current sampler treats the latent as a full denoise.

## What the compiler emits

For a diffusion-folder file:

```
UNETLoader
CLIPLoader or DualCLIPLoader
LoraLoader, once per LoRA
VAELoader
CLIPTextEncode
FluxGuidance          only Flux and SD3, and only when CFG > 1
EmptySD3LatentImage   stills
EmptyHunyuanLatentVideo   Wan, Hunyuan, MiniMax
EmptyLTXVLatentVideo      LTX
KSampler
VAEDecode
SaveImage
```

Dual CLIP is only for Flux, SD3, and Hunyuan, and only when two encoders are wired. Every other family uses one `CLIPLoader`. A second encoder on a Krea or Qwen graph is ignored, with a warning.

CLIP `type` values:

| Family | type |
|---|---|
| Flux | `flux` |
| Flux 2 Klein | `flux2` |
| SD3 | `sd3` |
| SDXL | `sdxl` |
| Hunyuan | `hunyuan_video` |
| Krea 2 | `krea2` |
| Qwen Image, Z-Image | `qwen_image` |
| Wan | `wan` |
| LTX | `ltxv` |
| MiniMax | `minimax` |
| SD 1.5 | `stable_diffusion` |

For a checkpoint, the loader is `CheckpointLoaderSimple`. Its outputs are model, clip, and vae. The latent is `EmptyLatentImage` unless the family is one of the diffusion-folder families.

The status line is the compile summary: file, LoRAs, steps, CFG or guidance, size, and frames when the family is video. **Graph ready** means there is no error-level issue. Warnings still compile. API graph shows the JSON that will be posted.

## Rules that block Run

- No sampler, or the sampler’s model port is empty.
- Diffusion node has no file.
- A LoRA node has no file.
- No positive prompt.
- A diffusion-folder model has no text encoder. The message names the encoder that family wants.
- A diffusion-folder model has no VAE.
- No CLIP source at all.

Warnings you can ignore once you understand them:

- More than one sampler. The one wired to a model is compiled.
- A diffusion-family file sitting in `checkpoints`. `UNETLoader` will not see it.
- No negative prompt. An empty one is encoded.
- Text encoders wired on a checkpoint. The checkpoint CLIP is dropped.
- A file in `unet\` instead of `diffusion_models`. It still loads.

## Seeds and repeats

The seed is a number on the sampler. Change it for another image. The studio does not randomize it on each Run. That is deliberate, so a failed run can be repeated after you fix a path.

## Several graphs

Graphs are a list in the browser. The menu switches, duplicates a template, creates an empty graph, or deletes the current one. Deleting does not delete weight files. An empty graph is a blank canvas with a name.

Pan and zoom are per graph. Fit frames the nodes. Drag a port to connect. Delete removes the selected node.
