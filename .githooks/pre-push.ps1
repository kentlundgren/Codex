param(
  [string]$RemoteName,
  [string]$RemoteUrl
)

$ErrorActionPreference = 'Stop'
$blockedPath = '(?i)(^|/)(mejlforlag|.*(?:privat|private|sensitive|kanslig|känslig|utkast).*)\.(md|txt|pdf|doc|docx)$'
$blockedContent = '(?im)^\s*(privat|private|konfidentiellt|confidential|inte för publicering|do not publish)\b'
$updates = [Console]::In.ReadToEnd().Trim() -split "`r?`n" | Where-Object { $_ }
$blocked = [System.Collections.Generic.List[string]]::new()

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
    $files = git diff-tree --no-commit-id --diff-filter=AMRC --name-only -r $commit
    foreach ($file in $files) {
      $content = git show "${commit}:$file" 2>$null
      $isDocument = $file -match '(?i)\.(md|txt|pdf|doc|docx)$'
      if ($file -match $blockedPath -or ($isDocument -and $content -match $blockedContent)) {
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
