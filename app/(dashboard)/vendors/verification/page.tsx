import PageTitle from '@/components/reusable/PageTitle'
import ManageVendorStats from './_components/ManageVendorStats'
import React from 'react'

export default   function page() {
  return (
    <div className='space-y-6'>
      <PageTitle title="Vendors Verification" description="Manage your vendors verification status." />

      <ManageVendorStats />
    </div>
  )
}


