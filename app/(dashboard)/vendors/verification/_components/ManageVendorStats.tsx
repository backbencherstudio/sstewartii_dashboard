import DashboardStatsIcons from '@/components/icons/DashboardStatsIcons';
import StatsCard from '@/components/reusable/StatsCard';
import { CalendarDays, Store } from 'lucide-react'
import React from 'react'

export default function DashboardStats() {
  return (
    <div>



      {/* stats cards */}
      <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>



        <div className='flex h-full max-w-sm flex-col gap-3 justify-between items-start flex-[1_0_0] [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))] px-6 py-4 rounded-lg relative'>
          <div>
            <h3 className='text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-sm font-medium leading-[160%] mb-1'>Total Vendors</h3>
            <p className='text-[#071E27] [font-family:Inter] text-4xl font-semibold leading-[124%]'>1240</p>
          </div>

          <p className='flex w-[193.13px] h-5 flex-col justify-center text-[rgba(109,77,0,0.80)]  text-sm font-bold leading-5'>12% Increase from yesterday</p>


          <div className='absolute top-0 right-0'>
            <svg width="84" height="115" viewBox="0 0 84 115" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.1" clip-path="url(#clip0_9031_55385)">
                <path d="M88.625 76.2766C84.6471 69.9106 79.3062 64.7199 73.0286 60.9997C82.4269 58.1448 90.0935 50.4826 92.4571 40.2447C95.9736 25.0149 86.4437 9.76365 71.2137 6.24751C55.9836 2.73138 40.7325 12.2615 37.2165 27.4913C34.8528 37.7295 38.3848 47.9769 45.5803 54.6628C38.3075 55.2544 31.2316 57.5785 24.8654 61.5566C14.3842 68.1061 7.08087 78.345 4.30066 90.3874C3.93239 91.9825 4.92712 93.5745 6.52227 93.9427L90.9141 113.426C92.5093 113.794 94.1012 112.8 94.4695 111.205C97.2501 99.162 95.1744 86.7578 88.625 76.2766ZM42.9934 28.8251C45.7741 16.7805 57.8355 9.24377 69.88 12.0245C81.9245 14.8052 89.4613 26.8665 86.6806 38.911C83.8999 50.9555 71.8385 58.4923 59.794 55.7116C47.7495 52.9309 40.2127 40.8696 42.9934 28.8251ZM10.8497 88.8569C17.0266 68.8679 37.757 56.7089 58.4603 61.4886C79.1636 66.2683 92.4655 86.2844 89.2549 106.958L10.8497 88.8569Z" fill="#1A1C1E" />
                <path d="M62.6629 43.2866C61.1521 42.9378 59.3979 43.9322 59.1076 45.5082C58.8163 47.0893 59.7099 48.6897 61.3292 49.0636C62.84 49.4124 64.5942 48.418 64.8845 46.842C65.1756 45.2609 64.2822 43.6605 62.6629 43.2866ZM68.3451 18.6727C63.4007 17.5312 58.4497 20.625 57.3083 25.5694C56.94 27.1646 57.9347 28.7565 59.5299 29.1247C61.125 29.493 62.7169 28.4983 63.0852 26.9031C63.4913 25.1443 65.2526 24.0436 67.0114 24.4496C68.77 24.8556 69.8708 26.6169 69.4647 28.3759C69.0586 30.1349 67.2973 31.2355 65.5385 30.8294C63.9433 30.4612 62.3514 31.4559 61.9831 33.0511L60.9743 37.4209C60.606 39.016 61.6008 40.6079 63.1959 40.9762C64.7911 41.3445 66.383 40.3497 66.7512 38.7546L67.2035 36.7958C71.0133 36.4065 74.3332 33.6436 75.2414 29.7096C76.3833 24.7653 73.2895 19.8142 68.3451 18.6727Z" fill="#1A1C1E" />
              </g>
              <defs>
                <clipPath id="clip0_9031_55385">
                  <rect width="100" height="100" fill="white" transform="translate(22.4951 -5) rotate(13)" />
                </clipPath>
              </defs>
            </svg>

          </div>
        </div>


        <StatsCard
          color='#E28611'
          title='Total Customers'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Customers />}
        />
        <StatsCard
          color='#89A2C3'
          title='Total Active Trucks'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.ActiveTruck />}
        />
        <StatsCard
          color='#E5C649'
          title='Platform Revenue'
          value={1240}
          update='May 22, 2026'
          icon={<DashboardStatsIcons.Revenue />}
        />



      </section>

    </div>
  )
}





