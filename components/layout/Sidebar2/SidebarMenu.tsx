'use client';
import { Home, Settings, Store, LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import useAuth from '@/hooks/useAuth';

const SidebarMenu = () => {
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Home',     href: '/dashboard', icon: <Home size={18} /> },
    { label: 'Vendors',  href: '/vendors',   icon: <Store size={18} /> },
    { label: 'Settings', href: '/settings',  icon: <Settings size={18} /> },
  ];

  return (
    <nav className="flex flex-col justify-between h-full py-4 ">
      {/* Top Items */}
      <div className="flex flex-col gap-1 px-3">
        {menuItems.map((item) => (
          <SidebarItem key={item.label} {...item} />
        ))}
      </div>

      {/* Bottom - Logout */}
      <div className="px-3 border-t pt-4">
        <SidebarItem label="Logout" onClick={logout} icon={<LogOut size={18} />} />
      </div>
    </nav>
  );
};

export default SidebarMenu;