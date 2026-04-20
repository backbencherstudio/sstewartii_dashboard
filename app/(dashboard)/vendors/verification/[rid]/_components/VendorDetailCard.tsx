import Image from 'next/image';
import React from 'react';
import { FileText } from 'lucide-react'; // Or any icon library

export default function VendorDetailCard() {
  return (
    <div className="flex flex-col items-start gap-6 border border-[color:var(--background-hover-50,#ECEFF3)] [background:var(--background-disabled-0,#F8FAFB)] p-6 rounded-2xl border-solid min-w-[262px]">
      
      {/* 1. Profile Header Section */}
      <div className="flex items-center gap-5">
        <div className="relative w-[84px] h-[84px] rounded-full overflow-hidden border-2 border-white shadow-inner">
          <Image 
            src="/images/vendor-avatar.png" // Substitute your actual image path
            alt="Meat On Wheel" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-lg font-bold leading-[130%]">
            Meat On Wheel
          </h2>
          <p className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-base font-normal leading-[130%]">
            Vendor ID: <span className="text-[#64748b]">#32897</span>
          </p>
        </div>
      </div>

      {/* 2. Sub-section Divider (VENDOR DETAILS) */}
      <div className="flex items-center gap-2.5 pt-2">
        <FileText className="w-[10.667px] h-[13.333px] text-[var(--Secondary-Text,#697586)]" />
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">
          Vendor Details
        </span>
      </div>

      {/* 3. The Info Grid Section */}
      <div className="space-y-6">
        
        {/* Label and Value pair */}
        {[
          { label: 'Vendor ID', value: 'ID: #99283' },
          { label: 'Full Name', value: 'David John' },
          { label: 'Registered Email', value: 'david@gmail.com' },
          { label: 'Phone Number', value: '+1 (512) 555-0198' },
          { label: 'Date Joined', value: 'Joined on Oct 24, 2023' },
        ].map((info, index) => (
          <div key={index} className="flex flex-col">
            <span className="self-stretch text-[rgba(80,69,51,0.70)] [font-family:Inter] text-[10px] font-normal leading-[120%]">
              {info.label}
            </span>
            <span className={`self-stretch text-[color:var(--Neutrals-04,#585D63)] [font-family:Lora] text-sm font-bold leading-[130%]`}>
              {info.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}