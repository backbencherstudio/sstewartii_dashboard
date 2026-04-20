import PageTitle from '@/components/reusable/PageTitle'
import ManageVendorStats from './_components/ManageVendorStats'
import React from 'react'
import VerificationTable from './_components/VerificationTable'
import EmptyState from '@/components/reusable/EmptyState'

export default   function page() {
  return (
    <div className='space-y-6'>
      <PageTitle title="Vendors VerificationManagement" description="Review and validate business credentials for pending vendor applications." />

      <ManageVendorStats />
      <VerificationTable />

    </div>
  )
}


 