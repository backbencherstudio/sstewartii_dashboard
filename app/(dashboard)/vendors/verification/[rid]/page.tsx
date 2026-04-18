import React from 'react'
import DocumentTable from './DocumentTable'
import VendorDetailCard from './VendorDetailCard'

export default function page() {
    return (
        <div className='space-y-6 container mx-auto'>
            <div>
                <h2 className='text-[#1A1C1E] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px]'>Reviewing documents</h2>

                <p className="text-[#2A3542] text-base font-normal leading-6">
                    Submitted on Oct 24, 2023 • ID: #99283
                </p>

            </div>


            {/* doc table */}

            <section className='grid md:grid-cols-[70%_30%] grid-cols-1 gap-6'>

                <div>
                    <DocumentTable />
                </div>


                <div>
                    <VendorDetailCard />
                </div>
            </section>
            <div>

            </div>
        </div>
    )
}
