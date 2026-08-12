param(
  [string[]]$Paths = @()
)

$ErrorActionPreference = 'Stop'
$publicDocuments = @(
  'Fritid/Naturskyddsforeningen/NCC_stenbryttning/index.html',
  'Fritid/Naturskyddsforeningen/NCC_stenbryttning/samrad.md'
)
$patterns = @(
  @{ Label = 'e-postadress'; Pattern = '(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b' },
  @{ Label = 'svenskt personnummer'; Pattern = '\b(?:19|20)?\d{6}[-+]?\d{4}\b' },
  @{ Label = 'telefonnummer'; Pattern = '(?<!\d)(?:\+46\s?|0)\d{1,3}[\s-]?\d{2,3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)' },
  @{ Label = 'markering för privat material'; Pattern = '(?im)^\s*(privat|private|konfidentiellt|confidential|inte för publicering|do not publish)\b' }
)

if ($Paths.Count -eq 0) { $Paths = $publicDocuments }
$findings = [System.Collections.Generic.List[string]]::new()

foreach ($path in $Paths) {
  if ($path -notin $publicDocuments -or -not (Test-Path -LiteralPath $path)) { continue }
  $content = Get-Content -LiteralPath $path -Raw -Encoding UTF8
  foreach ($item in $patterns) {
    if ($content -match $item.Pattern) { $findings.Add("${path}: $($item.Label)") }
  }
}

if ($findings.Count -gt 0) {
  Write-Host ''
  Write-Host 'PUBLICERINGSKONTROLL STOPPAD: möjlig känslig uppgift hittades.' -ForegroundColor Red
  $findings | Sort-Object -Unique | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
  Write-Host 'Granska och ta bort uppgiften, eller kontrollera att träffen är felaktig, innan commit eller push.' -ForegroundColor Cyan
  exit 1
}

Write-Host 'Publiceringskontroll godkänd: inga e-postadresser, telefonnummer, personnummer eller privata markeringar hittades.' -ForegroundColor Green
