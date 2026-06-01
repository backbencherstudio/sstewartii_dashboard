import DashboardStatsIcons from '@/components/icons/DashboardStatsIcons';
import VendorStatsIcons from '@/components/icons/VendorStatsIcons';
import StatsCard from '@/components/reusable/StatsCard';
import { VendorStats } from '@/types/vendorAccount.types';


export default function ManageVendorAcountStats({ data }: { data: VendorStats | undefined }) {

  // console.dir(data, { depth: null });
  return (
    <div>


    
      {/* stats cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        <StatsCard
          color='#3AC2C2'
          title='Total Vendors'
          value={data?.totalVendors || 0}
          update='May 22, 2026'
          icon={<VendorStatsIcons.TotalVendors/>} 
        />
          <StatsCard
          color='  #FFBB1C'
          title='Verified Vendors'
          value={data?.verifiedVendors || 0}
          update='May 22, 2026'
          icon={<VendorStatsIcons.VerifiedVendors/>} 
        />
        <StatsCard
          color='#89A2C3'
          title='New This Month'
          value={data?.newThisMonth || 0}
          update='May 22, 2026'
          icon={<VendorStatsIcons.NewVendors/>} 
        />
        <StatsCard
          color='#CC1E22'
          title='Suspended Vendors'
          value={data?.suspendedVendors || 0}
          update='May 22, 2026'
          icon={<VendorStatsIcons.SuspendedVendors/>} 
        />



      </section>

    </div>
  )
}



