import React from 'react';
import EmptyState from '@/components/reusable/EmptyState';

const verifications = [
  { id: '#834759', name: 'David John', date: 'May 10, 2026' },
  { id: '#834754', name: 'Marvin McKinney', date: 'May 10, 2026' },
  { id: '#834454', name: 'Esther Howard', date: 'May 10, 2026' },
  { id: '#832454', name: 'Darlene Robertson', date: 'May 10, 2026' },
  { id: '#332454', name: 'Kathryn Murphy', date: 'May 10, 2026' },
];

export default function PendingVendorVerifications() {
  return (
    <div className='flex flex-col w-full rounded-2xl border border-[#ECEFF3] bg-white shadow-[0_0_16px_0_rgba(0,0,0,0.06)] overflow-hidden'>
      {/* Header Section */}
      <div className='flex items-center justify-between w-full p-6'>
        <h2 className="section-title">Pending Vendor Verifications</h2>
        <button className='text-sm font-semibold text-[#FFBB1C] hover:underline'>View All</button>
      </div>

      {/* Table Header */}
      <div className='grid grid-cols-3 bg-[#F8F9FB] px-6 py-3 border-y border-[#ECEFF3]'>
        <span className='text-sm font-medium text-[#64748b]'>Vendor Name</span>
        <span className='text-sm font-medium text-[#64748b]'>Submission Date</span>
        <span className='text-sm font-medium text-[#64748b] text-right pr-8'>Action</span>
      </div>

      {/* Table Body */}
     {
        verifications.length > 0 ? (
            <div className='flex flex-col'>
            {verifications.map((vendor, index) => (
              <div 
                key={vendor.id} 
                className={`grid grid-cols-3 items-center px-6 py-4 border-b border-[#ECEFF3] last:border-0 hover:bg-slate-50 transition-colors`}
              >
                {/* Name and ID */}
                <div className='flex flex-col'>
                  <span className='text-base font-semibold text-[#1e293b]'>{vendor.name}</span>
                  <span className='text-sm text-[#94a3b8]'>ID: {vendor.id}</span>
                </div>
    
                {/* Date */}
                <div className='text-[#475569] text-base'>
                  {vendor.date}
                </div>
    
                {/* Action Button */}
                <div className='flex justify-end '>
                  <button className='px-4 py-2 rounded-xl font-bold text-[#1a1a2e] text-lg bg-gradient-to-b from-[#FFBB1C] to-[#F29D00] shadow-sm hover:opacity-90 transition-opacity'>
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
            <EmptyState imageSrc="/images/empty-data/pending-vendor.png" title="No reports to show" description="Vendor reports will appear in here." />
        )
     }
    </div>
  );
}