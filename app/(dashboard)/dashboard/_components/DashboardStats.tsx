import DashboardStatsIcons from '@/components/icons/DashboardStatsIcons';
import { CalendarDays, Store } from 'lucide-react'
import React from 'react'

export default function DashboardStats() {
  return (
    <div>


    
      {/* stats cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>

        <VendorCard
          color='#2CC1C1'
          title='Total Vendors'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Vendors/>} 
        />
        <VendorCard
          color='#E28611'
          title='Total Customers'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Customers/>} 
        />
        <VendorCard
          color='#89A2C3'
          title='Total Active Trucks'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.ActiveTruck/>} 
        />
        <VendorCard
          color='#E5C649'
          title='Platform Revenue'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Revenue/>} 
        />



      </section>

    </div>
  )
}



interface VendorCardProps {
  color: string;
  title: string;
  value: number;
  update: string;
  icon: React.ReactNode;
}



const VendorCard: React.FC<VendorCardProps> = ({ color, title, value, update, icon }) => {
  return (
    <div className="flex flex-col max-w-sm relative overflow-hidden shadow-sm rounded-[var(--Other-Radius-md,8px)] border border-[color:var(--Color-Gray-100,#EDEDED)] [background:var(--BG-Linear,linear-gradient(180deg,#ECF1F8_0%,#FEFEFE_100%))]">

      {/* Top Section */}
      <div className="flex items-start gap-4 p-5 pb-4 border-b border-[color:var(--Color-Gray-100,#EDEDED)]">

        {/* Left Indicator Bar (Added based on image) */}
        <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[75%] w-1 rounded-r-sm`} style={{ backgroundColor: color }} />

        {/* Icon Container */}
        <div className="flex flex-col items-center justify-center rounded-full [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))] p-2.5">
          {icon}
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-1.5 grow">
          <h3 className="text-[color:var(--Secondary-Text,#697586)] font-inter text-sm font-medium leading-[160%]">
            {title}
          </h3>
          <p className="text-[#071E27] font-inter text-4xl font-semibold leading-[124%] tracking-tight">
            {value}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gray-50/10">
        <p className="text-[color:var(--Secondary-Text,#697586)] text-sm font-normal opacity-70">
          Update: {update}
        </p>
      </div>
    </div>
  );
};