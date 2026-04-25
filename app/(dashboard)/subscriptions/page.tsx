import React from 'react'
import AnalyticStats from '../analytics/_components/AnalyticStats'
import PageTitle from '@/components/reusable/PageTitle'
import OtherIcons from '@/components/icons/OtherIcons'
import Link from 'next/link'
import SubscriptionPackagesTable from './_components/SubscriptionPackagesTable'
import BillingTable from './_components/BillingTable'

export default function page() {
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <PageTitle title="Subscription Management" description="Configure and manage platform membership tiers." />

                <div className='flex items-center gap-2'>
                    <Link href={"/subscriptions/all-plans"} className='flex h-14 justify-center items-center gap-2 border border-[color:var(--Neutrals-05,#70747C)] px-6 py-4 rounded-2xl border-solid  text-nowrap  text-[color:var(--Neutrals-04,#585D63)] [font-family:Inter] text-base font-medium leading-[120%]    '>


                        <span className='text-nowrap'>View Plans</span>
                        <OtherIcons.LeftArrowIcon />
                    </Link>


                    <button className='btn-primary'>Create New Plan</button>
                </div>
            </div>
         
            <AnalyticStats />

            <SubscriptionPackagesTable/>


            <BillingTable/>
        </div>
    )
}
