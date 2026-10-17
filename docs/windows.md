# Windows starter

`LocGENStudio.exe` is the single file. It unpacks the studio and the engine, starts inference on this PC, and opens the browser. `Start-LocGENStudio.ps1` is the older folder layout, still useful if you want to see the engine directory.

## One exe

Put `LocGENStudio.exe` where you want it. Models stay outside:

- `models` next to the exe, or
- `C:\LocGENStudio\models` if that folder already exists

The release exe does not contain Python. It finds `pythonembedded` next to the exe or at `C:\LocGENStudio\pythonembedded`.

`Build-LocGENStudioExe.ps1` folds that Python folder into a new exe. If the folder is missing, the script downloads embeddable Python 3.12 and installs PyTorch (CUDA 12.8), diffusers, transformers, safetensors, accelerate and pillow. The new exe is several GB. Only the model weights are left for you to download.

## Run the script

```
powershell -ExecutionPolicy Bypass -File .\Start-LocGENStudio.ps1 -Root 'C:\LocGENStudio\models' -Port 8188
```

`-Root` is the models folder. `-Port` defaults to 8188.

The script stops on the first hard error (`$ErrorActionPreference = 'Stop'`).

## What it creates

For each canonical folder it runs `New-Item -Force`. Existing files are left in place. Alias folders are not created.

Canonical folders:

`checkpoints`, `diffusion_models`, `unet`, `loras`, `vae`, `clip`, `text_encoders`, `clip_vision`, `embeddings`, `controlnet`, `upscale_models`, `hypernetworks`, `style_models`, `ipadapter`, `vae_approx`, `gligen`, `photomaker`, `audio_encoders`, `configs`.

## What it scans

The canonical folders, plus `text-encoder`, `text_encoder`, `diffussion_models`, and `diffusion-models` when those directories exist.

A file is included when its extension is one of `.safetensors`, `.ckpt`, `.pt`, `.pth`, `.bin`, `.gguf`, `.sft`. The scan is recursive. Each entry records:

- `name`, relative to that folder
- `folder`, the folder it was found in, alias name included
- `bytes`

The manifest is `locgen-manifest.json` in the models root, UTF-8 JSON, with `app` set to `LocGENStudio`.

## What it starts

It looks for Python in this order:

1. `<studio>\pythonembedded\python.exe`
2. `<studio>\python_embeded\python.exe`
3. `.\pythonembedded\python.exe` relative to the current directory
4. `.\python_embeded\python.exe`

`<studio>` is the parent of `-Root`. For `C:\LocGENStudio\models` that is `C:\LocGENStudio`.

The engine entry is `<studio>\engine\main.py`.

If the engine file is missing, the script prints where it looked and returns. The models folder and the manifest are still written. If Python is missing, it prints the expected `python.exe` path and returns.

When both exist it runs:

```
& $python -s $engine --models $Root --listen 127.0.0.1 --port $Port
```

The window stays in the foreground on purpose. That window is the log. Weight loading, CUDA errors, and pipeline tracebacks appear there, and the studio repeats the exception text on the run.

## What it does not do

- It does not download Python or torch.
- It does not search the disk for a ComfyUI checkout.
- It does not write `extra_model_paths.yaml`. The engine reads `--models` directly.
- It does not open firewall ports.
- It does not copy weights.

## Using an existing models tree

Set the Windows tab root to that tree, download the starter, and run it with that `-Root`. The script adds any missing subfolders beside your files and writes the manifest there. Pointing this at a live models folder is safe for the files already present. It will create empty directories for folders you have never used.

Import that manifest. You do not need to move the weights into `C:\LocGENStudio\models` unless you want a single place for them.

## Port already in use

If something else is on 8188, start with `-Port 8190` and set the studio’s engine URL to `http://127.0.0.1:8190`. Check engine should then answer. A refused connection means the script exited before listen, which the PowerShell window explains.
