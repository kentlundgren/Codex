param(
  [string]$RemoteName,
  [string]$RemoteUrl
)

$ErrorActionPreference = 'Stop'
# Här skedde en uppdatering 2026-09-28: PowerShell 5.1 läste git-utdata med
# konsolens OEM-kodning (ibm850). Filnamn med å/ä/ö blev då fel, git show
# kraschade och hela pushen avbröts. UTF-8 gör att sökvägen går att läsa.
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8
$blockedPath = '(?i)(^|/)(underlag_internt(/|$)|Plangruppen/Mail(/|$)|mejlforlag|.*(?:privat|private|sensitive|kanslig|känslig|utkast).*)\.(md|txt|pdf|doc|docx)$'
$blockedMail = '(?i)(^|/)Plangruppen/Mail(/|$)'
# Här skedde en uppdatering 2026-09-28: personliga inlägg och synpunkter från
# enskilda medlemmar spärras för alla filtyper, inte bara dokument.
$blockedPersonal = '(?i)(^|/)Underlag_synpunkter/|_inl(a|ä)gg\.[^/]+$'
$blockedContent = '(?im)^\s*(privat|private|konfidentiellt|confidential|inte för publicering|do not publish)\b'
$publicDocuments = @(
  'Fritid/NF/NCC_stenbryttning/index.html',
  'Fritid/NF/NCC_stenbryttning/samrad.md'
)
$publicSensitiveContent = '(?i)\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|\b(?:19|20)?\d{6}[-+]?\d{4}\b|(?<!\d)(?:\+46\s?|0)\d{1,3}[\s-]?\d{2,3}[\s-]?\d{2}[\s-]?\d{2}(?!\d)'
$updates = [Console]::In.ReadToEnd().Trim() -split "`r?`n" | Where-Object { $_ }
$blocked = [System.Collections.Generic.List[string]]::new()

& "$(git rev-parse --show-toplevel)/.githooks/check-public-documents.ps1"
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

foreach ($update in $updates) {
  $parts = $update -split '\s+'
  if ($parts.Count -lt 4) { continue }

  $localSha = $parts[1]
  $remoteSha = $parts[3]
  $zeroSha = '0{40}'
  $commitRange = if ($remoteSha -eq $zeroSha) {
    git rev-list $localSha "--not" "--remotes=$RemoteName"
  } else {
    git rev-list "$remoteSha..$localSha"
  }

  foreach ($commit in $commitRange) {
    # Endast filer som läggs till eller ändras blockeras. En radering av en
    # privat fil måste kunna pushas för att ta bort den från den publicerade grenen.
    # quotepath=false så att å/ä/ö i filnamn inte kommer som \303\245 och
    # får git show att krascha i PowerShell (ErrorActionPreference Stop).
    $files = git -c core.quotepath=false -c i18n.logOutputEncoding=utf-8 diff-tree --no-commit-id --diff-filter=AMRC --name-only -r $commit
    foreach ($file in $files) {
      $isDocument = $file -match '(?i)\.(md|txt|pdf|doc|docx)$'
      $isPublicDocument = $file -in $publicDocuments
      $content = $null
      if ($isDocument -or $isPublicDocument) {
        # Fortsätt även om git skriver till felströmmen, så en sökväg med å/ä/ö
        # inte avbryter skriptet innan spärren hunnit bedöma filen.
        $previousErrorAction = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        $content = git --no-pager -c core.quotepath=false show "${commit}:$file" 2>$null
        $showExit = $LASTEXITCODE
        $ErrorActionPreference = $previousErrorAction
        if ($showExit -ne 0) {
          Write-Host ''
          Write-Host "PUSH STOPPAD: kunde inte läsa '$file' i $commit." -ForegroundColor Red
          exit 1
        }
      }
      if ($file -match $blockedPath -or $file -match $blockedMail -or $file -match $blockedPersonal -or ($isDocument -and $content -match $blockedContent) -or ($isPublicDocument -and $content -match $publicSensitiveContent)) {
        $blocked.Add("$file ($commit)")
      }
    }
  }
}

if ($blocked.Count -gt 0) {
  Write-Host ''
  Write-Host 'PUSH STOPPAD: privat eller ej publicerbart material upptäcktes.' -ForegroundColor Red
  $blocked | Sort-Object -Unique | ForEach-Object { Write-Host "  - $_" -ForegroundColor Yellow }
  Write-Host 'Flytta materialet till privat/ eller ta bort det från Git innan du pushar.' -ForegroundColor Cyan
  exit 1
}
