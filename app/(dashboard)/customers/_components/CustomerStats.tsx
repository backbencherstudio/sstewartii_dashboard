import DashboardStatsIcons from '@/components/icons/DashboardStatsIcons';
import StatsCard from '@/components/reusable/StatsCard';
import { CalendarDays, Store } from 'lucide-react'
import React from 'react'

export default function CustomerStats( { data }: { data: any } ) {
  return (
    <div>


    
      {/* stats cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        <StatsCard
          color='#2CC1C1'
          title='Total Customers'
          value={data?.totalCustomers || 0}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Vendors/>} 
        />
          <StatsCard
          color='#E28611'
          title='Active Users'
          value={data?.activeUsers || 0}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Customers/>} 
        />
        <StatsCard
          color='#89A2C3'
          title='Reported Customers'
          value={data?.reportedCustomers || 0   }
          update='May 22, 2026'
          icon={<DashboardStatsIcons.ActiveTruck/>} 
        />
        <StatsCard
          color='#E5C649'
          title='Suspended Customers'
          value={data?.suspendedCustomers || 0}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Revenue/>} 
        />



      </section>

    </div>
  )
}



