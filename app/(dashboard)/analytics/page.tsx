"use client"

import PageTitle from '@/components/reusable/PageTitle'
import React from 'react'
import VendorAccountTable from '../vendors/account/_components/VendorAccountTable'
import ManageVendorAcountStats from '../vendors/account/_components/ManageVendorAcountStats'
import AnalyticStats from './_components/AnalyticStats'
import Leaderboard from './_components/Leaderboard'
import PlatformGrothGraph from './_components/PlatformGrothGraph'
import SubscriberGrowth from './_components/SubscriberGrowth'
import RevenueGraph from './_components/RevenueGraph'
import { useGetAnalytics } from '@/hooks/useAnalytics'

export default function page() {


  const { data: analytics, isLoading, error } = useGetAnalytics();

  console.log(analytics);

  return (
    <div className='space-y-6'>
      <PageTitle title="Analytics Overview" description="Deep dive into your platform performance and insights." />

      <AnalyticStats data={analytics?.data?.stats || undefined} />

      <section className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full  flex-1">
          <PlatformGrothGraph data={analytics?.data?.platformGrowth || undefined} />
        </div>
        <div className='w-[385px] flex-shrink-0'>
          <Leaderboard leaderboard={analytics?.data?.leaderboard || undefined} />
        </div>
      </section>


      <SubscriberGrowth subscribers={analytics?.data?.subscriberGrowth || undefined} />

      <RevenueGraph revenue={analytics?.data?.revenueGrowth || undefined} />

    </div>
  )

}
