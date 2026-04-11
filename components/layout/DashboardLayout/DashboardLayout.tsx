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
import { Topbar } from '../Topbar/Topbar';
import Sidebar from '../Sidebar';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // <div className="flex flex-col h-screen bg-white">
     
    //   {/* Below topbar */}
    //   <div className="flex flex-1 overflow-hidden">
    //     <Sidebar
    //       open={sidebarOpen}
    //       onClose={() => setSidebarOpen(false)}
    //     />
    //     <main className="flex-1 overflow-auto p-6 bg-gray-50 w-full ">
    //        {/* Topbar — full width */}
    //   <Topbar onMenuClick={() => setSidebarOpen(true)} />

    //       {children}
    //     </main>
    //   </div>
    // </div>

    <div className='flex h-full w-full  '   >

            <div className='h-screen'>
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            </div>
            <main className='flex-1 '>
          
            <Topbar onMenuClick={() => setSidebarOpen(true)} />
    
            {children}
    
    
              </main>
        </div>
  );
}