"use client";

import DocumentTable from './_components/DocumentTable'
import VendorDetailCard from './_components/VendorDetailCard'
import ApproveDoc from './_components/ApproveDoc'
import { useParams } from 'next/navigation';
import { useVendorVerificationDetails } from '@/hooks/useVendor';
import { DocumentItem, VendorDetails, VendorVerificationStatus } from '@/types/vendor.types';
import DocumentTab from './_components/DocumentTab';
import { useState } from 'react';
import CustomTabs2 from '@/components/reusable/CustomTabs2';
import NidTab from './_components/NidTab';


export default function page() {
    const params = useParams();
    const id = params.rid as string;

    const [activeTab, setActiveTab] = useState<"document" | "nid-information">("document");



    // console.dir(vendorVerificationDetails);

    return (
        <div className='space-y-6 container mx-auto'>

            <CustomTabs2
                defaultTab="document"
                onChange={(tabId: string) => setActiveTab(tabId as "document" | "nid-information")}
            />

            {activeTab === "document" && <DocumentTab id={id} />}
            {activeTab === "nid-information" && <NidTab id={id} />}

        </div>
    )
}
