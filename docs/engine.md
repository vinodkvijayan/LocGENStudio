# Engine

The engine is the Python process that samples. The studio never loads a weight. If this process is down, Run has nothing to talk to.

## Start

From the studio folder:

```
pythonembedded\python.exe -s engine\main.py --models C:\LocGENStudio\models --listen 127.0.0.1 --port 8188
```

Arguments:

| Flag | Default | Meaning |
|---|---|---|
| `--models` | `C:\LocGENStudio\models` | Models root. Created if missing, including the canonical subfolders. |
| `--output` | the parent of the models root, plus `output` | Where PNGs are written. |
| `--listen` | `127.0.0.1` | Bind address. Leave it on loopback. |
| `--port` | `8188` | Must match the engine URL in the studio. |

`pythonembedded\python.exe -s` keeps the embeddable runtime from picking up a user site-packages by accident. The engine also inserts `pythonembedded\Lib\site-packages` when that directory exists.

Version string reported to the studio is the engine version, currently 1.0.0. The Windows tab shows it next to the GPU name.

## Process model

`/prompt` validates the graph and returns a `prompt_id` immediately. A single worker thread runs the graph. History is written when the job finishes, so the studio keeps polling until then. One job at a time. Further prompts sit on the queue.

Validation failures return HTTP 400 and never enter the queue. Sampling failures become a history item with `status_str` `error` and `exception_message` set. The studio shows that message on the run.

## HTTP

CORS allows any origin, so a page on another host can call loopback. Methods are GET, POST, and OPTIONS.

### `GET /system_stats`

```json
{
  "system": { "comfyui_version": "1.0.0" },
  "devices": [{ "name": "NVIDIA GeForce RTX …" }]
}
```

The field is named `comfyui_version` because that is the field the studio already reads. The value is the LocGENStudio engine version. The device name is the CUDA device, or `pythonembedded`, or `CPU`.

### `POST /prompt`

```json
{ "prompt": { "1": { "class_type": "UNETLoader", "inputs": {} } }, "client_id": "…" }
```

Success:

```json
{ "prompt_id": "…", "number": 0 }
```

Failure:

```json
{ "error": { "message": "…" }, "node_errors": { "3": { "errors": [{ "message": "…" }] } } }
```

### `GET /history/{prompt_id}`

Missing jobs return an empty object. A finished job:

```json
{
  "prompt_id": {
    "outputs": {
      "9": { "images": [{ "filename": "krea2_00001.png", "subfolder": "locgen", "type": "output" }] }
    },
    "status": { "status_str": "success", "completed": true, "messages": [] }
  }
}
```

### `GET /queue`

```json
{
  "queue_running": [[0, "prompt_id"]],
  "queue_pending": [[0, "prompt_id"]]
}
```

The studio uses this to say “Sampling on this PC” or how many jobs are waiting.

### `GET /view?filename&subfolder&type`

Returns the PNG. `filename` and `subfolder` are checked so they cannot leave the output directory. Anything else is 404.

## How a graph runs

Links are resolved depth-first. Each node’s `run` method returns a tuple. Slot 0 is the first output. Cycles are errors. The sinks are the nodes nothing else reads, which should include `SaveImage`.

`KSampler` does not denoise by itself. It stores the request on the latent: model, prompts, steps, CFG, guidance, seed, sampler, scheduler, denoise, frames. `VAEDecode` is what calls the sampler, because that is the node that has both the latent and the VAE path. `SaveImage` writes the PNG.

That split matters for Flux. The VAE file is not an input of `KSampler` in the compiled graph. It arrives at `VAEDecode`, and the Flux pipeline is built with that file.

## Pipelines

| Kind | How it samples |
|---|---|
| `flux` | Flux pipeline. Diffusion file, CLIP-L, T5-XXL, VAE, guidance scale from Flux guidance. |
| `sdxl`, `sd15` | Checkpoint pipeline from the single file. Optional VAE replacement. |
| `krea2` | `Krea2Pipeline` |
| `qwen` | `QwenImage21Pipeline`, then `QwenImagePipeline` |
| `zimage` | `ZImagePipeline` |
| `flux2` | `Flux2Pipeline` |
| `wan` | `WanPipeline` |
| `ltxv` | `LTX2Pipeline`, then `LTXPipeline` |
| `minimax` | `MiniMaxH3Pipeline` |
| `hunyuan` | `HunyuanVideoPipeline` |

If the class is missing, the job says which name it needed and that the graph itself is valid. If the class exists but `from_single_file` fails, it tries the transformer class, then the VAE and the text encoder.

On CUDA the pipeline is moved with model CPU offload, and the VAE is tiled when the object supports it. The seed generator is on CPU so the same seed does not depend on a GPU RNG.

LoRAs are applied with `load_lora_weights` and `set_adapters` before the call.

## Libraries

`engine/requirements.txt`:

```
torch
diffusers
transformers
safetensors
accelerate
pillow
```

They are imported when a real sample starts, not when the process boots. `Check engine` therefore succeeds even if torch is broken. The first Run is when a bad install shows up.

CLIP-L and T5 configs shipped in `engine/locgen/configs/` are small architecture files so a bare safetensors encoder can be constructed. They are not the weights.

## Checking it without a GPU

From the `engine` folder:

```
python -m locgen.selftest
```

The self-test builds a tiny graph, substitutes the sampler, and checks `/system_stats`, `/prompt`, `/history`, and `/view`, including a rejection of a `../` filename. It does not load torch.
