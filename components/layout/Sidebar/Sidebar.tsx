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

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  const isCollapsible = variant === 'collapsible';

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
          fixed inset-y-0 left-0 z-50 bg-gray-100 flex flex-col
          border-r border-gray-200 h-full
          transform transition-all duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsible && collapsed ? 'w-16' : 'w-64'}
          md:relative md:translate-x-0 md:z-auto
        `}
      >
        <SidebarHeader
          collapsed={isCollapsible && collapsed}
          showCollapseButton={isCollapsible}
          onToggleCollapse={() => setCollapsed((prev) => !prev)}
        />

        <div className="flex-1 overflow-y-auto overflow-x-hidden h-full">
          <SidebarMenu
            collapsed={isCollapsible && collapsed}
            onRequestExpand={() => setCollapsed(false)}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;



