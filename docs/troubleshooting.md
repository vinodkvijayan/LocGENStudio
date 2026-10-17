# Troubleshooting

Match the sentence you see, then do the one fix. Do not reinstall the studio for an engine problem.

## Check engine fails immediately

“This browser could not reach the local engine.”

The starter window is not running, or it quit. Read the bottom of that window. The usual lines are:

- `The inference engine was not found at …\engine\main.py` — unzip the engine next to `pythonembedded`, not inside another folder.
- `pythonembedded\python.exe was not found` — the runtime is missing or named something else. `python_embeded` is the only other spelling that is accepted.
- A Python traceback on import — a library is missing. Install `engine\requirements.txt` with that same `python.exe`.

The URL in the studio must be `http://127.0.0.1:8188` unless you changed `-Port`. `https://` and `localhost` with a different port will not work.

A browser extension that proxies all traffic can break loopback. Disable it for this page, or try Edge.

## Check engine works, Run does not

The probe only hits `/system_stats`. Sampling is a later import of torch and diffusers. The run’s red text is the real error. The engine window has the full traceback.

## “This graph still points at the sample library”

The diffusion node, a LoRA, or another selected file is still a built-in sample card. Import the manifest or link the folder, then pick the scanned file on each node. Restoring the sample library puts the samples back and will block Run again.

## “Choose weights from the models folder before running.”

A diffusion or loader node has no file selected.

## “is not under diffusion_models/” or a similar folder

The studio has a name the engine cannot see. The manifest is stale, the file was renamed, or it lives in the wrong folder. Put the file in the folder the loader reads, run the starter again, and reimport.

`text-encoder` is allowed. A random folder such as `models\qwen` is not.

## “needs a newer diffusers”

The graph is fine. Inside `pythonembedded`:

```
python.exe -m pip install -U "diffusers>=0.41"
```

Restart the starter. Qwen Image 2.1, Krea 2 single-file, and MiniMax H3 single-file are the ones that ask for that line. Flux and SDXL do not.

## “single-file text encoder” / config.json

The diffusion pipeline could not open the weight alone, and the text encoder is a bare safetensors of Qwen or Gemma. Put the encoder in a directory that contains `config.json`, the tokenizer files, and the weights. Point the text encoder node at that directory name if the loader is looking for a file, or keep the safetensors next to a tokenizer folder the pipeline can see.

CLIP-L and T5 do not need this. Their configs ship in the engine.

## CUDA out of memory

The engine window says it, and the run repeats it. Lower frames first, then resolution, then switch to the fp8 or int8 file. Close other GPU apps. Offload is already on. A 32B MiniMax encoder plus a video model does not fit every card. See the VRAM table in [NOTES.md](../NOTES.md).

## The run sits on “Loading weights” and then times out

Five minutes is the browser’s patience, not the engine’s. The first load of a 10 GB file plus a text encoder can exceed it on a spinning disk or a cold pagefile. Look at the engine window. If it is still printing or the GPU is busy, let it finish and open `output\`. The PNG is written even if the browser stopped polling.

## Graph ready, but the picture is nonsense or black

- Wrong VAE. Flux on a Qwen VAE, or Krea 2 on `ae.safetensors`, decodes garbage.
- Wrong family. A Klein file run through the Flux template uses CLIP-L and T5.
- CFG far from the template. Turbo models at CFG 7 go muddy. SDXL at CFG 1 goes vague.
- A LoRA at strength 1 from another family.

## Two encoders and a warning

Krea, Qwen, Z-Image, Klein, Wan, LTX, and MiniMax use one text encoder. The extra wire is ignored. Flux is the graph that needs two.

## LoRA throws while loading keys

The file is not a diffusers LoRA for that pipeline. The run is telling the truth. Strength and the graph are not the problem. That LoRA needs a pipeline that understands its key names, or it needs to be converted. The studio does not convert LoRA keys.

## Video job returns one picture

That is the current contract. Frames were sampled as far as the pipeline got, and Runs shows the first frame as a PNG. There is no player and no audio. See [NOTES.md](../NOTES.md).

## Manifest imports zero files

The JSON is not a LocGENStudio manifest, or every entry used a folder name that is not in the map. `app` should be `LocGENStudio`. `models` should be a list of `name`, `folder`, and `bytes`.

## Linked folder is empty

The permission was granted, but the directory has no recognized extensions, or the weights are one level higher than the folder you picked. Pick the folder that contains `diffusion_models` and `vae`, not `diffusion_models` itself.

## Images from an old session disappeared

Runs keeps images as blob URLs in the browser session. After a reload, finished runs can lose the preview even though the PNG is still in `output\`. The output folder is the copy that lasts.

## Port in use

Another engine, or an old window you forgot, is on 8188. Close it, or start with `-Port 8190` and change the URL in the studio.
