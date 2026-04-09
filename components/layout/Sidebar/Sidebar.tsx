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
