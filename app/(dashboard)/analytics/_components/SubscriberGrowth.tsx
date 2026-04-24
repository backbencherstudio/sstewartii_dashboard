"use client";

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

// Mock Data matching your structure
const data = [
    { name: 'JAN', Free: 40, Starter: 20, Pro: 15, Elite: 10 },
    { name: 'FEB', Free: 70, Starter: 30, Pro: 60, Elite: 45 },
    { name: 'MAR', Free: 90, Starter: 60, Pro: 100, Elite: 50 },
    { name: 'APR', Free: 100, Starter: 110, Pro: 350, Elite: 150 },
    { name: 'MAY', Free: 120, Starter: 100, Pro: 400, Elite: 250 },
    { name: 'JUN', Free: 90, Starter: 80, Pro: 200, Elite: 120 },
    { name: 'JUL', Free: 90, Starter: 80, Pro: 200, Elite: 120 },
    { name: 'AUG', Free: 190, Starter: 80, Pro: 200, Elite: 120 },
    { name: 'SEP', Free: 90, Starter: 80, Pro: 200, Elite: 120 },
    { name: 'OCT', Free: 160, Starter: 80, Pro: 200, Elite: 120 },
    { name: 'NOV', Free: 40, Starter: 80, Pro: 200, Elite: 120 },
    { name: 'DEC', Free: 190, Starter: 80, Pro: 300, Elite: 120 },
];

export default function SubscriberGrowth() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-[#ECEFF3] shadow-sm">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="section-title">Subscriber Growth</h2>
                    <p className="text-sm text-[#697586]">New subscribers over the last 7 days</p>
                </div>
                <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm font-medium outline-none">
                    <option>This year</option>
                </select>
            </div>

            {/* Chart */}
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#697586', fontSize: 12 }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#697586', fontSize: 12 }} />
                        <Tooltip cursor={{ fill: '#F9FAFB' }} content={<CustomTooltip />} />
                        <Legend
                            iconType="circle"
                            itemSorter={null}
                            // formatter={(value) => String(value).toLowerCase()}
                        />
                        <Bar dataKey="Free" stackId="a" fill="#F4AE2B" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Starter" stackId="a" fill="#F6C553" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Pro" stackId="a" fill="#F9DD8E" radius={[0, 0, 0, 0]} />
                        <Bar dataKey="Elite" stackId="a" fill="#FCEFC9" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip bg-gray-800 text-white p-3 rounded-md shadow-md">
                <p className="label text-xs font-medium  text-white">{label}</p>
                <p className="value text-xs font-medium  text-white"> {payload[0].name}: {payload[0].value}</p>
                <p className="value text-xs font-medium  text-white"> {payload[1].name}: {payload[1].value}</p>
                <p className="value text-xs font-medium  text-white"> {payload[2].name}: {payload[2].value}</p>
                <p className="value text-xs font-medium  text-white"> {payload[3].name}: {payload[3].value}</p>
            </div>
        );
    }
    return null;
}