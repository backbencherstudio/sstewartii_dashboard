import React from 'react'

export default function page() {
    return (
        <div className=' space-y-6'>
            <h3 className='text-[#2A3542] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px] py-4 border-b border-[#E6E6E6] real'>Notification Preferences</h3>




            {/* System Alerts */}

            <section className='p-6 rounded-xl bg-white border border-[#E6E6E6] space-y-2 relative'>
                <div>
                    <p className='text-[#2A3542] font-lora text-base font-bold leading-[130%] mb-1'>System Alerts</p>

                    <p className='text-[#697586] font-inter text-sm font-normal leading-[160%]'>Critical infrastructure updates and maintenance notifications.</p>
                </div>

                {/* Items */}
                <div className="">
                    <AlertItem
                        icon={<Mail className="h-5 w-5 text-[#697586]" />}
                        label="Email Notifications"
                        checked
                    />

                    <AlertItem
                        icon={<MessageSquare className="h-5 w-5 text-[#697586]" />}
                        label="SMS Alerts"
                    />

                    <AlertItem
                        icon={<Bell className="h-5 w-5 text-[#697586]" />}
                        label="In-App Banner"
                        checked
                        noBorder
                    />
                </div>


                <span className='w-1 h-8 absolute [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))] rounded-[0_12px_12px_0] top-8 left-0'></span>
            </section>

            {/* Vendor Updates */}
            <section className='p-6 rounded-xl bg-white border border-[#E6E6E6] space-y-2 relative'>
                <div>
                    <p className='text-[#2A3542] font-lora text-base font-bold leading-[130%] mb-1'>Vendor Updates</p>

                    <p className='text-[#697586] font-inter text-sm font-normal leading-[160%]'>Stay informed about vendor updates.</p>
                </div>

                {/* Items */}
                <div className="">
                    <AlertItem
                        icon={<Mail className="h-5 w-5 text-[#697586]" />}
                        label="Email Notifications"
                        checked
                    />

                    <AlertItem
                        icon={<MessageSquare className="h-5 w-5 text-[#697586]" />}
                        label="SMS Alerts"
                    />

                    <AlertItem
                        icon={<Bell className="h-5 w-5 text-[#697586]" />}
                        label="In-App Banner"
                        checked
                        noBorder
                    />
                </div>


                <span className='w-1 h-8 absolute bg-[#3AC2C2] rounded-[0_12px_12px_0] top-8 left-0'></span>
            </section>
            {/* Customer Reports  */}
            <section className='p-6 rounded-xl bg-white border border-[#E6E6E6] space-y-2 relative'>
                <div>
                    <p className='text-[#2A3542] font-lora text-base font-bold leading-[130%] mb-1'>Customer Reports</p>

                    <p className='text-[#697586] font-inter text-sm font-normal leading-[160%]'>Monitor reports against customers and customer behavior insights.</p>
                </div>

                {/* Items */}
                <div className="">
                    <AlertItem
                        icon={<Mail className="h-5 w-5 text-[#697586]" />}
                        label="Email Notifications"
                        checked
                    />

                    <AlertItem
                        icon={<MessageSquare className="h-5 w-5 text-[#697586]" />}
                        label="SMS Alerts"
                    />

                    <AlertItem
                        icon={<Bell className="h-5 w-5 text-[#697586]" />}
                        label="In-App Banner"
                        checked
                        noBorder
                    />
                </div>


                <span className='w-1 h-8 absolute bg-[#3AC2C2] rounded-[0_12px_12px_0] top-8 left-0'></span>
            </section>
        </div>
    )

}



import { Bell, Mail, MessageSquare, TerminalSquare } from "lucide-react";
import { Switch } from '@/components/ui/switch';
// import { Switch } from "@/components/ui/switch";
// import Switch from '@/components/reusable/Switch';


function AlertItem({
    icon,
    label,
    checked = false,
    noBorder = false,
}: {
    icon: React.ReactNode;
    label: string;
    checked?: boolean;
    noBorder?: boolean;
}) {
    return (
        <div
            className={`flex items-center justify-between py-4 ${noBorder ? "" : "border-b border-[#EEF2F6]"
                }`}
        >
            <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9]">
                    {icon}
                </div>

                <p className="text-base font-medium text-[#111827]">{label}</p>
            </div>

            <Switch
                defaultChecked={checked}
                className="data-[state=checked]:bg-[#F59E0B]"
            />
        </div>
    );
}