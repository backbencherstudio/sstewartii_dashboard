'use client';
import React from 'react';
import { Home, Store, Settings, LogOut, User } from 'lucide-react';
import SidebarItem from './SidebarItem';
import useAuth from '@/hooks/useAuth';
import SidebarIcons from '@/components/icons/SidebarIcons';
import { useLogoutModal } from '@/hooks/useLogoutModal';
import LogoutModal from '@/components/LogoutModal';

interface SidebarMenuProps {
  collapsed: boolean;
  onRequestExpand?: () => void;
  openModal: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed, onRequestExpand, openModal }) => {
    

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <SidebarIcons.DashboardIcon className="w-4 h-4" />,
    },
    {
      label: 'Vendors',
      icon: <SidebarIcons.VendorIcon className="w-4 h-4" />,
      isCollapsible: true,
      children: [
        { label: 'Manage Verification', href: '/vendors/verification' },
        { label: 'Manage Vendor Account', href: '/vendors/account' },
      ],
    },
    {
      label: 'Customers',
      href: '/customers',
      icon: <SidebarIcons.CustomersIcon className="w-4 h-4" />,
    },
    {
      label: 'Analytics',
      href: '/analytics',
      icon: <SidebarIcons.AnalyticsIcon className="" />,
    },
    {
      label: 'Subscription Management',
      href: '/subscriptions',
      icon: <SidebarIcons.SubscriptionsIcon className="w-4 h-4" />,
    },
    {
      label: 'Event Management',
      href: '/event',
      icon: <SidebarIcons.EventIcon className="w-4 h-4" />,
      isBeta: true,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <Settings size={16} />,
      isBottom: true,
    },
    
    {
      label: 'Log out',
      onClick: openModal,
      icon: <LogOut size={16} />,
      isBottom: true,
    },
  ];

  const topItems = menuItems.filter((item) => !item.isBottom);
  const bottomItems = menuItems.filter((item) => item.isBottom);

  return (

    <>
    <nav className={`flex flex-col  ${collapsed ? 'px-3' : 'px-6 pt-6'}  justify-between h-full`}>  
      <div className="flex flex-col gap-1">
        {topItems.map((item) => (
          <SidebarItem
            key={item.label}
            {...item}
            collapsed={collapsed}
            onRequestExpand={onRequestExpand}
          />
        ))}
      </div>
      <div className="border-t border-gray-200 pt-4 -mx-3">
        <div className="px-3 flex flex-col gap-1">
          {bottomItems.map((item) => (
            <SidebarItem
              key={item.label}
              {...item}
              collapsed={collapsed}
              onRequestExpand={onRequestExpand}
            />
          ))}
        </div>
      </div>
     
    </nav>

   
    </>
  );
};

export default SidebarMenu;
