import { ChevronLeft } from 'lucide-react';

interface SidebarHeaderProps {
  collapsed: boolean;
  showCollapseButton: boolean;
  onToggleCollapse: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  showCollapseButton,
  onToggleCollapse,
}) => {
  return (
    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
      {!collapsed && (
        <span className="text-xl font-bold text-gray-800 truncate">
          Dashboard
        </span>
      )}

      {showCollapseButton && (
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors ml-auto"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            size={18}
            className={`transition-transform duration-300 hidden md:block ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;
