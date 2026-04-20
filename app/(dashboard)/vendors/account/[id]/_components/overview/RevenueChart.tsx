"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown } from 'lucide-react';

const data = [
  { day: '1', revenue: 700 }, { day: '3', revenue: 700 }, { day: '5', revenue: 1300 },
  { day: '7', revenue: 1400 }, { day: '9', revenue: 1250 }, { day: '11', revenue: 1150 },
  { day: '13', revenue: 1200 }, { day: '15', revenue: 1450 }, { day: '17', revenue: 1800 },
  { day: '19', revenue: 2500 }, { day: '21', revenue: 2300 }, { day: '23', revenue: 1300 },
  { day: '25', revenue: 950 }, { day: '27', revenue: 1000 }, { day: '29', revenue: 1300 },
  { day: '31', revenue: 1400 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#3AC2C2] text-white p-2 rounded-lg text-xs font-semibold shadow-lg">
        ${payload[0].value}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  return (
    <div className="w-full max-w-7xl p-5 bg-white/60 rounded-3xl border border-gray-100 shadow-sm font-sans flex flex-col items-center h-[343px]">
      
      {/* 1. Header with Dropdown */}
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="section-title">
          Revenue <span className="font-medium text-slate-500 text-base">(Jan, 2026)</span>
        </h2>
        <select className='text-sm text-orange-500'>
            <option value="this month ">This month</option>
            <option value="last month">Last month</option>
            <option value="this year">This year</option>
            <option value="last year">Last year</option>
        </select>
      </div>

      {/* 2. Recharts Area Chart */}
      <div className="h-[343px] w-full -ml-8"> {/* Negative margin to align chart with header */}
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top:10, right: -20, left: 0, bottom: 0 }}>
            {/* Gradient definition for fill */}
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF5500" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#FF5500" stopOpacity={0.01} />
              </linearGradient>
            </defs>

            {/* Grid & Axes */}
            <CartesianGrid vertical={false} stroke="#ECEFF3" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 12, fill: '#697586' }} 
              axisLine={false} 
              tickLine={false} 
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#697586' }} 
              axisLine={false} 
              tickLine={false} 
              interval={0}
              domain={[0, 3000]}
              ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]}
            />
            
            {/* Tooltip & Area */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#F59E0B', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#FF5500"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            //   dot={{ r: 4, fill: "#FEA120", stroke: "#FEA120" }} 
              activeDot={{ r: 5, fill: "#FF5500", stroke: "#FF5500" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}