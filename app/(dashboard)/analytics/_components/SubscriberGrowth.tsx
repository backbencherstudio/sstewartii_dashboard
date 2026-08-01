"use client";

import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps
} from 'recharts';

// Types matching your API response
export interface PlanCount {
  planId: string;
  planCode: string;
  planName: string;
  count: number;
}

export interface SeriesItem {
  label: string;
  total: number;
  plans: PlanCount[];
}

export interface PlanLegendItem {
  planId: string;
  planCode: string;
  planName: string;
}

export interface SubscriberGrowthData {
  series: SeriesItem[];
  totalSubscribers: number;
  planLegend: PlanLegendItem[];
}

// Fallback color palette for dynamic dynamic plan bars
const PALETTE = [
  '#F4AE2B',
  '#F6C553',
  '#F9DD8E',
  '#FCEFC9',
  '#D97706',
  '#B45309'
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-800 text-white p-3 rounded-md shadow-md border border-gray-700">
        <p className="label text-xs font-semibold text-white mb-1.5">{label}</p>
        <div className="flex flex-col gap-1">
          {payload.map((item, index) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5" style={{ color: item.color }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-gray-200">{item.name}:</span>
              </span>
              <span className="font-semibold text-white">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function SubscriberGrowth({ subscribers }: { subscribers: SubscriberGrowthData | undefined }) {
  // Transform hierarchical series structure into flat Recharts data
  const chartData = useMemo(() => {
    if (!subscribers?.series) return [];

    return subscribers.series.map((item) => {
      const dataPoint: Record<string, string | number> = {
        name: item.label.toUpperCase()
      };

      item.plans.forEach((p) => {
        dataPoint[p.planName] = p.count;
      });

      return dataPoint;
    });
  }, [subscribers]);

  const legendKeys = useMemo(() => {
    if (!subscribers?.planLegend) return [];
    return subscribers.planLegend.map((item) => item.planName);
  }, [subscribers]);

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#ECEFF3] shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="section-title text-lg font-bold text-gray-900">Subscriber Growth</h2>
          <p className="text-sm text-[#697586]">
            Total Subscribers: {subscribers?.totalSubscribers ?? 0}
          </p>
        </div>
        <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm font-medium outline-none bg-white text-gray-700">
          <option>This year</option>
        </select>
      </div>

      {/* Chart Container */}
      <div className="h-[300px] w-full">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#697586', fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#697586', fontSize: 12 }}
                allowDecimals={false}
              />
              <Tooltip cursor={{ fill: '#F9FAFB' }} content={<CustomTooltip />} />
              <Legend iconType="circle" />

              {/* Dynamically render stacked bar per plan with top-corner radius on final bar */}
              {legendKeys.map((key, index) => {
                const isLast = index === legendKeys.length - 1;
                const fillColor = PALETTE[index % PALETTE.length];

                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={fillColor}
                    radius={isLast ? [6, 6, 0, 0] : [0, 0, 0, 0]}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-[#697586]">
            No subscriber data available
          </div>
        )}
      </div>
    </div>
  );
}