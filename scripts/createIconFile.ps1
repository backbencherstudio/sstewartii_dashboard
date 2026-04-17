param(
    [Parameter(Position = 0)]
    [string]$fileName,

    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$iconNames
)

# Normalize icon names (handle space/comma separated from npm)
$iconNames = @(
    $iconNames |
    ForEach-Object { $_ -split '[,\s]+' } |
    ForEach-Object { $_.Trim() } |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)

# Validation: file name required
if ([string]::IsNullOrWhiteSpace($fileName)) {
    Write-Host "Please provide a file name as the first argument"
    Write-Host "Example: npm run generate:icons -- StatsCardIcon icon1 icon2"
    exit 1
}

# ✅ NEW: fallback icon if none provided
if (-not $iconNames -or $iconNames.Count -eq 0) {
    Write-Host "No icons provided. Using default: DefaultIcon"
    $iconNames = @("DefaultIcon")
}

# Paths
$iconsDir   = Join-Path $PSScriptRoot "..\components\icons"
$outputFile = Join-Path $iconsDir ($fileName + ".tsx")

if (-not (Test-Path $iconsDir)) {
    New-Item -ItemType Directory -Path $iconsDir -Force | Out-Null
    Write-Host ("Created folder: components/icons")
}

if (Test-Path $outputFile) {
    Write-Host ("File already exists and will be overwritten: components/icons/" + $fileName + ".tsx")
}

$nl = "`n"

# Interface
$content  = "interface " + $fileName + "Props {" + $nl
$content += "    className?: string;" + $nl
$content += "}" + $nl + $nl

# Object start
$content += "const " + $fileName + " = {" + $nl

# Icons
$lastIndex = $iconNames.Count - 1
for ($i = 0; $i -lt $iconNames.Count; $i++) {
    $iconName = $iconNames[$i]

    $content += $nl
    $content += '    ' + $iconName + ': ({ className = "" }: ' + $fileName + 'Props) => {' + $nl
    $content += '        return (' + $nl
    $content += '            <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' + $nl
    $content += '            </svg>' + $nl
    $content += '        )' + $nl
    $content += '    }'

    if ($i -lt $lastIndex) {
        $content += ","
    }

    $content += $nl
}

# Close object
$content += $nl + "}" + $nl + $nl

# Export
$content += "export default " + $fileName + ";" + $nl

# Write file
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText($outputFile, $content, $utf8NoBom)

Write-Host ("Created: components/icons/" + $fileName + ".tsx")
Write-Host "Icons generated:"
foreach ($iconName in $iconNames) {
    Write-Host ("  - " + $iconName)
}
Write-Host "Open the file and paste your SVG paths inside each icon's <svg> block."