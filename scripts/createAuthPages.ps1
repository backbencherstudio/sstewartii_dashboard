# -------------------------------
# Auth Pages Generator with Next.js App Router
# -------------------------------

# 1️⃣ Set base paths
$componentsPath = "C:\Users\hrido\Desktop\pp\sstewartii_dashboard\app\(auth)\_components\"
$routesBasePath = "C:\Users\hrido\Desktop\pp\sstewartii_dashboard\app\(auth)\"

# -------------------------------
# 2️⃣ Define pages and components
# -------------------------------
$pages = @{
    "LoginForm.tsx" = "LoginForm"
    "RegisterForm.tsx" = "RegisterForm"
    "ForgotPasswordForm.tsx" = "ForgotPasswordForm"
    "SetPasswordForm.tsx" = "SetPasswordForm"
    "VerifyOTPForm.tsx" = "VerifyOTPForm"
}

# -------------------------------
# 3️⃣ Create components folder and files
# -------------------------------
if (-not (Test-Path $componentsPath)) {
    New-Item -ItemType Directory -Path $componentsPath -Force | Out-Null
    Write-Host "Created folder: $componentsPath"
}

foreach ($fileName in $pages.Keys) {
    $componentName = $pages[$fileName]
    $filePath = Join-Path $componentsPath $fileName

    $componentContent = @"
export default function $componentName() {
    return <div>$componentName Component</div>;
}
"@

    $componentContent | Set-Content -Path $filePath -Force
    Write-Host "Created/Updated $fileName"
}

# -------------------------------
# 4️⃣ Optional: Create components/_index.ts for barrel exports
# -------------------------------
$indexPath = Join-Path $componentsPath "index.ts"
$indexContent = ""
foreach ($fileName in $pages.Keys) {
    $componentName = $pages[$fileName]
    $indexContent += "export { default as $componentName } from './$componentName';`n"
}
$indexContent | Set-Content -Path $indexPath -Force
Write-Host "Created components/_index.ts"

# -------------------------------
# 5️⃣ Create route folders and page.tsx files
# -------------------------------
foreach ($fileName in $pages.Keys) {
    $routeName = $fileName.Replace("Form.tsx", "").ToLower()
    $componentName = $pages[$fileName]
    $routePath = Join-Path $routesBasePath $routeName

    # Create folder
    if (-not (Test-Path $routePath)) {
        New-Item -ItemType Directory -Path $routePath -Force | Out-Null
        Write-Host "Created folder: $routePath"
    }

    # Create page.tsx with **direct default import**
    $pageContent = @"
import $componentName from '../_components/$componentName';

export default function ${routeName}Page() {
    return <$componentName />;
}
"@

    $pagePath = Join-Path $routePath "page.tsx"
    $pageContent | Set-Content -Path $pagePath -Force
    Write-Host "Created $routeName/page.tsx"
}

# -------------------------------
# 6️⃣ Done
# -------------------------------
Write-Host "`n✅ All auth components and pages created with Form suffix and direct imports!"