"use client";

import { ReusableTabs } from "@/components/reusable/CustomTabs";
import { LeaderboardItem, Leaderboard as LeaderboardType } from "@/types/analytics.types";
import Image from "next/image";
import React, { useMemo, useState } from "react";

export default function Leaderboard({ leaderboard }: { leaderboard: LeaderboardType | undefined }) {
  const [selectedTab, setSelectedTab] = useState("customers");

  return (
    <div className="w-full flex-col gap-4 self-stretch rounded-[10px] border border-solid border-[#ECEFF3] bg-white shadow-[0_0_16px_0_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between p-6">
        <div>
          <h3 className="section-title text-lg font-bold text-gray-900">Leaderboard</h3>
        </div>

        <button className="flex h-[46px] items-center gap-2 rounded-xl bg-white px-4 font-medium text-[#202332] shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
          <select className="bg-transparent outline-none cursor-pointer">
            <option value="this year">This year</option>
            <option value="last year">Last year</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
        </button>
      </div>

      {/* Tabs */}
      <div>
        <ReusableTabs
          defaultValue="customers"
          tabs={[
            { label: "Customers", value: "customers" },
            { label: "Vendors", value: "vendors" },
          ]}
          onValueChange={(value) => setSelectedTab(value)}
        />

        <div className="p-6">
          {selectedTab === "customers" && (
            <TopPerformersCard winnersList={leaderboard?.customers || []} />
          )}

          {selectedTab === "vendors" && (
            <TopPerformersCard winnersList={leaderboard?.vendors || []} />
          )}
        </div>
      </div>
    </div>
  );
}

// Visual Podium Rank Mapping Config
const PODIUM_CONFIG: Record<
  number,
  {
    borderBg: string;
    badgeBg: string;
    avatarSize: string;
    boxSize: string;
    boxBg: string;
    textColor: string;
  }
> = {
  1: {
    borderBg: "border-[#39C5C3]",
    badgeBg: "bg-[#F6A316]",
    avatarSize: "h-[100px] w-[100px]",
    boxSize: "h-[135px] w-[80px]",
    boxBg: "bg-[#FFDEA0]",
    textColor: "text-[#744C12]",
  },
  2: {
    borderBg: "border-[#43C6C6]",
    badgeBg: "bg-[#43C6C6]",
    avatarSize: "h-[80px] w-[80px]",
    boxSize: "h-[106px] w-[70px]",
    boxBg: "bg-[#FFDEA0]",
    textColor: "text-[#744C12]",
  },
  3: {
    borderBg: "border-[#9DB4CC]",
    badgeBg: "bg-[#9DB4CC]",
    avatarSize: "h-[80px] w-[80px]",
    boxSize: "h-[106px] w-[70px]",
    boxBg: "bg-[#FFDEA0]",
    textColor: "text-[#744C12]",
  },
};

function TopPerformersCard({ winnersList }: { winnersList: LeaderboardItem[] }) {
  // Re-order the items so index 0 = 2nd Place, index 1 = 1st Place, index 2 = 3rd Place
  const orderedWinners = useMemo(() => {
    if (!winnersList || winnersList.length === 0) return [];

    const first = winnersList[0] ? { ...winnersList[0], rank: 1 } : null;
    const second = winnersList[1] ? { ...winnersList[1], rank: 2 } : null;
    const third = winnersList[2] ? { ...winnersList[2], rank: 3 } : null;

    // Arranging visually for standard podium layout: [Rank 2, Rank 1, Rank 3]
    return [second, first, third].filter(Boolean) as (LeaderboardItem & { rank: number })[];
  }, [winnersList]);

  if (winnersList.length === 0) {
    return (
      <div className="flex h-[340px] items-center justify-center rounded-[10px] bg-[#FFF8E8] text-sm text-[#667085]">
        No leaderboard data available.
      </div>
    );
  }

  return (
    <div className="h-[340px] overflow-hidden rounded-[10px] bg-[#FFF8E8] px-6">
      <div className="grid h-full grid-cols-3 items-end gap-6 overflow-hidden pb-4">
        {orderedWinners.map((item) => {
          const config = PODIUM_CONFIG[item.rank] || PODIUM_CONFIG[2];
          const avatarUrl =
            (item as any).avatar ||
            (item as any).image ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(item.name)}`;

          return (
            <div key={item.id || item.rank} className="flex flex-col items-center">
              {/* Polygon Avatar */}
              <div className="relative">
                <div
                  className={`rotate-28 overflow-hidden border-2 bg-white shadow-sm [clip-path:polygon(25%_5%,75%_5%,100%_50%,75%_95%,25%_95%,0_50%)] ${config.borderBg} ${config.avatarSize}`}
                >
                  <Image
                    src={avatarUrl}
                    alt={item.name}
                    fill
                    className="-rotate-28 object-cover"
                    unoptimized
                  />
                </div>

                {/* Rank Badge */}
                <div
                  className={`absolute -bottom-2 left-1/2 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full text-xs font-bold text-[#263244] ${config.badgeBg}`}
                >
                  {item.rank}
                </div>
              </div>

              {/* Name */}
              <h3 className="mt-4 line-clamp-1 text-center text-sm font-medium text-[#667085]">
                {item.name}
              </h3>

              {/* Value / Score Box */}
              <div
                className={`mt-3 flex flex-col items-center justify-center rounded-t-[13px] px-2 ${config.boxBg} ${config.boxSize}`}
              >
                <p className={`m-0 text-center text-base font-bold ${config.textColor}`}>
                  {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}