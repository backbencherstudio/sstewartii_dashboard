'use client'

import PageTitle from '@/components/reusable/PageTitle'
import React, { useState } from 'react'
import ReportedCustomerTable from './_components/ReportedCustomerTable'
import ReportDetails from './_components/ReportDetails'

export default function page() {

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelectionChange = (id: string | null) => {
    setSelectedId(id);
  };

  return (
    <div className='space-y-6 md:space-y-8'>
      <PageTitle title="Reported Customer Queue" description="Maintain platform integrity by reviewing vendor reports. " />



      <div className='w-full flex flex-col md:flex-row gap-6'>

        <div className='flex-1'>

          <ReportedCustomerTable selectedId={selectedId} onSelectionChange={handleSelectionChange} />
        </div>


        <div className='flex-1'>
          <ReportDetails selectedId={selectedId} />
        </div>

      </div>
    </div>
  )
}
ReportedCustomerTable