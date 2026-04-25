import React from 'react'
import CreateSubscriptionPlan from './_components/CreateSubscriptionPlan'
import PageTitle from '@/components/reusable/PageTitle'

export default function page() {
    return (
        <div>

            <PageTitle
             title="Create Subscription Plan" 
             description="Create a new subscription plan for your business" />
             <div className='mt-6'>
                <CreateSubscriptionPlan />
             </div>
        </div>
    )
}
