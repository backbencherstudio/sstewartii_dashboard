# -------------------------------
# Dashboard Page Generator
# Usage:
# npm run generate:page -- rider customer settings
# -------------------------------

param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$pageNames
)

# npm/powershell can sometimes pass all names as one string.
# Normalize into a clean array supporting space/comma separated input.
$pageNames = @(
    $pageNames |
    ForEach-Object { $_ -split '[,\s]+' } |
    ForEach-Object { $_.Trim() } |
    Where-Object { -not [string]::IsNullOrWhiteSpace($_) }
)

if (-not $pageNames) {
    Write-Host "❌ Please provide at least one page name"
    Write-Host "Example: npm run generate:page -- rider customer"
    exit
}

# -------------------------------
# Base Path (CHANGE if needed)
# -------------------------------
$basePath = Join-Path $PSScriptRoot "..\app\(dashboard)"

# -------------------------------
# Loop through all pages
# -------------------------------
foreach ($pageName in $pageNames) {

    $pageFolder = $pageName.ToLower()

    $pagePath = Join-Path $basePath $pageFolder
    $componentsPath = Join-Path $pagePath "_components"

    Write-Host "`n🚀 Generating: $pageFolder"

    # -------------------------------
    # Create main folder
    # -------------------------------
    if (-not (Test-Path $pagePath)) {
        New-Item -ItemType Directory -Path $pagePath -Force | Out-Null
        Write-Host "📁 Created folder: $pageFolder"
    } else {
        Write-Host "⚠️ Folder already exists: $pageFolder"
    }

    # -------------------------------
# Create _components folder (SAFE)
# -------------------------------
if (-not (Test-Path $componentsPath)) {
    New-Item -ItemType Directory -Path $componentsPath -Force | Out-Null
    Write-Host "📁 Created folder: $pageFolder/_components"
} else {
    Write-Host "⚠️ _components already exists"
}


    # -------------------------------
    # Create page.tsx
    # -------------------------------
    $pageFilePath = Join-Path $pagePath "page.tsx"

    $pageContent = @"
export default function ${pageFolder}Page() {
  return <h2>this is $pageFolder page</h2>;
}
"@

    $pageContent | Set-Content -Path $pageFilePath -Force
    Write-Host "📄 Created page.tsx"
# -------------------------------
# Create index.ts (SAFE)
# -------------------------------
$indexPath = Join-Path $componentsPath "index.ts"

# Ensure parent folder exists (double safety)
$parentDir = Split-Path $indexPath
if (-not (Test-Path $parentDir)) {
    New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
}

"" | Set-Content -Path $indexPath -Force
Write-Host "📄 Created _components/index.ts"
}

# -------------------------------
# Final message
# -------------------------------
Write-Host "`n🎉 All pages generated successfully!"