import React from 'react'
import ProfileInfo from './ProfileInfo'
import OrderDistribution from './OrderDistribution'
import RevenueChart from './RevenueChart'
import ProfileViews from './ProfileViews'
import FavoritesCountCard from './FavoritesCount'
import CustomerEngagementChart from './CustomerEngagementChart'
import ServiceArea from './ServiceArea'

export default function OverviewTab() {
    return (
        <div className='space-y-6'>
            <ProfileInfo />
            <div className='flex flex-col md:flex-row gap-4 w-full  '>
                <OrderDistribution />
                <RevenueChart />
            </div>

            <div className='flex flex-col md:flex-row gap-4 w-full  '>
                <div className='flex-1'>
                    <CustomerEngagementChart />
                </div>
                <div className='flex-1'>
                    <ServiceArea />
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 w-full  '>

                <div className='flex-1'>
                    <ProfileViews />

                </div>
                <div className='flex-1'>
                    <FavoritesCountCard />
                </div>
            </div>

            
        </div>
    )
}
