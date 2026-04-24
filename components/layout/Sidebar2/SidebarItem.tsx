import Link from 'next/link';

interface SidebarItemProps {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ label, href, onClick, icon }) => {
  if (href) {
    return (
      <Link
        href={href}
        className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
      >
        {icon && <span>{icon}</span>}
        {label}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default SidebarItem;