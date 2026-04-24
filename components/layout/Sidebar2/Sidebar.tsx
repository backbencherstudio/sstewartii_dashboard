'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import SidebarMenu from './SidebarMenu';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const SidebarContent = (
    <aside className="w-64 bg-gray-100 h-full flex flex-col">
      <h2 className="text-xl font-bold h-[60px] flex items-center px-4 border-b ">
        Dashboard
      </h2>
 

      <div className=' min-h-[calc(100vh-60px)]'>
      <SidebarMenu />
      </div>
     
    </aside>
  );

  return (
    <>
      {/* Desktop — always visible */}
      <div className="hidden md:block h-screen">
        {SidebarContent}
      </div>

      {/* Mobile — Sheet trigger */}
      <span className="md:hidden bg-blue-400 h-13">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 m-2 rounded-md hover:bg-gray-200">
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 data-[side=left]:w-64">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </span>
    </>
  );
};

export default Sidebar;