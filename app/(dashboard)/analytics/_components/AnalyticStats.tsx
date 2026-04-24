import DashboardStatsIcons from '@/components/icons/DashboardStatsIcons';
import VendorStatsIcons from '@/components/icons/VendorStatsIcons';
import StatsCard from '@/components/reusable/StatsCard';


export default function AnalyticStats() {
    return (
        <div>



            {/* stats cards */}
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

                <StatsCard
                    color='#3AC2C2'
                    title='Total Vendors Registered                      '
                    value={1240}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.TotalVendors />}
                />
                <StatsCard
                    color='  #FFBB1C'
                    title='Total Customers Registered'
                    value={1220}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.VerifiedVendors />}
                />
                <StatsCard
                    color='#89A2C3'
                    title='Total Subscribers'
                    value={17}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.NewVendors />}
                />
                <StatsCard
                    color='#CC1E22'
                    title='Platform Revenue'
                    value={2}
                    update='May 22, 2026'
                    icon={<VendorStatsIcons.SuspendedVendors />}
                />



            </section>

        </div>
    )
}



