import PageTitle from '@/components/reusable/PageTitle'
import React from 'react'
import ManageVendorAcountStats from './_components/ManageVendorAcountStats'
import VendorAccountTable from './_components/VendorAccountTable'

export default function page() {
  return (
    <div className='space-y-6'>
    <PageTitle title="Manage Vendor Accounts" description="Monitor and maintain vendor profiles, status, and performance insights across the marketplace." />

    <ManageVendorAcountStats />
    <VendorAccountTable />

  </div>
)
  
}
