# Pack LocGENStudio into one Windows exe.
# The exe contains the studio, the engine, and pythonembedded (Python, PyTorch, diffusers).
# Model weights are not packed. Put them in models\ next to the exe, or in C:\LocGENStudio\models.
#
# Run from the unpacked repo, or from a folder that contains this script, the stub, and the studio build:
#   powershell -ExecutionPolicy Bypass -File .\Build-LocGENStudioExe.ps1
param(
  [string]$Python = "",
  [string]$Out = ""
)

$ErrorActionPreference = "Stop"
$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$stub = Join-Path $here "LocGENStudio-stub.exe"
if (-not (Test-Path $stub)) { throw "Missing $stub" }
$studio = Join-Path $here "studio"
if (-not (Test-Path (Join-Path $studio "index.html"))) { throw "Missing $studio\index.html" }

function Find-Python {
  param([string]$Hint)
  if ($Hint -and (Test-Path (Join-Path $Hint "python.exe"))) { return $Hint }
  foreach ($candidate in @(
    (Join-Path $here "pythonembedded"),
    "C:\LocGENStudio\pythonembedded",
    "C:\LocGENStudio\python_embeded"
  )) {
    if (Test-Path (Join-Path $candidate "python.exe")) { return $candidate }
  }
  return $null
}

$pythonHome = Find-Python $Python
if (-not $pythonHome) {
  $pythonHome = Join-Path $here "pythonembedded"
  Write-Host "Downloading embeddable Python into $pythonHome"
  New-Item -ItemType Directory -Force -Path $pythonHome | Out-Null
  $zip = Join-Path $env:TEMP "python-3.12.10-embed-amd64.zip"
  Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.12.10/python-3.12.10-embed-amd64.zip" -OutFile $zip
  Expand-Archive -Path $zip -DestinationPath $pythonHome -Force
  $pth = Get-ChildItem -Path $pythonHome -Filter "python*._pth" | Select-Object -First 1
  if (-not $pth) { throw "Embeddable Python did not include a ._pth file." }
  $lines = Get-Content $pth.FullName | Where-Object { $_ -notmatch '^\s*#\s*import site' }
  if ($lines -notcontains "import site") { $lines += "import site" }
  if ($lines -notcontains "Lib\site-packages") { $lines += "Lib\site-packages" }
  Set-Content -Path $pth.FullName -Value $lines -Encoding ascii
  $getPip = Join-Path $env:TEMP "get-pip.py"
  Invoke-WebRequest -Uri "https://bootstrap.pypa.io/get-pip.py" -OutFile $getPip
  & (Join-Path $pythonHome "python.exe") $getPip
  Write-Host "Installing PyTorch cu128, diffusers, transformers, safetensors, accelerate, pillow"
  & (Join-Path $pythonHome "python.exe") -m pip install --upgrade pip
  & (Join-Path $pythonHome "python.exe") -m pip install torch --index-url https://download.pytorch.org/whl/cu128
  & (Join-Path $pythonHome "python.exe") -m pip install diffusers transformers safetensors accelerate pillow
}

$version = "0.10.0"
$stage = Join-Path $env:TEMP ("locgen-pack-" + [guid]::NewGuid().ToString("n"))
New-Item -ItemType Directory -Force -Path $stage | Out-Null
Copy-Item -Recurse (Join-Path $here "..\engine") (Join-Path $stage "engine")
Copy-Item -Recurse $studio (Join-Path $stage "studio")
Copy-Item -Recurse $pythonHome (Join-Path $stage "pythonembedded")
Get-ChildItem -Path $stage -Recurse -Directory -Filter "__pycache__" | Remove-Item -Recurse -Force
Set-Content -Path (Join-Path $stage "VERSION") -Value $version -Encoding ascii

if (-not $Out) { $Out = Join-Path $here "LocGENStudio.exe" }
$zipPath = Join-Path $env:TEMP "locgen-payload.zip"
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($stage, $zipPath)
$stubBytes = [System.IO.File]::ReadAllBytes($stub)
$zipBytes = [System.IO.File]::ReadAllBytes($zipPath)
$size = [BitConverter]::GetBytes([uint64]$zipBytes.LongLength)
if (-not [BitConverter]::IsLittleEndian) { [array]::Reverse($size) }
$magic = [System.Text.Encoding]::ASCII.GetBytes("LOCGEN01")
$all = New-Object byte[] ($stubBytes.Length + $zipBytes.Length + 8 + 8)
[array]::Copy($stubBytes, 0, $all, 0, $stubBytes.Length)
[array]::Copy($zipBytes, 0, $all, $stubBytes.Length, $zipBytes.Length)
[array]::Copy($size, 0, $all, $stubBytes.Length + $zipBytes.Length, 8)
[array]::Copy($magic, 0, $all, $stubBytes.Length + $zipBytes.Length + 8, 8)
[System.IO.File]::WriteAllBytes($Out, $all)
Remove-Item -Recurse -Force $stage
Remove-Item -Force $zipPath
Write-Host "Wrote $Out ($($all.Length) bytes)"
Write-Host "Models are not inside the exe. Use models\ beside it, or C:\LocGENStudio\models."
