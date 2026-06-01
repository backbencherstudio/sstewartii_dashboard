"use client";

import DocumentTable from './_components/DocumentTable'
import VendorDetailCard from './_components/VendorDetailCard'
import ApproveDoc from './_components/ApproveDoc'
import { useParams } from 'next/navigation';
import { useVendorVerificationDetails } from '@/hooks/useVendor';
import { DocumentItem, VendorDetails, VendorVerificationStatus } from '@/types/vendor.types';

export default function page() {
    const params = useParams();
    const id = params.rid as string;

    const { data: vendorVerificationDetails } = useVendorVerificationDetails(id);


    const vendorDetails = vendorVerificationDetails?.vendor as VendorDetails;
    const vendorDocs = vendorVerificationDetails?.documents as DocumentItem[] || [];

    console.dir(vendorVerificationDetails);
    return (
        <div className='space-y-6 container mx-auto'>
            <div>
                <h2 className='text-[#1A1C1E] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px]'>Reviewing documents</h2>

                <p className="text-[#2A3542] text-base font-normal leading-6">
                    Submitted on {vendorVerificationDetails?.submittedAtLabel} • ID: {vendorVerificationDetails?.vendorCode}
                </p>

            </div>


            {/* doc table */}

            <section className='grid md:grid-cols-[70%_30%] grid-cols-1 gap-6'>

                <div className='space-y-6'>
                    <DocumentTable docData={vendorDocs} />

                    <ApproveDoc verificationId={id} verificationStatus={vendorVerificationDetails?.status as VendorVerificationStatus} />
                </div>


                <div>
                    <VendorDetailCard data={vendorDetails} />
                </div>
            </section>
            <div>

            </div>
        </div>
    )
}
