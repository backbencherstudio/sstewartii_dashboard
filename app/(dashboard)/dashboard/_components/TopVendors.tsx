import EmptyState from '@/components/reusable/EmptyState';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

const salesData = [
  { name: 'Jane Cooper', value: 98450, color: '#31C48D' },
  { name: 'Esther Howard', value: 42300, color: '#8fa3c1' },
  { name: 'Leslie Alexander', value: 28700, color: '#8fa3c1' },
  { name: 'Guy Hawkins', value: 15200, color: '#8fa3c1' },
  { name: 'Robert Fox', value: 8900, color: '#8fa3c1' },
];

const revenueData = [
  { name: 'Jane Cooper', value: 121799, color: '#31C48D' },
  { name: 'Esther Howard', value: 50799, color: '#8fa3c1' },
  { name: 'Leslie Alexander', value: 25567, color: '#8fa3c1' },
  { name: 'Guy Hawkins', value: 5789, color: '#8fa3c1' },
  { name: 'Robert Fox', value: 1789, color: '#8fa3c1' },
];

export default function TopVendors() {
  const [activeTab, setActiveTab] = useState('revenue');
  const currentData = activeTab === 'sales' ? salesData : revenueData;

  // Calculate max for the scale at the bottom
  const domainMax = 150000;

  return (
    <div className="w-full h-full p-6 bg-white rounded-3xl border border-gray-100 shadow-sm font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h3 className="section-title">Top 5 Vendors</h3>
        <div className="flex bg-gray-100 p-1 rounded-xl gap-1">
          <button
            onClick={() => setActiveTab('sales')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'sales' ? 'bg-[#FFBB1C] text-black shadow-sm' : 'text-gray-500'
              }`}
          >
            By Sales
          </button>
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'revenue' ? 'bg-[#FFBB1C] text-black shadow-sm' : 'text-gray-500'
              }`}
          >
            By Revenue
          </button>
        </div>
      </div>

      {/* Rows Construction */}
      {
        currentData.length > 0 ? (
          <>

            <div className="space-y-6 mb-2">
              {currentData.map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  {/* Label Row */}
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium text-slate-500">{item.name}</span>
                    <span className={`font-medium ${index === 0 ? 'text-[#31C48D]' : 'text-slate-500'}`}>
                      {
                        activeTab === 'sales' ? `${item.value.toLocaleString()} orders` : `$${item.value.toLocaleString()}`
                      }
                    </span>
                  </div>

                  {/* Bar Row - Fixed height container for each bar */}
                  <div className="h-4 w-full ">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[item]} // Each bar is its own chart for perfect alignment
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                      >
                        <XAxis type="number" domain={[0, domainMax]} hide />
                        <YAxis type="category" dataKey="name" hide />
                        <Bar
                          dataKey="value"
                          radius={[10, 10, 10, 10]}
                          background={{ fill: '#F1F5F9', radius: 10 }}
                          barSize={16}
                        >
                          <Cell fill={item.color} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ))}
            </div>

            {/* Common X-Axis Labels at the bottom */}
            <div className="flex justify-between px-1 mt-4 text-[11px] text-slate-400 font-medium border-t pt-4">
              <span>0</span>
              <span>25k</span>
              <span>50k</span>
              <span>75k</span>
              <span>150k</span>
            </div>
          </>


        ) : (
          <EmptyState imageSrc="/images/empty-data/top-vendors.png" title="No reports to show" description="Vendor reports will appear in here." />
        )
      }


    </div>
  );
}