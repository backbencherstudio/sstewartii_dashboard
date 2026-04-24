"use client";
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { day: '1', views: 400 }, { day: '5', views: 800 }, { day: '8', views: 600 },
  { day: '12', views: 750 }, { day: '15', views: 1100 }, { day: '20', views: 600 },
  { day: '25', views: 1200 }, { day: '31', views: 500 },
];
const months = ["Jan", "Feb", "March", "Apr", "May"];
export default function ProfileViewsChart() {
  return (
    <DashboardCard title="Profile views">
    {/* Central Stats */}
    <div className="text-center mb-4">
      <h1 className="text-[40px] font-bold text-[#1A1A2E]">756</h1>
      <p className="text-emerald-500  text-sm">▲ <span className='text-[#697586]'>23% from last month</span>
      </p>
    </div>

    {/* Chart Area would go here */}
    <div className="h-[200px] mb-6">

    <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#ECEFF3" />
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#697586' }} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#697586' }} 
          />
          <Area 
            type="monotone" 
            dataKey="views" 
            stroke="#F59E0B" 
            strokeWidth={2} 
            fillOpacity={1} 
            fill="url(#colorViews)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Bottom Month Selector */}
    <div className="flex justify-between items-center px-4 ">
      {months.map((m) => (
        <button 
          key={m} 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            m === "March" ? "bg-[#3AC2C2] text-white" : "text-[#697586] hover:text-gray-900"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  </DashboardCard>
  );
}


import { ChevronDown } from "lucide-react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function DashboardCard({ title, subtitle, children }: DashboardCardProps) {
  return (
    <div className="bg-white px-5 py-6 rounded-3xl border border-[#ECEFF3] shadow-sm w-full ">
      <div className="flex justify-between items-center -mb-4">
        <h2 className="section-title">
          {title} <span className="text-sm font-medium text-[#697586]">{subtitle}</span>
        </h2>
        
        {/* Custom Select Option */}
        <div className="flex items-center gap-1.5 text-sm font-medium text-[#F59E0B] cursor-pointer hover:opacity-80">
          This month <ChevronDown className="w-4 h-4" />
        </div>
      </div>
      {children}
    </div>
  );
}


