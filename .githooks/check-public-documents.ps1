param(
  [string[]]$Paths = @()
)

$ErrorActionPreference = 'Stop'
$publicDocuments = @(
  'Fritid/NF/NCC_stenbryttning/index.html',
  'Fritid/NF/NCC_stenbryttning/samrad.md'
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

# Här skedde en uppdatering 2026-11-02: kopior utan namn av yttranden (filnamn med "utan_namn" direkt i
# Fritid/NF/Maxima/Yttrande/Utkast/) kontrolleras också som Word-, Markdown- och PDF-filer: namn i den
# privata namnlistan (~/.claude/nf_privata_namn.txt), författare och företag i dokumentegenskaperna,
# mallänkar till en dators mapp samt e-post, telefon och personnummer. Samma skript som i skillen
# samradsguiden och i Claude Code-hooken. Saknas Python eller skriptet varnas det, men det stoppar inte.
$repoRoot = (git rev-parse --show-toplevel).Trim()
$namnlosa = @(Get-ChildItem -LiteralPath "$repoRoot/Fritid/NF/Maxima/Yttrande/Utkast" -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Name -like '*utan_namn*' -and $_.Extension -in '.docx', '.md', '.pdf' })
$namnkontroll = "$repoRoot/Fritid/NF/Samradsguiden/Skills/samradsguiden/scripts/kontrollera_namnlos.py"
if ($namnlosa.Count -gt 0) {
  if ((Get-Command python -ErrorAction SilentlyContinue) -and (Test-Path -LiteralPath $namnkontroll)) {
    & python -X utf8 $namnkontroll @($namnlosa | ForEach-Object { $_.FullName })
    if ($LASTEXITCODE -eq 1) {
      Write-Host 'Kopiorna utan namn innehåller namn eller spår av avsändaren. Rätta dem, till exempel med skapa_namnlos_kopia.py, innan commit eller push.' -ForegroundColor Cyan
      exit 1
    }
  } else {
    Write-Host 'VARNING: kopiorna utan namn kunde inte kontrolleras (Python eller kontrollera_namnlos.py saknas).' -ForegroundColor Yellow
  }
}

Write-Host 'Publiceringskontroll godkänd: inga e-postadresser, telefonnummer, personnummer eller privata markeringar hittades.' -ForegroundColor Green
