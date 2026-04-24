"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { month: "Jan", Vendor: 0.35, Customer: 2.85 },
  { month: "Feb", Vendor: 1.8, Customer: 3.0 },
  { month: "Mar", Vendor: 1.45, Customer: 2.98 },
  { month: "Apr", Vendor: 1.35, Customer: 3.18 },
  { month: "May", Vendor: 0.6, Customer: 2.85 },
  { month: "Jun", Vendor: 0.25, Customer: 1.3 },
  { month: "Jul", Vendor: 0.95, Customer: 2.85 },
  { month: "Aug", Vendor: 0.7, Customer: 1.9 },
  { month: "Sep", Vendor: 2.05, Customer: 4.0 },
  { month: "Oct", Vendor: 1.0, Customer: 2.4 },
  { month: "Nov", Vendor: 0.7, Customer: 1.85 },
  { month: "Dec", Vendor: 0.7, Customer: 1.9 },
];

function CustomTooltip({ active, payload }: TooltipProps<number, string> & { payload: { dataKey: string; value: number; color: string }[] }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-2xl bg-[#667085] px-4 py-3 shadow-lg">
      {payload.map((item: any) => (
        <div key={item.dataKey} className="flex items-center gap-2 text-sm text-white">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span>{Number(item.value).toFixed(1)}M</span>
        </div>
      ))}
    </div>
  );
}

export default function PlatformGrowthChart() {
  return (
    <div className="w-full rounded-[24px] border border-[#E9EEF5] bg-white px-8 py-7 shadow-sm">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="section-title">
            Platform Growth
          </h3>

          <div className="mt-5 flex items-center gap-3 text-lg text-[#667085]">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#3FC4C6]" />
              <span className="text-[#344054]">Vendor</span>
            </div>

            <span>vs</span>

            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-[#F6A316]" />
              <span>Customer</span>
            </div>

            <span>Registrations</span>
          </div>
        </div>

        <button className="flex h-[46px] items-center gap-2 rounded-xl bg-white px-5 text-base font-medium text-[#202332] shadow-[0_8px_24px_rgba(16,24,40,0.08)]">
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

      {/* Chart */}
      <div className="h-[330px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={18}
            barGap={8}
            margin={{ top: 18, right: 8, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#E5E7F0"
              strokeDasharray="6 8"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={14}
              tick={{ fill: "#A3A3A3", fontSize: 16 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={12}
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tickFormatter={(value) => (value === 0 ? "0" : `${value}k`)}
              tick={{ fill: "#5F6392", fontSize: 18 }}
            />

            <Tooltip
              content={<CustomTooltip payload={[]} />}
              cursor={{
                fill: "rgba(250, 244, 230, 0.7)",
                radius: 16,
              }}
            />

            <Bar
              dataKey="Customer"
              fill="#F6A316"
              radius={[999, 999, 0, 0]}
            />

            <Bar
              dataKey="Vendor"
              fill="#3FC4C6"
              radius={[999, 999, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}