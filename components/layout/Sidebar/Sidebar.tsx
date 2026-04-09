import React from 'react';
import SidebarMenu from './SidebarMenu';

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-100 h-screen'>
      <h2 className='text-xl font-bold h-14 border'>Dashboard</h2>
      <SidebarMenu />


    </aside>
  );
};

export default Sidebar;
