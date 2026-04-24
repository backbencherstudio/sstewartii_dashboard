import React from 'react';
import { Search } from 'lucide-react'; // Assuming you use lucide for icons

interface TableToolBarProps {
  title?: string;
  searchPlaceholder?: string;
  onSearchChange?: (val: string) => void;
  children?: React.ReactNode;
}

export default function TableToolBar({
  title,
  searchPlaceholder,
  onSearchChange,
  children
}: TableToolBarProps) {
  return (
    <div className="border-x border-t rounded-t-2xl bg-white p-6">
      <div className="flex flex-wrap justify-between items-center gap-4 w-full">

        {/* Left Side: Either Title OR Search Input */}
        <div className="flex-1 min-w-[200px]">
          {title ? (
            <h2 className="text-xl font-bold text-[#1A1A2E]">{title}</h2>
          ) : searchPlaceholder && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="flex justify-center items-start self-stretch [background:var(--background-normal-25,#F6F8FA)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] pl-12 pr-4 pt-[13px] pb-3.5 rounded-lg w-full max-w-[320px] placeholder:text-[#697586] focus:outline-none focus:ring-0 focus:border-none focus:shadow-[0_0_0_2px_rgba(244,171,35,0.80)]"
              />

              {/* flex justify-center items-start self-stretch [background:var(--background-normal-25,#F6F8FA)] shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] pl-12 pr-4 pt-[13px] pb-3.5 rounded-lg */}
            </div>
          )}
        </div>

        {/* Right Side: Filters/Actions */}
        {children && (
          <div className="flex flex-wrap items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}