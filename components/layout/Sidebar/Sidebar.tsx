'use client';
import React, { useEffect } from 'react';
import SidebarMenu from './SidebarMenu';


interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => {
    // Close on Escape key
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <>
            {/* Backdrop — mobile only */}
            {open && <div className='fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity ' onClick={onClose} />}

            {/* Sidebar panel */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-100 flex flex-col
          border-r border-gray-200
          transform transition-transform duration-500 ease-in-out h-full
          ${open ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:z-auto
        `}
            >
                <SidebarHeader />

                {/* Menu grows to fill space */}
                <div className="flex-1 overflow-y-auto h-full">
                    <SidebarMenu />
                </div>

                {/* <SidebarFooter /> */}
            </aside>
        </>
    );
};

export default Sidebar;






const SidebarHeader: React.FC = () => {
    return (
        <div className="h-16 flex items-center px-4 border-b border-gray-200">
            <span className="text-xl font-bold text-gray-800">Dashboard</span>
        </div>
    );
};





import { LogOut } from 'lucide-react';
import SidebarItem from './SidebarItem';
import useAuth from '@/hooks/useAuth';

const SidebarFooter: React.FC = () => {
    const { logout } = useAuth();

    return (
        <div className="px-3 py-4 border-t border-gray-200">
            <SidebarItem
                label="Logout"
                onClick={logout}
                icon={<LogOut size={18} />}
            />
        </div>
    );
};

