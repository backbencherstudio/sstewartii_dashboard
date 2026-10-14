"use client";

import { useParams } from "next/navigation";
import { useVendorVerificationDetails } from "@/hooks/useVendor";
import DocumentTab from "./_components/DocumentTab";
import { useState } from "react";
import CustomTabs2 from "@/components/reusable/CustomTabs2";
import NidTab from "./_components/NidTab";

export default function Page() {
  const params = useParams();
  const id = params.rid as string;

  const [activeTab, setActiveTab] = useState<"document" | "nid-information">(
    "document",
  );

  const { data: vendorVerificationDetails } = useVendorVerificationDetails(id);
  const vendorId =
    vendorVerificationDetails?.vendorId ??
    vendorVerificationDetails?.vendor?.id;


  return (
    <div className="space-y-6 container mx-auto">
      <CustomTabs2
        defaultTab="document"
        onChange={(tabId: string) =>
          setActiveTab(tabId as "document" | "nid-information")
        }
      />

      {activeTab === "document" && <DocumentTab id={id} />}
      {activeTab === "nid-information" &&
        (vendorId ? (
          <NidTab vendorId={vendorId} />
        ) : (
          <p className="text-[#2A3542] text-base">Loading vendor...</p>
        ))}
    </div>
  );
}
