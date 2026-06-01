"use client";
import PageTitle from '@/components/reusable/PageTitle'
import ManageVendorStats from './_components/ManageVendorStats'
import React from 'react'
import VerificationTable from './_components/VerificationTable'
import EmptyState from '@/components/reusable/EmptyState'
import { useVendorVerifications } from '@/hooks/useVendor'


export default   function page() {

  const { data: vendorVerifications } = useVendorVerifications({
    status: "PENDING",
    page: 1,
    limit: 10,
    sort: "newest",
  });



  console.log(vendorVerifications, "vendorVerifications");

  return (
    <div className='space-y-6'>
      <PageTitle title="Vendors Verification Management" description="Review and validate business credentials for pending vendor applications." />

      <ManageVendorStats stats={vendorVerifications?.stats} />
      <VerificationTable data={vendorVerifications} />

    </div>
  )
}


 