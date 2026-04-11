'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

interface ChildItem {
    label: string;
    href: string;
}

interface SidebarItemProps {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    isBottom?: boolean;
    isCollapsible?: boolean;
    children?: ChildItem[];
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    label,
    href,
    onClick,
    icon,
    isCollapsible,
    children,
}) => {
    const pathname = usePathname();
    const isActive = href ? pathname === href : false;

    // Auto open if any child is active
    const isChildActive = children?.some((child) => pathname === child.href);
    const [open, setOpen] = useState(isChildActive ?? false);

    const baseClass = `
    flex items-center gap-3 w-full text-left px-3 py-2 rounded-md text-sm
    transition-colors duration-150 cursor-pointer
    ${isActive || isChildActive
            ? 'bg-gray-900 text-white font-medium'
            : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
        }
  `;

    // Collapsible parent
    if (isCollapsible && children) {
        return (
            <div>
                {/* Parent button */}
                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className={baseClass}
                >
                    {icon && <span className="shrink-0">{icon}</span>}
                    <span className="flex-1">{label}</span>
                    <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Children */}
                <div
                    className={`
            overflow-hidden transition-all duration-200 ease-in-out
            ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
                >
                   

                    <div className="ml-6 flex flex-col relative">
                        {/* The main vertical line - stops early to avoid overhang */}
                        <div className="absolute left-0 top-0 bottom-6 w-px bg-gray-600 h-[calc(100%-2rem)]" />

                        {children.map((child) => {
                            const isActive = pathname === child.href;

                            return (
                              <ChildItem key={child.label} label={child.label} href={child.href} isActive={isActive} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    // Normal link
    if (href) {
        return (
            <Link href={href} className={baseClass}>
                {icon && <span className="shrink-0">{icon}</span>}
                <span>{label}</span>
            </Link>
        );
    }

    // Normal button
    return (
        <button onClick={onClick} className={baseClass}>
            {icon && <span className="shrink-0">{icon}</span>}
            <span>{label}</span>
        </button>
    );
};

export default SidebarItem;


// Child Item Component
interface ChildItemProps {
    label: string;
    href: string;
    isActive: boolean;
}
const ChildItem: React.FC<ChildItemProps> = ({ label, href, isActive }) => {
    return (
        <Link
            key={label}
            href={href}
            className={`
relative flex items-center py-2 pl-6 text-sm transition-colors duration-150
${isActive ? 'text-gray-800 font-semibold' : 'text-gray-600  hover:text-gray-800'}

/* The horizontal curved connector */

before:absolute before:left-0 before:top-1/3 
before:-translate-y-1/2 before:w-5 before:h-4 
before:border-l before:border-b before:border-gray-600 
before:rounded-bl-md
`}
        >
            {label}
        </Link>
    );
};