'use client';
import React, { useEffect, useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenu from './SidebarMenu';

type SidebarVariant = 'basic' | 'collapsible';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant?: SidebarVariant;
}

const Sidebar: React.FC<SidebarProps> = ({
  open,
  onClose,
  variant = 'basic',
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const isCollapsible = variant === 'collapsible';
  // On mobile the sidebar is always fully expanded
  const effectiveCollapsed = isCollapsible && collapsed && !isMobile;

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col bg-[#F9F9FB]
          border-r border-gray-200 h-full
          transform transition-all duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          ${effectiveCollapsed ? 'w-16' : 'w-70'}
          md:relative md:translate-x-0 md:z-auto
        `}
      >
        <SidebarHeader
          collapsed={effectiveCollapsed}
          showCollapseButton={isCollapsible}
          isMobile={isMobile}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
          onClose={onClose}
        />

        <hr className={`${effectiveCollapsed ? 'mx-3' : 'mx-6'} border-gray-200`} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden h-full">
          <SidebarMenu
            collapsed={effectiveCollapsed}
            onRequestExpand={() => setCollapsed(false)}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;



