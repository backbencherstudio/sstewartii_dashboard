import React from 'react';

interface SidebarItemProps {
  label: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, onClick }) => {
  return (
    <button className='w-full text-left p-2 hover:bg-gray-200 rounded' onClick={onClick}>
      {label}
    </button>
  );
};

export default SidebarItem;
