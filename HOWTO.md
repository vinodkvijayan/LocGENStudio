# How to run LocGENStudio

This is the path from an empty Windows 11 machine to an image written by your GPU. Stay in this order. Skipping the starter is the usual reason Run cannot reach the engine.

## 1. Make the folder

Create `C:\LocGENStudio`. You can use another disk. If you do, set that path as the model root on the Windows tab before you download the starter. The starter’s `-Root` is the models folder, not the studio folder. The studio folder is the parent.

```
C:\LocGENStudio\          studio folder
C:\LocGENStudio\models\   model root, the -Root argument
```

## 2. Install the embedded Python

LocGENStudio does not download Python for you. Put a Windows embeddable runtime here:

```
C:\LocGENStudio\pythonembedded\python.exe
```

`python_embeded` (one d) is also accepted.

Install the libraries into that runtime, not into a system Python:

```
pythonembedded\python.exe -m pip install -r engine\requirements.txt
```

`engine\requirements.txt` lists torch, diffusers, transformers, safetensors, accelerate, and pillow. Install a CUDA build of torch that matches your driver. A CPU-only torch will sample on the CPU.

For Krea 2, Qwen Image 2.1, Z-Image, Wan 2.2, LTX 2.5, MiniMax H3, and Flux 2 Klein, use a current diffusers. The 0.41 line is the one that covers Qwen Image 2.1 and the single-file loaders for Krea 2 and MiniMax H3.

## 3. Unzip the engine

On the Windows tab, download the engine. Unzip it so the tree looks like this:

```
C:\LocGENStudio\engine\main.py
C:\LocGENStudio\engine\locgen\
C:\LocGENStudio\engine\requirements.txt
```

Do not nest a second `engine` folder inside `engine`. The starter looks for `engine\main.py` next to `pythonembedded`.

## 4. Run the starter

On the Windows tab, download `Start-LocGENStudio.ps1`. Right-click, Run with PowerShell, or:

```
powershell -ExecutionPolicy Bypass -File .\Start-LocGENStudio.ps1 -Root 'C:\LocGENStudio\models'
```

The script:

- creates the models subfolders
- scans weights, including a few alias folder names if you already made them
- writes `models\locgen-manifest.json`
- starts `pythonembedded\python.exe -s engine\main.py --models <root> --listen 127.0.0.1 --port 8188`

Leave that window open. Closing it stops sampling.

The engine prints the model root, the output folder, and the listen address. `Check engine` on the Windows tab should then name the GPU.

## 5. Put weights in the right folders

| You have | Put it in |
|---|---|
| Flux, Krea 2, Qwen, Z-Image, Klein, Wan, LTX, MiniMax diffusion file | `models\diffusion_models` |
| SDXL or SD 1.5 single checkpoint | `models\checkpoints` |
| LoRA | `models\loras` |
| VAE | `models\vae` |
| CLIP, T5, UMT5, Qwen, Gemma | `models\text_encoders` |

`text-encoder` and the misspelling `diffussion_models` are read if those folders already exist. The starter does not create the misspelled names. Prefer the canonical folders.

Run the starter again after adding files if you want a fresh manifest. Restarting also reloads the engine.

## 6. Point the studio at the files

Two ways:

- **Import manifest.** Windows tab, Import manifest, choose `C:\LocGENStudio\models\locgen-manifest.json`. This works in any browser.
- **Link folder.** Windows tab, Link folder on this PC. This needs Edge or Chrome, because it uses the File System Access API. The browser remembers the permission for later visits.

The library should list your filenames, sizes, and a family guess. If every card still says the sample library, you have not imported or linked yet. Run will refuse those sample names.

## 7. Build or open a graph

**Graphs** has a template for each family. Choosing one adds any missing sample cards so the graph is wired, then you swap in your real files on each node.

A still-image graph is:

```
text encoder  ->  prompt  ->  sampler  ->  save
diffusion     ----------------^
vae           ----------------^
```

Flux is the exception. It wants two text encoders, CLIP-L and T5-XXL, both wired into the positive prompt.

Select a node. The inspector on the right (or Edit on a phone) is where the file, steps, CFG, size, batch, and frames live.

The status line under the title should say **Graph ready** and name the diffusion file. If it names a missing encoder or VAE, the graph will not queue.

## 8. Press Run

Run checks three things before it sends the graph:

1. The graph compiles.
2. Every chosen file is a real library entry, not a sample card.
3. `http://127.0.0.1:8188/system_stats` answers.

Then it posts the prompt and polls until the image is ready, or for about five minutes. The status moves through loading weights, waiting, and sampling. Failures show the engine’s message, not a generic one.

The image lands in Runs and in `C:\LocGENStudio\output`, under the save prefix (`locgen\flux`, `locgen\krea2`, and so on).

## 9. Swap a template onto your files

1. Open the template.
2. Select the diffusion node. Choose your file from the list.
3. Select the text encoder node. Choose the matching encoder.
4. Select the VAE node. Choose the matching VAE.
5. Edit the prompt.
6. Run.

Family is guessed from the filename. `krea2`, `qwen_image_2.1`, `z_image`, `wan2.2`, `ltx-2.5`, `minimax_h3`, `flux-2` or `klein`, and `flux` are recognized. If a name is unusual, set the family when you add the file by hand in the library.

## A known-good first still

Use a Flux file you already trust, or Krea 2 turbo if that is what you have.

Krea 2 turbo, if the weights are the usual Comfy-style set:

- diffusion: `krea2_turbo` in `diffusion_models`
- text encoder: `qwen3vl_4b` in `text_encoders`
- VAE: `qwen_image_vae.safetensors` in `vae`
- 8 steps, CFG 1, 1024×1024, euler / simple

Qwen Image 2.1:

- diffusion: `qwen_image_2.1` in `diffusion_models`
- text encoder: `qwen3vl_8b` in `text_encoders`
- VAE: `qwen_image_2.1_vae` in `vae`
- 20 steps, CFG 1, 1328×1328 is a square that suits it

SDXL:

- one file in `checkpoints`
- no separate text encoder
- 28 steps, CFG around 6, 1024×1024

## Video

Wan 2.2, LTX 2.5, and MiniMax H3 use the Frames field. The template starts at 49 frames. Runs shows the first frame. The file is still a PNG in `output\`. These models are large. Read the VRAM notes before queuing a long clip.

## Where the pieces are in the studio

| Tab | Use it for |
|---|---|
| Canvas | The graph, Run, and the node inspector |
| Library | Search, add a file by name, drag a weight onto the canvas |
| Runs | Status, the returned image, the prompt JSON |
| Windows | Model root, engine URL, manifest, starter, engine zip |
| Docs | These guides |
