'use client';
import React, { useMemo } from 'react';
import {
  Settings,
  LogOut,
  Users,
  User,
} from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarIcons from '@/components/icons/SidebarIcons';
import { useSidebarMenu } from '@/hooks/useSidebarMenu';
import { SidebarMenuItemData } from '@/types/auth.types';

interface SidebarMenuProps {
  collapsed: boolean;
  onRequestExpand?: () => void;
  openModal: () => void;
}

// Icon mapper helper supporting both custom SVG components and Lucide icons
const getMenuIcon = (iconName?: string | null, key?: string): React.ReactNode => {
  const normalized = (iconName || key || '').toLowerCase();

  switch (normalized) {
    case 'dashboardicon':
    case 'dashboard':
      return <SidebarIcons.DashboardIcon className="w-4 h-4" />;
    case 'vendoricon':
    case 'vendors':
    case 'vendor':
      return <SidebarIcons.VendorIcon className="w-4 h-4" />;
    case 'customersicon':
    case 'customers':
    case 'customer':
      return <SidebarIcons.CustomersIcon className="w-4 h-4" />;
    case 'analyticsicon':
    case 'analytics':
      return <SidebarIcons.AnalyticsIcon className="w-4 h-4" />;
    case 'users':
    case 'teams':
    case 'team':
      return <Users size={16} />;
    case 'subscriptionsicon':
    case 'subscriptions':
    case 'subscription':
      return <SidebarIcons.SubscriptionsIcon className="w-4 h-4" />;
    case 'eventicon':
    case 'event':
    case 'events':
      return <SidebarIcons.EventIcon className="w-4 h-4" />;
    case 'settings':
      return <Settings size={16} />;
    case 'logout':
      return <LogOut size={16} />;
    case 'profile':
      return <User size={16} />;
    default:
      return null;
  }
};

// Fallback menu in case API is loading or network fails
const DEFAULT_MENU_ITEMS: SidebarMenuItemData[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'DashboardIcon',
    children: [],
  },
  {
    key: 'vendors',
    label: 'Vendors',
    icon: 'VendorIcon',
    children: [
      { key: 'vendor-verification', label: 'Manage Verification', href: '/vendors/verification' },
      { key: 'vendor-account', label: 'Manage Vendor Account', href: '/vendors/account' },
    ],
  },
  {
    key: 'customers',
    label: 'Customers',
    href: '/customers',
    icon: 'CustomersIcon',
    children: [],
  },
  {
    key: 'analytics',
    label: 'Analytics',
    href: '/analytics',
    icon: 'AnalyticsIcon',
    children: [],
  },
  {
    key: 'teams',
    label: 'Teams',
    icon: 'Users',
    children: [
      { key: 'team-permission', label: 'Team Permission', href: '/team-permission' },
      { key: 'member-management', label: 'Member Management', href: '/members' },
    ],
  },
  {
    key: 'event',
    label: 'Event Management',
    href: '/event',
    icon: 'EventIcon',
    children: [],
  },
  {
    key: 'profile',
    label: 'Profile',
    isBottom: true,
    children: [],
  },
  {
    key: 'settings',
    label: 'Settings',
    href: '/settings',
    icon: 'Settings',
    isBottom: true,
    children: [],
  },
  {
    key: 'logout',
    label: 'Log out',
    icon: 'LogOut',
    action: 'logout',
    isBottom: true,
    children: [],
  },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed, onRequestExpand, openModal }) => {
  const { data: remoteMenu } = useSidebarMenu();

  const menuItems = useMemo(() => {
    let items: SidebarMenuItemData[] = [];
    if (Array.isArray(remoteMenu) && remoteMenu.length > 0) {
      items = [...remoteMenu];
    } else {
      items = [...DEFAULT_MENU_ITEMS];
    }

    // Ensure Settings is always present in the bottom menu if missing from backend response
    const hasSettings = items.some(
      (item) => item.key === 'settings' || item.href === '/settings' || item.label.toLowerCase() === 'settings'
    );
    if (!hasSettings) {
      // Insert Settings before logout or at bottom
      const logoutIndex = items.findIndex((item) => item.key === 'logout' || item.action === 'logout');
      const settingsItem: SidebarMenuItemData = {
        key: 'settings',
        label: 'Settings',
        href: '/settings',
        icon: 'Settings',
        isBottom: true,
        children: [],
      };
      if (logoutIndex !== -1) {
        items.splice(logoutIndex, 0, settingsItem);
      } else {
        items.push(settingsItem);
      }
    }

    return items;
  }, [remoteMenu]);

  // Transform backend menu items to SidebarItem props
  const formattedItems = useMemo(() => {
    return menuItems.map((item) => {
      const isLogout = item.key === 'logout' || item.action === 'logout';
      const isProfile = item.key === 'profile' || item.label === 'Profile';
      const hasChildren = Array.isArray(item.children) && item.children.length > 0;

      return {
        id: item.key || item.label,
        label: item.label,
        href: isLogout || isProfile ? undefined : item.href,
        onClick: isLogout ? openModal : undefined,
        icon: getMenuIcon(item.icon, item.key),
        isCollapsible: hasChildren,
        children: hasChildren
          ? item.children!.map((child) => ({
              label: child.label,
              href: child.href || '#',
            }))
          : undefined,
        isBottom: item.isBottom,
        isBeta: item.key === 'event',
      };
    });
  }, [menuItems, openModal]);

  const topItems = formattedItems.filter((item) => !item.isBottom);
  const bottomItems = formattedItems.filter((item) => item.isBottom);

  return (
    <nav className={`flex flex-col ${collapsed ? 'px-3' : 'px-6 pt-6'} justify-between h-full`}>
      <div className="flex flex-col gap-1">
        {topItems.map((item) => (
          <SidebarItem
            key={item.id}
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
              key={item.id}
              {...item}
              collapsed={collapsed}
              onRequestExpand={onRequestExpand}
            />
          ))}
        </div>
      </div>
    </nav>
  );
};

export default SidebarMenu;
