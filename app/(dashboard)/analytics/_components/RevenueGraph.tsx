"use client";

import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'JAN', value: 2400 },
  { name: 'FEB', value: 3200 },
  { name: 'MAR', value: 2000 },
  { name: 'APR', value: 2800 },
  { name: 'MAY', value: 4000 },
  { name: 'JUN', value: 3000 },
  { name: 'JUL', value: 3500 },
  { name: 'AUG', value: 2800 },
  { name: 'SEP', value: 3200 },
  { name: 'OCT', value: 2500 },
  { name: 'NOV', value: 2200 },
  { name: 'DEC', value: 3500 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-8 rounded-3xl border border-[#ECEFF3] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="section-title ">Revenue Graph</h2>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-[#1A1A2E]">$12.7k</span>
            <span className="text-green-500 text-sm font-semibold flex items-center">
              ▲ 1.3% <span className="text-[#697586] font-normal ml-1">VS LAST YEAR</span>
            </span>
          </div>
        </div>
        {/* Toggle buttons */}
        <div className="bg-gray-50 p-1 rounded-xl flex gap-1">
          {['Daily', 'Weekly', 'Annually'].map((tab) => (
            <button 
              key={tab}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                tab === 'Annually' ? 'bg-[#F59E0B] text-white shadow-sm' : 'text-[#697586]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3AC2C2" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3AC2C2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#697586'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#697586'}} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#3AC2C2" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Custom Tooltip to match your design
function CustomTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1A1A2E] text-white p-3 rounded-lg text-xs shadow-xl">
        <p className="font-bold">1,348 sales</p>
        <p className="text-gray-300">${payload[0].value}</p>
      </div>
    );
  }
  return null;
}