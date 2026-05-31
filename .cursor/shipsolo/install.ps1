function Install-ShipSoloSkills {
  param([string]$Skill = "all")
  $BaseUrl = if ($env:SHIPSOLO_SKILLS_BASE_URL) { $env:SHIPSOLO_SKILLS_BASE_URL.TrimEnd('/') } else { "https://shipsolo.io/shipsolo-skills" }
  $AppOrigin = if ($env:SHIPSOLO_APP_ORIGIN) { $env:SHIPSOLO_APP_ORIGIN.TrimEnd('/') } else { $BaseUrl -replace '/shipsolo-skills$','' }
  $Token = $env:SHIPSOLO_SKILLS_TOKEN
  if ([string]::IsNullOrWhiteSpace($Token)) { throw "Missing SHIPSOLO_SKILLS_TOKEN. 请先登录 shipsolo.io 领航计划账号，在 /app/skills 页面复制带令牌的安装命令。" }
  $HermesHome = if ($env:HERMES_HOME) { $env:HERMES_HOME } else { Join-Path $HOME ".hermes" }
  $InstallRoot = if ($env:SHIPSOLO_SKILLS_DIR) { $env:SHIPSOLO_SKILLS_DIR } else { Join-Path $HermesHome "skills\shipsolo" }
  $InstallRoot = [System.IO.Path]::GetFullPath($InstallRoot)
  $ProfileConfigMode = if ($env:SHIPSOLO_CONFIGURE_PROFILES) { $env:SHIPSOLO_CONFIGURE_PROFILES } else { "auto" }
  $Tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("shipsolo-skills-" + [System.Guid]::NewGuid().ToString("N"))
  New-Item -ItemType Directory -Force -Path $Tmp | Out-Null
  try {
    $IndexPath = Join-Path $Tmp "index.json"
    $Headers = @{ Authorization = "Bearer $Token" }
    Invoke-WebRequest -UseBasicParsing "$AppOrigin/api/download?file=shipsolo-skills/index.json" -Headers $Headers -OutFile $IndexPath
    $Index = Get-Content $IndexPath -Raw | ConvertFrom-Json
    $RemoteVersion = $Index.bundleVersion
    New-Item -ItemType Directory -Force -Path $InstallRoot | Out-Null
    if ($Skill -eq "all" -or [string]::IsNullOrWhiteSpace($Skill)) {
      $ArchiveUrl = "/shipsolo-skills/shipsolo-skills-latest.zip"
      $TargetDir = $InstallRoot
    } else {
      $Item = $Index.skills | Where-Object { $_.id -eq $Skill } | Select-Object -First 1
      if (-not $Item) { throw "Unknown ShipSolo skill: $Skill" }
      $ArchiveUrl = $Item.archiveUrl
      $TargetDir = Join-Path $InstallRoot $Skill
      New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null
    }
    $ArchiveName = Split-Path $ArchiveUrl -Leaf
    $ArchivePath = Join-Path $Tmp $ArchiveName
    $ShaPath = "$ArchivePath.sha256"
    $ArchiveFile = $ArchiveUrl -replace '^/',''
    Invoke-WebRequest -UseBasicParsing "$AppOrigin/api/download?file=$ArchiveFile" -Headers $Headers -OutFile $ArchivePath
    Invoke-WebRequest -UseBasicParsing "$AppOrigin/api/download?file=$ArchiveFile.sha256" -Headers $Headers -OutFile $ShaPath
    $Expected = (Get-Content $ShaPath -Raw).Split(' ', [System.StringSplitOptions]::RemoveEmptyEntries)[0]
    $Actual = (Get-FileHash -Algorithm SHA256 $ArchivePath).Hash.ToLower()
    if ($Expected.ToLower() -ne $Actual) { throw "SHA256 mismatch" }
    Expand-Archive -Force $ArchivePath -DestinationPath $TargetDir
    $Lock = @{ source = "ShipSolo 做站 Skills"; bundleVersion = $RemoteVersion; skill = $Skill; installedAt = (Get-Date).ToUniversalTime().ToString("o"); baseUrl = $BaseUrl } | ConvertTo-Json
    Set-Content -Encoding UTF8 (Join-Path $InstallRoot ".shipsolo-skills-lock.json") $Lock
    if ($ProfileConfigMode -notin @("0", "false", "off")) {
      $ProfilesDir = Join-Path $HermesHome "profiles"
      if (Test-Path $ProfilesDir) {
        $Changed = @()
        Get-ChildItem $ProfilesDir -Directory | ForEach-Object {
          $Cfg = Join-Path $_.FullName "config.yaml"
          if (-not (Test-Path $Cfg)) { return }
          $Text = Get-Content $Cfg -Raw
          if ($Text -like "*$InstallRoot*") { return }
          Copy-Item $Cfg "$Cfg.shipsolo-bak-$(Get-Date -Format yyyyMMddHHmmss)" -Force
          $Nl = [Environment]::NewLine
          $Lines = [System.Collections.Generic.List[string]]::new()
          ($Text -split "\r?\n") | ForEach-Object { [void]$Lines.Add($_) }
          $Start = -1; $End = $Lines.Count
          for ($i = 0; $i -lt $Lines.Count; $i++) { if ($Lines[$i] -eq "skills:") { $Start = $i; break } }
          if ($Start -lt 0) {
            if ($Lines.Count -gt 0 -and $Lines[$Lines.Count - 1].Trim().Length -gt 0) { [void]$Lines.Add("") }
            [void]$Lines.Add("skills:"); [void]$Lines.Add("  external_dirs:"); [void]$Lines.Add("    - $InstallRoot")
          } else {
            for ($j = $Start + 1; $j -lt $Lines.Count; $j++) { if ($Lines[$j] -and -not $Lines[$j].StartsWith(" ") -and -not $Lines[$j].StartsWith("#")) { $End = $j; break } }
            $Ext = -1
            for ($i = $Start + 1; $i -lt $End; $i++) { if ($Lines[$i] -eq "  external_dirs:") { $Ext = $i; break } }
            if ($Ext -lt 0) {
              $Lines.Insert($Start + 1, "  external_dirs:"); $Lines.Insert($Start + 2, "    - $InstallRoot")
            } else {
              $Insert = $Ext + 1
              while ($Insert -lt $End -and ($Lines[$Insert].StartsWith("    ") -or $Lines[$Insert].StartsWith("  - "))) { $Insert++ }
              $Lines.Insert($Insert, "    - $InstallRoot")
            }
          }
          $Text = [string]::Join($Nl, $Lines) + $Nl
          Set-Content -Encoding UTF8 $Cfg $Text
          $Changed += $_.Name
        }
        if ($Changed.Count -gt 0) { Write-Host ("Configured ShipSolo shared skills for profiles: " + ($Changed -join ", ")) }
      }
    }
    Write-Host "ShipSolo Skills installed/updated: $RemoteVersion"
    Write-Host "Location: $InstallRoot"
    Write-Host "Profiles: shared through skills.external_dirs when profiles exist"
  } finally {
    Remove-Item -Recurse -Force $Tmp -ErrorAction SilentlyContinue
  }
}
Install-ShipSoloSkills -Skill $(if ($env:SHIPSOLO_SKILL) { $env:SHIPSOLO_SKILL } else { "all" })
