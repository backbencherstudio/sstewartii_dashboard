"use client"
import React, { useState } from 'react'
import ReportsAccordion from './ReportsAccordion';
import CustomModal from '@/components/reusable/CustomModal';
import SuspendModal from '@/components/SuspendModal';
import { useGetCustomerReportById } from '@/hooks/useCustomers';

export default function ReportDetails({ selectedId }: { selectedId: string | null }) {

    const { data: customerReportDetails, isLoading, error } = useGetCustomerReportById(selectedId as string);

    // Extract the customer data payload safely
    const customer = customerReportDetails?.data;


    console.log("customer report details", customerReportDetails);

    const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);

    const handleSuspendModalOpen = () => {
        setIsSuspendModalOpen(true);
    }

    const handleSuspendModalClose = () => {
        setIsSuspendModalOpen(false);
    }

    return (
        <>
            <div className='w-full flex flex-col items-center gap-4 flex-[1_0_0] self-stretch border border-[#ECEFF3] [background:var(--Background-White,#FFF)] shadow-[0_0_16px_0_rgba(0,0,0,0.06)] p-6 rounded-2xl border-solid'>

                {/* info */}
                <div className='w-full '>
                    <h3 className='flex-[1_0_0] text-[#2A3542] font-lora text-lg font-bold leading-[130%] pb-2'>Customer Reports Details</h3>
                </div>

                <div className='w-full flex justify-between items-center'>
                    <div className='flex items-center gap-3 '>
                        <div>
                            <img 
                                src={customer?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29"} 
                                alt={customer?.fullName || "customer report"} 
                                width={100} 
                                height={100} 
                                className='w-[60px] h-[60px] rounded-full object-cover' 
                            />
                        </div>
                        <div>
                            <p className='text-[#2A3542] [font-family:Lora] text-lg font-bold leading-[130%]'>
                                {isLoading ? "Loading..." : (customer?.fullName || "N/A")}
                            </p>
                            <p className='text-[#697586] text-base font-normal leading-[130%] mt-1'>
                                ID: {customer?.customerCode || (selectedId ? `#${selectedId.slice(0, 5).toUpperCase()}` : "#99283")}
                            </p>
                        </div>
                    </div>

                    <button className='px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors' onClick={handleSuspendModalOpen}>
                        Suspend Customer
                    </button>
                </div>

                <div className='w-full space-y-2'>
                    {/* First Stat Row */}
                    <div className='w-full'>
                        <div className='flex items-center justify-between gap-6 bg-[#F6F8FA] px-4 py-3 rounded-lg'>
                            <StatCard label="Completed Orders" value={customer?.completedOrders ?? 0} />
                            <StatCard label="Cancelled Orders" value={customer?.cancelledOrders ?? 0} />
                            <StatCard label="Incomplete Orders" value={customer?.incompleteOrders ?? 0} isLast />
                        </div>
                    </div>
                    {/* Second Stat Row */}
                    <div className='w-full'>
                        <div className='flex items-center justify-between gap-6 bg-[#F6F8FA] px-4 py-3 rounded-lg'>
                            <StatCard label="Total Reports" value={customer?.reportCount ?? 0} />
                            <StatCard label="Associated Vendors" value={customer?.vendorCount ?? 0} />
                            <StatCard 
                                label="Last Ordered" 
                                value={customer?.lastOrderedAt ? new Date(customer.lastOrderedAt).toLocaleDateString() : "N/A"} 
                                isLast 
                            />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-sm text-[#697586]'>Report Details for {customer?.customerCode || selectedId}</h1>
                    </div>
                </div>

                <ReportsAccordion
                    customerReports={customerReportDetails}
                    customerId={selectedId ?? ""}
                />
            </div>

            <CustomModal open={isSuspendModalOpen} onOpenChange={handleSuspendModalClose}>
                <SuspendModal 
                    mode="suspend" 
                    onCancel={handleSuspendModalClose}
                    onConfirm={() => {
                        console.log("Suspend customer:", customer?.customerId);
                        handleSuspendModalClose();
                    }} 
                />
            </CustomModal>
        </>
    )
}

// Reusable card for a single stat
function StatCard({ label, value, isLast = false }: { label: string; value: string | number, isLast?: boolean }) {
    return (
        <div className={`flex-1 ${isLast ? '' : 'pr-6 border-r border-gray-300'}`}>
            <p className="min-h-5 self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">{label}</p>
            <p className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-base font-bold leading-[130%]">{value}</p>
        </div>
    );
}