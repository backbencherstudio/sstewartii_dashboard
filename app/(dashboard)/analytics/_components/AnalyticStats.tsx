'use client'

import VendorStatsIcons from '@/components/icons/VendorStatsIcons';
import StatsCard from '@/components/reusable/StatsCard';
import { useGetAnalytics } from '@/hooks/useAnalytics';
import { AnalyticsStats } from '@/types/analytics.types';


export default function AnalyticStats({ data }: { data: AnalyticsStats | undefined }) {

    const { platformRevenue, totalCustomers, totalSubscribers, totalVendors } = data || {};
    // console.log(data);

    return (
        <div>



            {/* stats cards */}
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

                <StatsCard
                    color='#3AC2C2'
                    title='Total Vendors Registered                      '
                    value={totalVendors || 0}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.TotalVendors />}
                />
                <StatsCard
                    color='  #FFBB1C'
                    title='Total Customers Registered'
                    value={totalCustomers || 0}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.VerifiedVendors />}
                />
                <StatsCard
                    color='#89A2C3'
                    title='Total Subscribers'
                    value={totalSubscribers || 0}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.NewVendors />}
                />
                <StatsCard
                    color='#CC1E22'
                    title='Platform Revenue'
                    value={platformRevenue || 0}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.SuspendedVendors />}
                />



            </section>

        </div>
    )
}



