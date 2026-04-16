// import React from 'react'
// import Sidebar from '../Sidebar2/Sidebar'

// import { Topbar } from '../Topbar/Topbar';
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {

//   return (
//     <div className='flex h-full w-full  '   >

//       <Sidebar />
//       <main className='flex-1 '>

//         <Topbar />

//         {children}


//       </main>
//     </div>
//   );
// }


'use client';
import React, { useState } from 'react';

import Sidebar from '../Sidebar/Sidebar';
import { Topbar } from '../Topbar/Topbar';



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
  

    <div className='flex h-full w-full bg-white'   >

      <div className='h-screen'>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} variant='collapsible' />
      </div>
      <main className='flex-1 overflow-auto  bg-gray-50 w-full'>

        <Topbar name="John Doe" onMenuClick={() => setSidebarOpen(true)} />

        {children}


      </main>
    </div>
  );
}


