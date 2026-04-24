import React from 'react'
import ReportsAccordion from './ReportsAccordion';

export default function ReportDetails({ selectedId }: { selectedId: string | null }) {

    console.log(selectedId);
    return (
        <div className='w-full flex flex-col items-center gap-4 flex-[1_0_0] self-stretch border border-[#ECEFF3] [background:var(--Background-White,#FFF)] shadow-[0_0_16px_0_rgba(0,0,0,0.06)] p-6 rounded-2xl border-solid'>

            {/* info */}
            <div className='w-full '>
                <h3 className='flex-[1_0_0] text-[#2A3542] font-lora text-lg font-bold leading-[130%] pb-2'>Customer Reports Details</h3>
            </div>

            <div className='w-full  flex justify-between items-center'>
                <div className='flex items-center  gap-3 '>

                    <div>
                        <img src="https://i.pravatar.cc/150?u=a042581f4e29" alt="customer report" width={100} height={100} className='w-[60px] h-[60px] rounded-full' />
                    </div>
                    <div>
                        <p className='text-[#2A3542] [font-family:Lora] text-lg font-bold leading-[130%]'>David John</p>

                        <p className='text-[#697586]  text-base font-normal leading-[130%] mt-1'>ID: #99283</p>                </div>

                </div>


                <button className='px-4 py-2 rounded-xl bg-red-500 text-white '>Suspend Customer</button>
            </div>

            <div  className='w-full space-y-2  '>
                <div className=' w-full'>
                    <div className='flex items-center justify- gap-6 bg-[#F6F8FA] px-4 py-3 rounded-lg'>
                        {/* First Item */}
                        <StatCard label="Completed Orders" value="3124" />
                        {/* Second Item */}
                        <StatCard label="Completed Orders" value="3124" />
                        {/* Third Item */}
                        <StatCard label="Completed Orders" value="3124" isLast />

                    </div>
                </div>
                <div className=' w-full'>
                    <div className='flex items-center justify- gap-6 bg-[#F6F8FA] px-4 py-3 rounded-lg'>
                        {/* First Item */}
                        <StatCard label="Completed Orders" value="3124" />
                        {/* Second Item */}
                        <StatCard label="Completed Orders" value="3124" />
                        {/* Third Item */}
                        <StatCard label="Completed Orders" value="3124" isLast />

                    </div>
                </div>
            </div>





            <div className='flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                    <h1 className='text-2xl font-bold'>Report Details for {selectedId}</h1>
                </div>
            </div>


            <ReportsAccordion/>
        </div>
    )
}


// Reusable card for a single stat
function StatCard({ label, value, isLast = false }: { label: string; value: string | number, isLast?: boolean }) {
    return (
        <div className={`${isLast ? '' : 'pr-6 border-r border-gray-300'}`}>
            <p className="min-h-5 self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%] ">{label}</p>
            <p className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-base font-bold leading-[130%]">{value}</p>
        </div>
    );
}


