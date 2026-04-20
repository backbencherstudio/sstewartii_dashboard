'use client';
import React from 'react'

export default function OrderDistribution() {
    return (
      <section className='w-full max-w-3xl border border-[#ECEFF3] [background:var(--Background-White,#FFF)] shadow-[0_0_16px_0_rgba(0,0,0,0.06)] px-5 py-6 rounded-2xl border-solid'>


        <div>
            <h2 className='section-title mb-4'>Order Distribution</h2>
        </div>
          <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl ">

            

<div className='flex flex-col gap-4 w-full max-w-40'>


    {
        [
            {
                title: 'Total Orders',
                value: 1150,
                icon: <Ordercon />
            },
            {
                title: 'Items Sold',
                value: 4150,
                icon: <ItemIcon />
            },

        ].map((item) => (<> <div className='flex w-full  flex-col justify-center items-center gap-2.5 flex-[1_0_0] border-[#ECEFF3] p-4 rounded-[15px] border-[0.5px] border-solid bg-[#F6F8FA]'>


            <div className='flex justify-center items-center gap-2.5 rounded-[30px] bg-[#3AC2C2] p-2.5'>

                {item.icon}

            </div>

            <div className='flex gap-1.25'>
                <span className='text-[#2A3542] font-lora text-lg font-bold leading-[130%]'>{item.value}</span>
                <span className='text-[#697586] text-sm font-normal leading-[160%]'>{item.title}</span>
            </div>

        </div></>))
    }


</div>
<OrderOverviewChart />
</div>
      </section>
    )
}

import { LayoutGrid } from 'lucide-react'; // Or your icon set's grid icon



import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';


const data = [
    { name: 'Complete', value: 80, color: '#90EE90' },
    { name: 'Cancel', value: 14, color: '#FFA07A' },
    { name: 'Incomplete', value: 6, color: '#B0C4DE' },
];

