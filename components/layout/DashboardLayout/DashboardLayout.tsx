import React from 'react'
import Sidebar from '../Sidebar2/Sidebar'


import { SidebarTrigger } from '@/components/ui/sidebar';
import { Topbar } from '../Topbar/Topbar';
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className='flex h-full w-full  '   >

      <Sidebar />
      <main className='flex-1 '>
      
        <Topbar />

        {children}


      </main>
    </div>
  );
}
