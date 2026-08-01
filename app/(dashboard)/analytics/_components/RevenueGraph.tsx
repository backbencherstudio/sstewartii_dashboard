"use client";

import { RevenueGrowth } from '@/types/analytics.types';
import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

export default function RevenueChart({ revenue }: { revenue: RevenueGrowth | undefined }) {
  const [activeTab, setActiveTab] = useState<'Daily' | 'Weekly' | 'Annually'>('Annually');

  // Fallback to static mock data if `revenue` prop or `revenue.series` is missing
  const chartData = revenue?.series?.length 
    ? revenue.series.map(item => ({
        name: item.label.toUpperCase(),
        value: item.value
      }))
    : [
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

  // Helper function to format currency dynamically
  const formatCurrency = (amount: number, currencyCode = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const totalDisplay = revenue?.total !== undefined 
    ? formatCurrency(revenue.total, revenue.currency)
    : '$12.7k';

  return (
    <div className="bg-white p-8 rounded-3xl border border-[#ECEFF3] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="section-title">Revenue Graph</h2>
          
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-[#1A1A2E]">{totalDisplay}</span>
            <span className="text-green-500 text-sm font-semibold flex items-center">
              ▲ 1.3% <span className="text-[#697586] font-normal ml-1">VS LAST YEAR</span>
            </span>
          </div>
        </div>

        {/* Toggle buttons */}
        <div className="hidden sm:flex bg-gray-50 p-1 rounded-xl gap-1">
          {/* ['Daily', 'Weekly', 'Annually']  */}
          {(['Annually'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab ? 'bg-[#F59E0B] text-white shadow-sm' : 'text-[#697586] hover:text-[#1A1A2E]'
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
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3AC2C2" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3AC2C2" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#697586'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#697586'}} />
            <Tooltip content={<CustomTooltip currency={revenue?.currency || 'USD'} />} />
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

// Custom Tooltip updated to accept dynamic currency
function CustomTooltip({ active, payload, label, currency }: any) {
  if (active && payload && payload.length) {
    const formattedVal = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(payload[0].value);

    return (
      <div className="bg-[#1A1A2E] text-white p-3 rounded-lg text-xs shadow-xl">
        <p className="font-bold text-gray-300 mb-1">{label}</p>
        <p className="text-sm font-semibold">{formattedVal}</p>
      </div>
    );
  }
  return null;
}