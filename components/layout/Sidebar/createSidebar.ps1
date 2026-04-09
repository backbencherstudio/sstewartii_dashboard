# Navigate to Sidebar folder (optional if script is in folder)
$folderPath = "$PSScriptRoot"
if (-not (Test-Path $folderPath)) { New-Item -ItemType Directory -Path $folderPath }

# Define files and content
$files = @{
    "Sidebar.tsx" = @"
import React from 'react';
import SidebarMenu from './SidebarMenu';

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-100 h-full p-4'>
      <h2 className='text-xl font-bold mb-4'>Dashboard</h2>
      <SidebarMenu />
    </aside>
  );
};

export default Sidebar;
"@

    "SidebarItem.tsx" = @"
import React from 'react';

interface SidebarItemProps {
  label: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick }) => {
  return (
    <button className='w-full text-left p-2 hover:bg-gray-200 rounded' onClick={onClick}>
      {label}
    </button>
  );
};

export default SidebarItem;
"@

    "SidebarMenu.tsx" = @"
import React from 'react';
import SidebarItem from './SidebarItem';

const menuItems = ['Home', 'Profile', 'Settings', 'Logout'];

const SidebarMenu: React.FC = () => {
  return (
    <nav className='flex flex-col gap-2'>
      {menuItems.map((item) => (
        <SidebarItem key={item} label={item} />
      ))}
    </nav>
  );
};

export default SidebarMenu;
"@

    "index.ts" = @"
export { default } from './Sidebar';
export { default as SidebarItem } from './SidebarItem';
export { default as SidebarMenu } from './SidebarMenu';
"@
}

# Create/overwrite files
foreach ($file in $files.Keys) {
    $path = Join-Path $folderPath $file
    $files[$file] | Set-Content -Path $path -Force
    Write-Host "Created/Updated $file"
}