import React from 'react';
import SidebarItem from './SidebarItem';

const menuItems = ['Home', 'Profile', 'Settings', 'Logout'];

const SidebarMenu: React.FC = () => {
  return (
    <nav className='flex flex-col gap-2'>
      {menuItems.map((item) => (
        <SidebarItem key={item} label={item} />
      ))}
    </nav>
  );
};

export default SidebarMenu;
