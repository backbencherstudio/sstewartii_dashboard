
"use client"
import { ReusableTabs } from '@/components/reusable/CustomTabs';
import React, { useState } from 'react'

export default function Leaderboard() {

    const [selectedTab, setSelectedTab] = useState('customers');
    return (
        <div className='w-[455px] flex-col gap-4 self-stretch border border-[#ECEFF3] [background:var(--text-0,#FFF)] shadow-[0_0_16px_0_rgba(0,0,0,0.06)]   rounded-[10px] border-solid'>
            <div className="mb-4 flex items-center justify-between p-6">
                <div>
                    <h3 className="section-title">
                        Leaderboard
                    </h3>
                </div>

                <button className="flex h-[46px] items-center gap-2 rounded-xl bg-white px-4  font-medium text-[#202332] shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
                    <select>
                        <option value="this year">This year</option>
                        <option value="last year">Last year</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                    </select>
                    {/* <ChevronDown className="h-4 w-4" /> */}
                </button>
            </div>
            {/* tabs */}
            <div>
                <ReusableTabs
                    defaultValue={"customers"}
                    tabs={[
                        { label: 'Customers', value: 'customers' },
                        { label: 'Vendors', value: 'vendors' },
                       
                    ]}
                    onValueChange={(value) => {
                        setSelectedTab(value);
                        console.log(value);
                    }}
                />

                {
                    selectedTab === 'customers' && (
                        <div>
                        <TopPerformersCard />
                    </div>
                )}
                    

                    {
                        selectedTab === 'vendors' && (
                            <div>
                                <h3>Vendors</h3>
                            </div>
                        )
                    }
            </div>
        </div>
    )
}


import Image from "next/image";

const winners = [
  {
    rank: 2,
    name: "Marie Kom",
    orders: "8,4321",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    size: "small",
  },
  {
    rank: 1,
    name: "Ava Adam",
    orders: "12,7788",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    size: "large",
  },
  {
    rank: 3,
    name: "Justin Hopper",
    orders: "5,1632",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    size: "small",
  },
];

function TopPerformersCard() {
  return (
    <div className="object-cover overflow-hidden  bg-[#FFF8E8] px-6   h-[340px]">


      <div className="grid grid-cols-3 items-end gap-6 h-full overflow-hidden">
        {winners.map((item) => {
          const isFirst = item.rank === 1;

          return (
            <div
              key={item.rank}
              className={`flex flex-col items-center ${
                isFirst ? "pb-0" : "pb-0"
              }`}
            >
              {/* Avatar */}
              <div className="relative ">
                <div
                  className={`rotate-28  overflow-hidden border-2 border-[#39C5C3] bg-white shadow-sm [clip-path:polygon(25%_5%,75%_5%,100%_50%,75%_95%,25%_95%,0_50%)]  ${
                    isFirst ? "h-[100px] w-[100px]" : "h-[80px] w-[80px]"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover -rotate-28"
                  />
                </div>

                {/* Rank badge */}
                <div
                  className={`absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full text-[#263244] text-sm font-bold font-lora ${
                    isFirst
                      ? "-bottom-2 h-5 w-5 bg-[#F6A316] "
                      : "-bottom-3 h-5 w-5 bg-[#43C6C6] "
                  } ${item.rank === 3 ? "bg-[#9DB4CC]" : ""}`}
                >
                  {item.rank}
                </div>
              </div>

              {/* Name */}
              <h3
                className={`mt-4 text-center font-medium text-[#667085] text-sm `}
              >
                {item.name}
              </h3>

              {/* Score Box */}
              <div
                className={`mt-4 flex flex-col items-center justify-center rounded-t-[13px]  bg-[#FFDEA0] px-6 ${
                  isFirst ? "h-[135px] w-[80px]" : "h-[106px] w-[70px]"
                }`}
              >
                <p className="m-0 text-lg font-bold font-lora text-[#744C12]">
                  {item.orders}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}