import React from 'react'
import ProfileInfo from './ProfileInfo'
import { OrderOverviewChart } from './OrderDistribution'
import OrderDistribution from './OrderDistribution'
import RevenueChart from './RevenueChart'

export default function OverviewTab() {
    return (
        <div className='space-y-6'>
            <ProfileInfo />
            <div className='flex flex-col md:flex-row gap-4 w-full  '>
                <OrderDistribution />
                <RevenueChart />
            </div>
        </div>
    )
}
