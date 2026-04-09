'use client';

import React from 'react';
import SidebarItem from './SidebarItem';
import useAuth from '@/hooks/useAuth';

interface SidebarItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  isLast?: boolean;
}

const SidebarMenu: React.FC = () => {
  const { logout } = useAuth();

  const menuItems: SidebarItemProps[] = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Vendors', href: '/vendors' },
    { label: 'Settings', href: '/settings' },
    { 
      label: 'Logout', 
      onClick: logout,
      isLast: true 
    },
  ];

  const topItems = menuItems.filter((item) => !item.isLast);
  const lastItem = menuItems.find((item) => item.isLast);

  return (
    <nav className="flex flex-col  w-64 border-r border-gray-500  justify-between h-[calc(100vh-56px)]">
      {/* Top Section */}
      <div className="flex flex-col gap-2 grow">
        {topItems.map((item) => (
          <SidebarItem 
            key={item.label} 
            label={item.label} 
            href={item.href} 
            onClick={item.onClick} 
          />
        ))}
      </div>

      {/* Bottom Section (Logout) */}
      {lastItem && (
        <div className="border-t border-gray-100 pt-4">
          <SidebarItem 
            label={lastItem.label} 
            href={lastItem.href} 
            onClick={lastItem.onClick} 
          />
        </div>
      )}
    </nav>
  );
};

export default SidebarMenu;