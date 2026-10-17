# Models folder

One root. Every weight the engine is allowed to open lives under it. The default root is `C:\LocGENStudio\models`.

The engine resolves a filename only inside the folder for that loader, plus a short alias list. A path with `..`, or an absolute path sent as a name, is rejected.

## Tree

```
models\
  checkpoints\          SD 1.5 and SDXL full checkpoints
  diffusion_models\     Flux, Flux 2, Krea 2, Qwen, Z-Image, Wan, LTX, MiniMax, SD3, Hunyuan
  unet\                 legacy twin of diffusion_models
  loras\
  vae\
  text_encoders\        CLIP, T5, UMT5, Qwen, Gemma
  clip\                 older text-encoder folder, still scanned
  clip_vision\
  embeddings\
  controlnet\
  upscale_models\
  hypernetworks\
  style_models\
  ipadapter\
  vae_approx\
  gligen\
  photomaker\
  audio_encoders\
  configs\
  locgen-manifest.json  written by the starter, not a weight
```

Extensions that count as weights: `.safetensors`, `.ckpt`, `.pt`, `.pth`, `.bin`, `.gguf`, `.sft`.

Files may sit in a subfolder. The name stored in the manifest is the path relative to that family folder, with forward slashes. `diffusion_models\flux\dev.safetensors` is the name `flux/dev.safetensors`.

## Aliases

These folder names are recognized if you already have them. They are mapped onto the canonical folder. The starter scans them and does not create them.

| On disk | Treated as |
|---|---|
| `text-encoder`, `text_encoder` | `text_encoders` |
| `diffussion_models`, `diffusion-models` | `diffusion_models` |

When the engine loads a diffusion file it also looks in `unet` if the file is not in `diffusion_models`. When it loads a text encoder it also looks in `clip`.

## What each loader reads

| Node | Folder |
|---|---|
| `CheckpointLoaderSimple` | `checkpoints` |
| `UNETLoader` | `diffusion_models`, then `unet` |
| `DualCLIPLoader`, `CLIPLoader` | `text_encoders`, then `clip` |
| `VAELoader` | `vae` |
| `LoraLoader` | `loras` |

The other folders exist so a scan of a Comfy-style tree does not drop files on the floor. See [NOTES.md](../NOTES.md) for which of them are not executed.

## Manifest

`locgen-manifest.json` is the index the studio can import without a folder permission.

```json
{
  "app": "LocGENStudio",
  "root": "C:\\LocGENStudio\\models",
  "generatedAt": "2026-10-17T12:00:00+05:30",
  "models": [
    { "name": "krea2_turbo_fp8.safetensors", "folder": "diffusion_models", "bytes": 8200000000 }
  ]
}
```

`folder` may be a canonical name or an alias. Unknown folders are skipped. Family is guessed from the filename when the manifest does not set one.

Importing sets the model root shown on the Windows tab when `root` is present. The engine does not read the manifest. The manifest is only for the studio. The engine reads the directories.

## Output

Images are written next to the models root, not inside it:

```
C:\LocGENStudio\output\<prefix>\
```

The save node’s prefix becomes the subfolder. `locgen/krea2` writes `output\locgen\krea2_00001.png` style names: the prefix’s parent is the subfolder, and a counter is appended to the last segment. Characters that would escape the output directory are dropped and the prefix becomes `locgen`.

You can point output somewhere else by starting the engine with `--output`. The starter does not. It uses the default, the parent of the models root plus `\output`.

## Adding a file the scan missed

Library, bottom of the list, type the filename, pick the folder, and optionally the family. Guess is usually right. Use this when the manifest is stale and you do not want to rescan yet. The engine still has to find that exact name on disk at run time. An invented name fails with “is not under diffusion_models/” (or whichever folder the loader uses).

## Presets

The Windows tab offers four roots as shortcuts:

- `C:\LocGENStudio\models`
- a portable Comfy tree
- `C:\ComfyUI\models`
- a Stability Matrix package models folder

Those shortcuts only fill the path used for the starter download. They do not move files. If you point the starter at an existing Comfy models folder, it creates any missing canonical subfolders there and writes the manifest beside the weights. Your existing files stay where they are.
