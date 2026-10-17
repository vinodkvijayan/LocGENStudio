# LocGENStudio — models root and local inference engine
# Windows 11. Right-click, Run with PowerShell, or:
#   powershell -ExecutionPolicy Bypass -File .\Start-LocGENStudio.ps1 -Root 'C:\LocGENStudio\models'
param(
  [string]$Root = 'C:\LocGENStudio\models',
  [int]$Port = 8188
)

$ErrorActionPreference = 'Stop'
$folders = @(
  'checkpoints',
  'diffusion_models',
  'unet',
  'loras',
  'vae',
  'clip',
  'text_encoders',
  'clip_vision',
  'embeddings',
  'controlnet',
  'upscale_models',
  'hypernetworks',
  'style_models',
  'ipadapter',
  'vae_approx',
  'gligen',
  'photomaker',
  'audio_encoders',
  'configs'
)

foreach ($name in $folders) {
  New-Item -ItemType Directory -Force -Path (Join-Path $Root $name) | Out-Null
}

$ext = @('.safetensors','.ckpt','.pt','.pth','.bin','.gguf','.sft')
$scanFolders = $folders + @('text-encoder','text_encoder','diffussion_models','diffusion-models')
$models = New-Object System.Collections.Generic.List[object]
foreach ($name in $scanFolders) {
  $dir = Join-Path $Root $name
  if (-not (Test-Path $dir)) { continue }
  Get-ChildItem -Path $dir -File -Recurse -ErrorAction SilentlyContinue | Where-Object {
    $ext -contains $_.Extension.ToLower()
  } | ForEach-Object {
    $rel = $_.FullName.Substring($dir.Length).TrimStart('\','/')
    $rel = ($rel -replace '\\','/')
    $entryName = if ([string]::IsNullOrWhiteSpace($rel)) { $_.Name } else { $rel }
    $models.Add([ordered]@{
      name = $entryName
      folder = $name
      bytes = [int64]$_.Length
    })
  }
}

$manifest = [ordered]@{
  app = 'LocGENStudio'
  root = $Root
  generatedAt = (Get-Date).ToString('o')
  models = $models
}
$out = Join-Path $Root 'locgen-manifest.json'
$manifest | ConvertTo-Json -Depth 6 | Set-Content -Path $out -Encoding utf8

$studio = Split-Path $Root -Parent
$engine = Join-Path $studio 'engine\main.py'
$pythonCandidates = @(
  (Join-Path $studio 'pythonembedded\python.exe'),
  (Join-Path $studio 'python_embeded\python.exe'),
  (Join-Path (Get-Location) 'pythonembedded\python.exe'),
  (Join-Path (Get-Location) 'python_embeded\python.exe')
)
$python = $pythonCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

Write-Host ""
Write-Host "Model root: $Root"
Write-Host "Manifest:   $out"
Write-Host "Weights:    $($models.Count)"

if (-not (Test-Path $engine)) {
  Write-Host ""
  Write-Host "Models folder is ready. Import locgen-manifest.json in LocGENStudio."
  Write-Host "The inference engine was not found at $engine"
  Write-Host "Place engine\ next to pythonembedded\, then run this script again."
  return
}

if (-not $python) {
  Write-Host ""
  Write-Host "Models folder is ready, but pythonembedded\python.exe was not found beside the studio."
  Write-Host "Expected: $studio\pythonembedded\python.exe"
  return
}

Write-Host "Python:     $python"
Write-Host "Engine:     $engine"
Write-Host "Listening:  http://127.0.0.1:$Port"
Write-Host "Weights stay in the models root. The engine samples them on this PC."
& $python -s $engine --models $Root --listen 127.0.0.1 --port $Port
