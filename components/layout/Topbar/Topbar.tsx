"use client";
import { Bell, ChevronRight, Link, Menu, User } from 'lucide-react';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';
import { getBreadcrumbLabels } from '@/lib/breadcrumb.utils';
import { cn } from '@/lib/utils';


type Props = {
  name?: string;
  onMenuClick?: () => void;
};

export const Topbar = ({ name, onMenuClick }: Props) => {

  const [showNotification, setShowNotification] = useState(false);
  const pathname = usePathname();
  console.log(pathname);
  const breadcrumbs = getBreadcrumbLabels(pathname);
  // console.log("breadcrumbs", breadcrumbs);
  const { user } = useAuth();




  const email = user?.email || "admin@example.com";
  const role = user?.type || "Admin";

  return (
    <header className="md:h-20 h-16 bg-white border-b border-[#EAECF0] flex items-center justify-between md:px-8 px-4  shrink-0">

      <div className="flex items-center gap-2">
        {breadcrumbs.map((breadcrumb, idx) => (
          <p key={idx} className={cn("flex items-center gap-2 text-[#697586]   font-lora text-sm font-bold leading-[130%]", idx > 0 && "text-[#2A3542]")}>

            {idx > 0 && <ChevronRight className="w-4 h-4" />} 
            {breadcrumb.label}
          </p>
        ))}
      </div>

      {/* menu icon */}
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* notification icon */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <button className="flex items-start gap-2 border border-white/10  p-2 rounded-full border-solid transition-colors hover:border-[#F6D642]/40 bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>

          {/* alert iocn*/}
          <div className="absolute top-2.5 right-2.5 flex w-2 h-2 justify-center items-center gap-2.5 shrink-0 bg-[#EB3D4D] px-0.5 py-px rounded-[14px]">
          </div>

        </div>


        {/* profile icon */}
        <div className="flex items-center gap-2">
          <button className="flex items-start gap-2 border border-white/10  p-2 rounded-full border-solid transition-colors bg-gray-100 hover:border-[#F6D642]/40">
            <User className="w-5 h-5" />
          </button>
          <div>
            <div>
              <p className="text-sm font-semibold leading-[150%]">{email}</p>
              <p className="text-white-solid text-xs font-normal leading-[150%] text-gray-500">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};