import React from 'react'
import ProfileInfo from './ProfileInfo'
import OrderDistribution from './OrderDistribution'
import RevenueChart from './RevenueChart'
import ProfileViews from './ProfileViews'
import FavoritesCountCard from './FavoritesCount'
import CustomerEngagementChart from './CustomerEngagementChart'
import ServiceArea from './ServiceArea'
import { VendorOverviewData } from '@/types/vendorAccount.types'

export default function OverviewTab({ vendorOverview }: { vendorOverview: VendorOverviewData }) {

    const { vendor, contactInfo, businessProfile, orderDistribution, revenueChart, customerEngagement, serviceArea, profileViews, favorites, lastUpdatedAt } = vendorOverview || {};



    return (
        <div className='space-y-6'>
            <ProfileInfo vendor={vendor} contactInfo={contactInfo} businessProfile={businessProfile} />
            <div className='flex flex-col md:flex-row gap-4 w-full  '>
                <OrderDistribution orderDistribution={orderDistribution} />
                <RevenueChart revenueChart={revenueChart} />
            </div>

            <div className='flex flex-col md:flex-row gap-4 w-full  '>
                <div className='flex-1'>
                    <CustomerEngagementChart customerEngagement={customerEngagement} />
                </div>
                <div className='flex-1'>
                    <ServiceArea serviceArea={serviceArea} />
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 w-full  '>

                <div className='flex-1'>
                    <ProfileViews profileViews={profileViews} />

                </div>
                <div className='flex-1'>
                    <FavoritesCountCard favorites={favorites} />
                </div>
            </div>

            
        </div>
    )
}
