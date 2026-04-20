"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { day: '1', New: 60, Repeated: 20 },
  { day: '5', New: 80, Repeated: 12 },
  { day: '10', New: 40, Repeated: 35 },
  { day: '15', New: 50, Repeated: 15 },
  { day: '20', New: 95, Repeated: 30 },
  { day: '25', New: 60, Repeated: 32 },
  { day: '31', New: 65, Repeated: 30 },
];

export default function CustomerEngagementChart() {
  return (
    <div className="w-full h-[360px] px-5 py-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
      <h3 className="section-title mb-4">Customer Engagement</h3>
      
      <ResponsiveContainer width="100%" height="80%">
        <BarChart data={data} barGap={8} barSize={20}>
          <CartesianGrid vertical={false} stroke="#F3F4F6" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#697586'}} />
          <YAxis axisLine={false} tickLine={false} tick={{fill: '#697586'}} />
          <Tooltip cursor={{fill: 'transparent'}} />
          <Legend iconType="circle" wrapperStyle={{ top: -10, right: 10 }} />
          
          <Bar dataKey="New" fill="#F59E0B" radius={[100, 100, 0, 0]} />
          <Bar dataKey="Repeated" fill="#3AC2C2" radius={[100, 100, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Repeat Rate Badge */}
      <div className="px-4 py-3 bg-[#F0FDFB] rounded-full flex items-center gap-2 -mt-4">
        <div className="w-6 h-6 rounded-full bg-[#3AC2C2]/20 flex items-center justify-center">
            <span className="text-[#3AC2C2] text-xs">↻</span>
        </div>
        <p className="text-sm font-semibold text-[#1A1A2E]">Repeat Rate: <span className="text-[#3AC2C2]">38%</span></p>
      </div>
    </div>
  );
}