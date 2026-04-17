
'use client';
import React, { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className='flex h-screen w-full overflow-hidden bg-white'>

      <div className='h-screen shrink-0'>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} variant='collapsible' />
      </div>

      <div className='flex flex-col flex-1 h-screen overflow-hidden bg-gray-50'>
        <Topbar name="John Doe" onMenuClick={() => setSidebarOpen(true)} />

        <main className='flex-1 overflow-y-auto w-full'>
          <div className='px-3.5 pt-5 md:px-6 md:py-4'>
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}


