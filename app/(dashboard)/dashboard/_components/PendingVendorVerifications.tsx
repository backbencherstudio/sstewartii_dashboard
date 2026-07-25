import React from 'react';
import EmptyState from '@/components/reusable/EmptyState';
import { useVendorVerifications } from '@/hooks/useVendor'
import Link from 'next/link';

function convertToVerifications(responses: any) {
  // If single object, convert to array
  const items = Array.isArray(responses) ? responses : [responses];

  return items.map((item: any) => ({
    id: item?.verificationId,
    code: item?.vendorCode || `#${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
    name: item?.vendorName?.trim() || 'Unknown Vendor',
    date: item?.submissionDateLabel ||
      (item?.submittedAt ? new Date(item?.submittedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      }) : 'N/A')
  }));
}



export default function PendingVendorVerifications() {


  const { data: vendorVerifications } = useVendorVerifications({ status: "PENDING", page: 1, limit: 10, sort: "newest" });


  console.log(vendorVerifications?.items);

  return (
    <div className='flex flex-col w-full rounded-2xl border border-[#ECEFF3] bg-white shadow-[0_0_16px_0_rgba(0,0,0,0.06)] overflow-hidden'>
      {/* Header Section */}
      <div className='flex items-center justify-between w-full p-6'>
        <h2 className="section-title">Pending Vendor Verificationsss</h2>
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
        convertToVerifications(vendorVerifications?.items).length > 0 ? (
          <div className='flex flex-col'>
            {convertToVerifications(vendorVerifications?.items).map((vendor: any, index: number) => (
              <div
                key={vendor.id}
                className={`grid grid-cols-3 items-center px-6 py-4 border-b border-[#ECEFF3] last:border-0 hover:bg-slate-50 transition-colors`}
              >
                {/* Name and ID */}
                <div className='flex flex-col'>
                  <span className='text-base font-semibold text-[#1e293b]'>{vendor?.name}</span>
                  <span className='text-sm text-[#94a3b8]'>ID: {vendor?.id}</span>
                </div>

                {/* Date */}
                <div className='text-[#475569] text-base'>
                  {vendor?.date}
                </div>

                {/* Action Button */}
                <div className='flex justify-end '>

                  <Link
                    href={`/vendors/verification/${vendor?.id}`}
                  >
                    <button className='px-4 py-2 rounded-xl font-medium text-[#070707] text-lg bg-gradient-to-b from-[#FFBB1C] to-[#F29D00] shadow-sm hover:opacity-90 transition-opacity'>
                      Review
                    </button>
                  </Link>
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