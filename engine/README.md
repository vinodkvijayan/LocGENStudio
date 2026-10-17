# LocGENStudio engine

Local graph runner. It reads one models root and serves the prompt API the studio calls. Full guides: `README.md`, `HOWTO.md`, and `NOTES.md` beside the studio, and the Docs tab.

```
C:\LocGENStudio\
  pythonembedded\python.exe
  engine\main.py
  models\
  output\
```

`python_embeded` is accepted. Libraries: torch, diffusers, transformers, safetensors, accelerate, pillow (`requirements.txt`). Newer families want diffusers about 0.41.

```
pythonembedded\python.exe -s engine\main.py --models C:\LocGENStudio\models --listen 127.0.0.1 --port 8188
```

The starter does that after it creates the folder tree. The studio sends filenames. Weights stay on this PC.
