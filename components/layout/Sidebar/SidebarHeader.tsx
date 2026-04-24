import { ChevronLeft, X } from 'lucide-react';
import Image from 'next/image';

interface SidebarHeaderProps {
  collapsed: boolean;
  showCollapseButton: boolean;
  isMobile?: boolean;
  onToggleCollapse: () => void;
  onClose?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  collapsed,
  showCollapseButton,
  isMobile,
  onToggleCollapse,
  onClose,
}) => {
  return (
    <div className={`pt-10 pb-6 flex items-center justify-between ${collapsed ? 'px-3' : 'px-6'} shrink-0`}>
      {!collapsed && (
        <Image src="/images/sidebar-logo.png" alt="logo" width={135} height={35} />
      )}

      {/* Mobile: X close button */}
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors ml-auto bg-gray-100"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      )}

      {/* Desktop: collapse toggle button */}
      {!isMobile && showCollapseButton && (
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-gray-200 transition-colors ml-auto bg-gray-100"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft
            size={18}
            className={`transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}
          />
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;
