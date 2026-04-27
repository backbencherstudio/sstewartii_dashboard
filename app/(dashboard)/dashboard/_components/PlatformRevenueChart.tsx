import { ReusableSelect } from '@/components/form/CustomSelect';
import EmptyState from '@/components/reusable/EmptyState';
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, Tooltip, Legend } from 'recharts';

const data = [
    { name: 'Jan', revenue: 1000 },
    { name: 'Fev', revenue: 1200 },
    { name: 'Mar', revenue: 700 },
    { name: 'Apr', revenue: 900 },
    { name: 'May', revenue: 500 },
    { name: 'June', revenue: 900 },
];

const RevenueTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: '#fff',
                border: '1px solid #f1f5f9',
                borderRadius: '10px',
                padding: '10px 14px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
            }}>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>{label}</p>
                <p style={{ color: '#1e293b', fontSize: '15px', fontWeight: 700 }}>
                    ${payload[0].value.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

// Custom shape function to draw only the top border
const CustomBar = (props: any) => {
    const { x, y, width, height } = props;



    return (
        <g>
            {/* The main rectangle with the gradient fill */}
            <rect x={x} y={y} width={width} height={height} fill="url(#barGradient)" />

            {/* The thick top line only */}
            <line
                x1={x}
                y1={y}
                x2={x + width}
                y2={y}
                stroke="#fdbd5e"
                strokeWidth={4}
                strokeLinecap="round"
            />
        </g>
    );
};

const PlatformRevenueChart = () => {
    const [selectedOption, setSelectedOption] = useState("this-year");
    return (
        <div>
            <div className="w-full h-[445px] bg-white md:p-6 p-4 rounded-2xl shadow-[0_2px_20px_0_rgba(0,0,0,0.10)]">
                <div className='md:mb-6 mb-4 flex items-center justify-between '>
                    <h2 className='section-title'>Platform Revenue</h2>

                    <ReusableSelect
                        variant="small"

                        value={selectedOption}
                        options={[{ label: "This Year", value: "this-year" }, { label: "This Month", value: "monthly" }]}
                        onValueChange={(value) => setSelectedOption(value)}
                    />
                </div>


                {
                    data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="90%">
                            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 16 }}>
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#fdbd5e" stopOpacity={0.4} />
                                        <stop offset="100%" stopColor="#fdbd5e" stopOpacity={0} />
                                    </linearGradient>
                                </defs>

                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#999', fontSize: 12 }}
                                />

                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#999', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}`}
                                />

                                <Tooltip
                                    content={<RevenueTooltip />}
                                    cursor={{ fill: 'rgba(253,189,94,0.08)' }}
                                />

                                <Legend
                                    verticalAlign="bottom"
                                    iconType="square"
                                    iconSize={12}
                                    wrapperStyle={{ paddingTop: '12px' }}
                                    formatter={(value) => (
                                        <span style={{ color: '#64748b', fontSize: '13px' }}>{value}</span>
                                    )}
                                />

                                <Bar
                                    dataKey="revenue"
                                    name="Revenue"
                                    shape={<CustomBar />}
                                >
                                    <LabelList
                                        dataKey="revenue"
                                        position="top"
                                        offset={-30}
                                        formatter={(val) => `$${val?.toLocaleString()}`}
                                        style={{ fill: '#b8860b', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <EmptyState imageSrc="/images/empty-data/platform-revenue.png" title="No data available" description="Please try again later" />
                    )
                }

            </div>
        </div>
    );
};

export default PlatformRevenueChart;