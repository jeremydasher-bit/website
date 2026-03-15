# Deploy Immiguard build to live bundle (immiguard/).
# Run this from repo root AFTER building: cd lawyer-up-main; npm run build
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$build = Join-Path $root "lawyer-up-main\build"
$immiguard = Join-Path $root "immiguard"

if (-not (Test-Path (Join-Path $build "static\js\main.*.js"))) {
    Write-Host "ERROR: No build found. Run: cd lawyer-up-main; npm run build" -ForegroundColor Red
    exit 1
}

Copy-Item (Join-Path $build "index.html") (Join-Path $immiguard "index.html") -Force
Copy-Item (Join-Path $build "asset-manifest.json") (Join-Path $immiguard "asset-manifest.json") -Force
$staticSrc = Join-Path $build "static"
$staticDst = Join-Path $immiguard "static"
if (-not (Test-Path $staticDst)) { New-Item -ItemType Directory -Path $staticDst -Force }
Copy-Item (Join-Path $staticSrc "*") $staticDst -Recurse -Force

Write-Host "Copied lawyer-up-main/build to immiguard/. Next: git add immiguard/; git commit -m 'Deploy Immiguard updates'; git push origin main" -ForegroundColor Green
