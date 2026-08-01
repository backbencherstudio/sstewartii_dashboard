import React from 'react'
import VendorDetailCard from './VendorDetailCard'
import DocumentTable from './DocumentTable'
import ApproveDoc from './ApproveDoc'
import { DocumentItem, VendorDetails, VendorVerificationStatus } from '@/types/vendor.types'
import { useVendorVerificationDetails } from '@/hooks/useVendor'

export default function DocumentTab({ id }: { id: string }) {
    const { data: vendorVerificationDetails } = useVendorVerificationDetails(id);


    const vendorDetails = vendorVerificationDetails?.vendor as VendorDetails;
    const vendorDocs = vendorVerificationDetails?.documents as DocumentItem[] || [];

    return (


        <>
            <div>
                <h2 className='text-[#1A1C1E] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px]'>Reviewing documents</h2>

                <p className="text-[#2A3542] text-base font-normal leading-6">
                    Submitted on {vendorVerificationDetails?.submittedAtLabel} • ID: {vendorVerificationDetails?.vendorCode}
                </p>

            </div>
            <section className='grid md:grid-cols-[70%_30%] grid-cols-1 gap-6'>

                <div className='space-y-6'>
                    <DocumentTable docData={vendorDocs} />

                    <ApproveDoc verificationId={id} verificationStatus={vendorVerificationDetails?.status as VendorVerificationStatus} />
                </div>


                <div>
                    <VendorDetailCard data={vendorDetails} />
                </div>
            </section></>
    )
}
