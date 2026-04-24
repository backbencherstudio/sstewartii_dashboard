import React from 'react';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';

export default function ProfileInfo() {
    return (
        // <section className="bg-white p-8 rounded-3xl border border-[#ECEFF3] shadow-sm flex flex-col lg:flex-row gap-8">

        <div className="flex flex-col lg:flex-row gap-1">

            {/* LEFT: Profile Summary */}

            <div className="flex  flex-col items-center gap-4 flex-1 w-full max-w-[554px]  self-stretch border border-[#ECEFF3] [background:var(--Background-White,#FFF)] shadow-[0_0_16px_0_rgba(0,0,0,0.06)] rounded-l-2xl  border-solid p-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border">
                    <Image src="https://i.pravatar.cc/150?u=52" alt="Meat On Wheel" fill className="object-cover" />
                </div>
                <div className="text-center">
                    <h2 className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px] flex items-center justify-center gap-2">
                        Meat On Wheel <span className="text-emerald-500">
                        <BadgeCheck />
                        </span>
                    </h2>
                    <p className="mt-1 text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-base font-normal leading-[130%]">ID: #99283</p>
                </div>

                {/* Stats Card */}
                <div className="w-full bg-[#F5F9F9] p-4 flex justify-between items-center mt-2  self-stretch [background:rgba(58,194,194,0.10)] px-6 py-4 rounded-lg ">

                    {
                        [
                            {
                                label: 'Current Plan',
                                value: 'Pro'
                            },
                            {
                                label: 'Avg. Rating',
                                value: '4.8'
                            },
                            {
                                label: 'Total Revenue',
                                value: '$3804.00'
                            }
                        ].map((item) => (
                            <div key={item.label}>
                                <p className="text-[#585D63] font-lora text-lg font-bold leading-[130%] text-center mb-1">{item.value}</p>
                                <p className="text-[#697586] font-inter text-sm font-medium leading-[130%] text-center">{item.label}</p>
                            </div>
                        ))
                    }

                </div>
            </div>

            {/* RIGHT: Vendor Details */}

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 border border-[#ECEFF3] [background:var(--Background-White,#FFF)] shadow-[0_0_16px_0_rgba(0,0,0,0.06)] rounded-r-2xl border-solid px-8 py-10">
                <div>
                    <h3 className="text-[#2A3542] font-lora text-base font-bold leading-[130%] mb-6">
                        Vendor Contact Info
                    </h3>
                    <div className="space-y-4">
                        <DetailsItem label="Vendor ID" value="ID: #99283" />
                        <DetailsItem label="Full Name" value="David John" />
                        <DetailsItem label="Registered Email" value="david@gmail.com" />
                        <DetailsItem label="Phone Number" value="+1 (512) 555-0198" />
                        <DetailsItem label="Date Joined" value="Joined on Oct 24, 2023" />
                    </div>
                </div>

                <div>
                    <h3 className="text-[#2A3542] font-lora text-base font-bold leading-[130%] mb-6">
                        Business Profile
                    </h3>
                    <div className="space-y-4">
                       
                        <DetailsItem label="Category" value="Mexican" />
                        <DetailsItem label="Public Email" value="foodonwheel@gmail.com" />
                        <DetailsItem label="Phone Number" value="+1 (512) 555-0198" />
                        <DetailsItem label="Website URL" value="foodonwheel.com" />
                        <DetailsItem label="Instagram URL" value="www.instagram.com/foodonwheel" />
                    </div>
                </div>
            </div>
        </div>


        // </section>
    );
}


const DetailsItem = ({ label, value }: { label: string, value: string }) => {
    return (
        <div>
            <p className="self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">{label}</p>
            <p className="self-stretch text-[color:var(--Neutrals-04,#585D63)] [font-family:Lora] text-sm font-bold leading-[130%] mt-1">{value}</p>
        </div>
    )
}