export function OrderOverviewChart() {
    return (
       

           
            <div className="w-full max-w-[600px]  flex flex-col items-center justify-between bg-[#F6F8FA] p-4 rounded-2xl border-[0.5px] border-[#ECEFF3]">

                {/* 1. Recharts Donut Chart */}
                <div className="w-[150px] h-[150px] relative ">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>

                    {/* Center Text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-[color:var(--Stroke,#2A3542)]  text-base font-semibold leading-[135%]">1150</span>
                        <span className="text-[color:var(--Secondary-Text,#697586)]  text-xs font-normal leading-[142%]">Orders</span>
                    </div>
                </div>

                {/* 2. Legend Grid */}
                <div className="w-full grid grid-cols-3 gap-4 mt-4">
                    {data.map((item, index) => (
                        <div key={index} className="flex flex-col items-start gap- text-center">
                            <span className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-lg font-bold leading-[130%] mb-0.5">{item.value}%</span>
                            <div className="flex items-center gap-1">
                                <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                                    <LayoutGrid className="w-3 h-3" style={{ color: item.color }} />
                                </div>
                                <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-sm font-normal leading-[120%] ">{item.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
      
    );
}



const Ordercon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.4315 16.6486H21.4083C21.2377 12.5271 18.0258 9.11628 13.7907 8.34884C14.2739 7.89406 14.5581 7.26873 14.5581 6.55814C14.5581 5.13695 13.4212 4 12 4C10.5788 4 9.44186 5.13695 9.44186 6.55814C9.44186 7.26873 9.7261 7.92248 10.2093 8.37726C5.97416 9.1447 2.76227 12.5556 2.59173 16.677H1.56848C1.25581 16.677 1 16.9328 1 17.2455C1 17.5581 1.25581 17.814 1.56848 17.814H22.4315C22.7442 17.814 23 17.5581 23 17.2455C23 16.9328 22.7442 16.6486 22.4315 16.6486ZM12 5.13695C12.7959 5.13695 13.4212 5.76227 13.4212 6.55814C13.4212 7.35401 12.7959 7.97933 12 7.97933C11.2041 7.97933 10.5788 7.35401 10.5788 6.55814C10.5788 5.76227 11.2041 5.13695 12 5.13695ZM12 9.34367C16.4341 9.34367 20.0724 12.6124 20.2713 16.677H3.72868C3.92765 12.584 7.56589 9.34367 12 9.34367Z" fill="white" stroke="white" stroke-width="0.4" />
    <path d="M22.4315 19.7471H1.56848C1.25581 19.7471 1 20.0029 1 20.3155C1 20.6282 1.25581 20.884 1.56848 20.884H22.4315C22.7442 20.884 23 20.6282 23 20.3155C23 20.0029 22.7442 19.7471 22.4315 19.7471Z" fill="white" stroke="white" stroke-width="0.4" />
</svg>


const ItemIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_9130_59218)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.25C9.07851 0.25 6.66619 2.4285 6.2985 5.25L5.63592 5.25C4.64023 5.24997 3.81454 5.24994 3.16653 5.34049C2.48529 5.43567 1.87316 5.64585 1.40763 6.16597C0.942096 6.68609 0.800806 7.31769 0.781433 8.00527C0.763004 8.65932 0.854212 9.47995 0.964197 10.4695L1.27209 13.2405C1.50212 15.3109 1.68278 16.937 1.98963 18.2008C2.30415 19.4962 2.77194 20.5072 3.64039 21.2845C4.50967 22.0625 5.57115 22.4154 6.90054 22.5847C8.19848 22.75 9.84662 22.75 11.9465 22.75H12.0535C14.1533 22.75 15.8015 22.75 17.0994 22.5847C18.4288 22.4154 19.4903 22.0625 20.3596 21.2845C21.228 20.5072 21.6958 19.4962 22.0103 18.2008C22.3172 16.937 22.4978 15.311 22.7279 13.2406L23.0358 10.4695C23.1457 9.47996 23.2369 8.65931 23.2185 8.00527C23.1991 7.31769 23.0579 6.68609 22.5923 6.16597C22.1268 5.64585 21.5147 5.43567 20.8334 5.34049C20.1854 5.24994 19.3597 5.24997 18.364 5.25L17.7015 5.25C17.334 2.42873 14.9214 0.25 12 0.25ZM12 1.75C14.0913 1.75 15.8298 3.26049 16.184 5.25H7.81588C8.16996 3.2607 9.9087 1.75 12 1.75ZM2.52532 7.16635C2.65603 7.02031 2.86344 6.89741 3.3741 6.82605C3.90604 6.75173 4.62603 6.75 5.69126 6.75H18.3087C19.3739 6.75 20.0939 6.75173 20.6258 6.82605C21.1365 6.89741 21.3439 7.02031 21.4746 7.16635C21.6053 7.31239 21.7046 7.5321 21.7191 8.04752C21.7342 8.58441 21.6565 9.30019 21.5388 10.3589L21.243 13.0215C21.0057 15.1569 20.8342 16.6873 20.5527 17.8469C20.2762 18.9857 19.9145 19.6697 19.3592 20.1668C18.8047 20.6631 18.0816 20.9475 16.9099 21.0967C15.7177 21.2486 14.165 21.25 12 21.25C9.83495 21.25 8.28228 21.2486 7.09007 21.0967C5.91831 20.9475 5.19529 20.6631 4.64077 20.1668C4.08543 19.6697 3.72378 18.9857 3.44728 17.8469C3.16574 16.6873 2.99425 15.1569 2.75698 13.0215L2.46114 10.3589C2.3435 9.30019 2.26571 8.58441 2.28084 8.04752C2.29536 7.5321 2.39461 7.31239 2.52532 7.16635Z" fill="white" />
        <path d="M18 10C18 10.5523 17.5522 11 17 11C16.4477 11 16 10.5523 16 10C16 9.44772 16.4477 9 17 9C17.5522 9 18 9.44772 18 10Z" fill="white" />
        <path d="M7.99995 10C7.99995 10.5523 7.55224 11 6.99995 11C6.44767 11 5.99995 10.5523 5.99995 10C5.99995 9.44772 6.44767 9 6.99995 9C7.55224 9 7.99995 9.44772 7.99995 10Z" fill="white" />
    </g>
    <defs>
        <clipPath id="clip0_9130_59218">
            <rect width="24" height="24" fill="white" />
        </clipPath>
    </defs>
</svg>
