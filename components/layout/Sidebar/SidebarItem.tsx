import React from 'react';

interface SidebarItemProps {
  label: string;
  onClick?: () => void;
  href?: string;
  
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, onClick }) => {
  if (href) {
    return (
      <a className='w-full text-left p-2 hover:bg-gray-200 rounded' href={href}>
        {label}
      </a>
    );
  }

  return (
    <button className='w-full text-left p-2 hover:bg-gray-200 rounded cursor-pointer' onClick={onClick}>
      {label}
    </button>
  );
};

export default SidebarItem;