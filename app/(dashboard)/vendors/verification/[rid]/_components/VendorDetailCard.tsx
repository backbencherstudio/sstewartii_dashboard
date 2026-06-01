import Image from "next/image";
import React from "react";
import { FileText } from "lucide-react";
import { VendorDetails } from "@/types/vendor.types";

export default function VendorDetailCard({
  data,
}: {
  data: VendorDetails;
}) {
  return (
    <div className="flex flex-col items-start gap-6 border border-[color:var(--background-hover-50,#ECEFF3)] [background:var(--background-disabled-0,#F8FAFB)] p-6 rounded-2xl border-solid min-w-[262px]">
      {/* Profile Header */}
      <div className="flex items-center gap-5">
        <div className="relative w-[84px] h-[84px] rounded-full overflow-hidden border-2 border-white shadow-inner">
          <Image
            src={data?.coverImage || "/images/vendor-avatar.png"}
            alt={data?.businessName || ""}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-lg font-bold leading-[130%]">
            {data?.businessName || ""}
          </h2>

          <p className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-base font-normal leading-[130%]">
            Vendor ID:{" "}
            <span className="text-[#64748b]">{data?.vendorCode || ""}</span>
          </p>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex items-center gap-2.5 pt-2">
        <FileText className="w-[10.667px] h-[13.333px] text-[var(--Secondary-Text,#697586)]" />
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">
          Vendor Details
        </span>
      </div>

      {/* Details */}
      <div className="space-y-6">
        {[
          {
            label: "Vendor ID",
            value: data?.vendorCode || "",
          },
          {
            label: "Business Name",
            value: data?.businessName || "",
          },
          {
            label: "Owner Name",
            value: data?.ownerName || "",
          },
          {
            label: "Owner Email",
            value: data?.ownerEmail || "",
          },
          {
            label: "Public Email",
            value: data?.publicEmail || "",
          },
          {
            label: "Phone Number",
            value: data?.contactNumber || "",
          },
          {
            label: "Date Joined",
            value: data?.joinedAtLabel || ""  ,
          },
        ].map((info, index) => (
          <div key={index} className="flex flex-col">
            <span className="self-stretch text-[rgba(80,69,51,0.70)] [font-family:Inter] text-[10px] font-normal leading-[120%]">
              {info?.label  || ""}
            </span>

            <span className="self-stretch text-[color:var(--Neutrals-04,#585D63)] [font-family:Lora] text-sm font-bold leading-[130%] break-words">
              {info?.value || "-"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}