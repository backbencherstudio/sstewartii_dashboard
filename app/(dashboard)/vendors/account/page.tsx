'use client'

import PageTitle from '@/components/reusable/PageTitle'
import React from 'react'
import ManageVendorAcountStats from './_components/ManageVendorAcountStats'
import VendorAccountTable from './_components/VendorAccountTable'
import { useVendorAccounts } from '@/hooks/useVendorAccount'
import { SimpleJsonBox } from '@/lib/SimpleJsonBox'

export default function page() {

  const { data: vendorAccounts } = useVendorAccounts();
  console.log(JSON.stringify(vendorAccounts, null, 2));

  const stats = vendorAccounts?.data.stats;
  return (
    <div className='space-y-6'>
      <SimpleJsonBox data={vendorAccounts} />
      <PageTitle title="Manage Vendor Accounts" description="Monitor and maintain vendor profiles, status, and performance insights across the marketplace." />

      <ManageVendorAcountStats data={stats} />
      <VendorAccountTable vendorListData={vendorAccounts?.data || undefined} />

    </div>
  )

}
