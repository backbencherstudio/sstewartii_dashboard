'use client';
import React from 'react';
import { Home, Store, Settings, LogOut, User } from 'lucide-react';
import SidebarItem from './SidebarItem';
import useAuth from '@/hooks/useAuth';

interface SidebarMenuProps {
    collapsed: boolean;
    onRequestExpand?: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed, onRequestExpand }) => {
    const { logout } = useAuth();

    const menuItems = [
        {
            label: 'Home',
            href: '/dashboard',
            icon: <Home size={18} />,
        },
        {
            label: 'Vendors',
            icon: <Store size={18} />,
            isCollapsible: true,
            children: [
                { label: 'All Vendors', href: '/vendors' },
                { label: 'Add Vendor', href: '/vendors/add' },
                { label: 'Pending', href: '/vendors/pending' },
            ],
        },
        {
            label: 'Settings',
            href: '/settings',
            icon: <Settings size={18} />,
        },
        {
            label: 'Profile',
            href: '/profile',
            icon: <User size={18} />,
            isBottom: true,
        },
       
        {
            label: 'Logout',
            onClick: logout,
            icon: <LogOut size={18} />,
            isBottom: true,
        },
    ];

    const topItems = menuItems.filter((item) => !item.isBottom);
    const bottomItems = menuItems.filter((item) => item.isBottom);

    return (
        <nav className="flex flex-col px-3 py-4 justify-between h-full">
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
            <div className={`border-t border-gray-200 pt-4 -mx-3`}>
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
    );
};

export default SidebarMenu;