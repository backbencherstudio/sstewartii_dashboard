import EmptyState from "@/components/reusable/EmptyState";
import { VendorsByStatus } from "@/types/dashboard.types";
import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  vendorsByStatus: VendorsByStatus | undefined;
}

const STATUS_CONFIG = [
  { key: "pending", name: "Pending", color: "#f59e0b" },
  { key: "verified", name: "Verified", color: "#a3ff71" },
  { key: "expired", name: "Expired", color: "#38bdf8" },
  { key: "suspended", name: "Suspended", color: "#fb7185" },
  { key: "rejected", name: "Rejected", color: "#8fa3c1" },
] as const;

const StatusTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;

    return (
      <div className="bg-white border border-[#f1f5f9] rounded-xl p-3 shadow-[0_4px_16px_rgba(0,0,0,0.10)]">
        <div className="flex items-center gap-2 mb-2">
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "2px",
              backgroundColor: item.color,
            }}
          />
          <span className="text-[#64748b] text-sm">{item.name}</span>
        </div>

        <p className="text-[#1e293b] text-base font-bold m-0">
          {item.value}{" "}
          <span style={{ color: "#94a3b8", fontSize: "12px", fontWeight: 400 }}>
            ({item.percent}%)
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const VendorsStatusChart = ({ vendorsByStatus }: Props) => {
    
  const chartData = useMemo(() => {
    if (!vendorsByStatus) return [];

    const total =
      vendorsByStatus.pending +
      vendorsByStatus.verified +
      vendorsByStatus.expired +
      vendorsByStatus.suspended +
      vendorsByStatus.rejected;

    return STATUS_CONFIG.map((item) => {
      const value = vendorsByStatus[item.key];

      return {
        name: item.name,
        value,
        color: item.color,
        percent: total ? Math.round((value / total) * 100) : 0,
      };
    });
  }, [vendorsByStatus]);

  const totalVendors = useMemo(() => {
    if (!vendorsByStatus) return 0;
    return vendorsByStatus.total ?? 0;
  }, [vendorsByStatus]);

  return (
    <div className="w-full max-w-[416px]">
      <div className="bg-white md:p-6 p-4 rounded-2xl shadow-[0_2px_20px_0_rgba(0,0,0,0.10)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="section-title">Vendors by status</h3>

          <select
            style={{
              border: "1px solid #eee",
              borderRadius: "8px",
              padding: "4px 8px",
            }}
          >
            <option>This year</option>
          </select>
        </div>

        {chartData.length > 0 ? (
          <>
            <div className="w-full h-[180px] relative overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip content={<StatusTooltip />} />

                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius={110}
                    outerRadius={170}
                    paddingAngle={2}
                    cornerRadius={8}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Text */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center">
                <p className="text-[#64748b] text-sm">Total Vendors</p>
                <h2 style={{ margin: 0, fontSize: "28px", color: "#1e293b" }}>
                  {totalVendors}
                </h2>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 border-t border-[#f1f5f9] pt-3">
              {chartData.map((item) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between py-[4px]"
                >
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "3px",
                        backgroundColor: item.color,
                        flexShrink: 0,
                      }}
                    />
                    <span className="text-[#64748b] text-sm">
                      {item.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[#94a3b8] text-xs">
                      {item.percent}%
                    </span>
                    <span className="text-[#1e293b] text-sm font-bold w-6 text-right">
                      {item.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState
            imageSrc="/images/empty-data/vendor-status.png"
            title="No reports to show"
            description="Vendor reports will appear here."
          />
        )}
      </div>
    </div>
  );
};

export default VendorsStatusChart;