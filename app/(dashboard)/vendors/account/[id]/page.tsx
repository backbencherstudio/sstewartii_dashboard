'use client'

import React, { useState } from 'react'
import { StatusBadge } from '../_components/VendorAccountTable'
import { ChevronDown, UserMinus, UserX } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ReusableTabs } from '@/components/reusable/CustomTabs'
import OverviewTab from './_components/overview'
import OrdersTable from './_components/orders/OrdersTable'
import DocumentInfoTable from './_components/documents/DocumentInfoTable'
import SubscriptionTable from './_components/subscription/SubscriptionTable'
import SuspendModal from '@/components/SuspendModal'
// import DisableModal from '@/components/DisableModal'
import CustomModal from '@/components/reusable/CustomModal'
import { useVendorOverview } from '@/hooks/useVendorAccount'
import { useParams } from 'next/navigation'
import { SimpleJsonBox } from '@/lib/SimpleJsonBox'
import { formatDate } from '@/lib/utils'
import { VendorOverviewData } from '@/types/vendorAccount.types'

export default function Page() {

    const { id } = useParams();
    // console.log(id);

    const { data: vendorOverview, isLoading, isError } = useVendorOverview(id as string, "month");
    const {vendor,} = vendorOverview?.data || {};
    console.log(JSON.stringify(vendorOverview, null, 2));

    const [modalAction, setModalAction] = useState<'suspend' | 'disable' | null>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')

    const isSuspendModalOpen = modalAction === 'suspend'
    const isDisableModalOpen = modalAction === 'disable'

    const handleDropdownOpen = (open: boolean) => {
        setIsDropdownOpen(open)
    }

    const handleSuspendModalClose = () => {
        setModalAction(null)
    }


    const handleDisableModalClose = () => {
        setModalAction(null)
    }

    const vendorTabs = [
        { value: "overview", label: "Overview" },
        { value: "orders", label: "Orders" },
        { value: "documents", label: "Documents" },
        { value: "subscription", label: "Subscription" },
    ]

    if(isLoading) return <div>Loading...</div>
    // if(isError) return <div>Error: {isError.message}</div>

    return (
        <div className='space-y-6 container mx-auto'>

            {/* <SimpleJsonBox data={vendorOverview} /> */}
            <section className='flex items-center justify-between'>
                <div>
                    <div className='flex items-center justify-between gap-2'>
                        <h3 className='text-[#1A1C1E] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px] capitalize'>{vendor?.businessName}</h3>
                        <StatusBadge status={vendor?.kycStatus as "APPROVED" | "IN_REVIEW" | "REJECTED" | "SUSPENDED" | "PENDING" | "UNVERIFIED"} />
                    </div>

                    <p className='text-[#2A3542] text-base font-normal leading-6'>Joined on {formatDate(vendor?.joinedAt || '')} • ID: {vendor?.vendorCode}</p>
                </div>

                <div>
                    <DropdownMenu open={isDropdownOpen} onOpenChange={handleDropdownOpen}>
                        <DropdownMenuTrigger asChild>
                            <button className='btn-primary'>
                                <span>Manage Vendor</span>
                                <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end' className="w-64 rounded-xl bg-[#F8FAFC] border-none shadow-lg p-0">
                            <DropdownMenuLabel className="self-stretch text-[#697586] text-[10px] font-extrabold leading-[15px] tracking-[1px] uppercase p-5 bg-[#ECEFF3]">
                                Administrative Actions
                            </DropdownMenuLabel>

                            <DropdownMenuItem onClick={() => setModalAction('disable')} className="cursor-pointer gap-3 px-5 py-4 text-slate-700 hover:bg-slate-100 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                    <UserMinus className="w-4 h-4 text-slate-600" />
                                </div>
                                <span className="text-[#2A3542] text-base font-medium leading-[160%]">Disable Vendor</span>
                            </DropdownMenuItem>

                            <hr className="my-0" />

                            <DropdownMenuItem onClick={() => setModalAction('suspend')} className="cursor-pointer gap-3 px-5 py-4 text-red-600 hover:bg-red-50 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                    <UserX className="w-4 h-4 text-red-600" />
                                </div>
                                <span className="text-[#2A3542] text-base font-medium leading-[160%]">Suspend Vendor</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </section>

            {/* tab content */}
            <ReusableTabs tabs={vendorTabs} defaultValue="overview" onValueChange={setActiveTab} />

            {activeTab === 'overview' && <OverviewTab vendorOverview={vendorOverview?.data as VendorOverviewData} />}
            {activeTab === 'orders' && <OrdersTable />}
            {activeTab === 'documents' && <DocumentInfoTable />}
            {activeTab === 'subscription' && <SubscriptionTable />}

            {/* action modals */}
            {isSuspendModalOpen && (
                <CustomModal size='mmd' open={isSuspendModalOpen} onOpenChange={handleSuspendModalClose}>
                    <SuspendModal
                        mode="suspend"
                        onCancel={handleSuspendModalClose}
                        onConfirm={() => {
                            console.log("Suspend vendor");
                            handleSuspendModalClose();
                        }}
                    />
                </CustomModal>
            )}

            {isDisableModalOpen && (
                <CustomModal open={isDisableModalOpen} onOpenChange={handleDisableModalClose}>
                    <SuspendModal
                        mode="disable"
                        onCancel={handleSuspendModalClose}
                        onConfirm={() => {
                            console.log("Suspend vendor");
                            handleSuspendModalClose();
                        }}
                    />
                </CustomModal>
            )}
        </div>
    )
}