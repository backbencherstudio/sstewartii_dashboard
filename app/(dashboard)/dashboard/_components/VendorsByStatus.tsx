import EmptyState from '@/components/reusable/EmptyState';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    { name: 'Pending', value: 23, color: '#f59e0b' },
    { name: 'Verified', value: 12, color: '#a3ff71' },
    { name: 'Expired', value: 30, color: '#38bdf8' },
    { name: 'Suspended', value: 14, color: '#fb7185' },
    { name: 'Rejected', value: 10, color: '#8fa3c1' },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const StatusTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const item = payload[0].payload;
        return (
            <div className='bg-white border border-[#f1f5f9] rounded-xl p-3 shadow-[0_4px_16px_rgba(0,0,0,0.10)]'>
                <div className='flex items-center gap-2 mb-2'>
                    <div style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: item.color }} />
                    <span className='text-[#64748b] text-sm'>{item.name}</span>
                </div>
                <p className='text-[#1e293b] text-base font-bold m-0'>
                    {item.value}{' '}
                    <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: 400 }}>
                        ({Math.round((item.value / total) * 100)}%)
                    </span>
                </p>
            </div>
        );
    }
    return null;
};

const VendorsStatusChart = () => {
    return (
        <div className='w-full max-w-[416px]'>
            <div className='bg-white md:p-6 p-4 rounded-2xl shadow-[0_2px_20px_0_rgba(0,0,0,0.10)]'>
                <div className='flex items-center justify-between mb-4'>
                    <h3 className="section-title">Vendors by status</h3>
                    <select style={{ border: '1px solid #eee', borderRadius: '8px', padding: '4px 8px' }}>
                        <option>This year</option>
                    </select>
                </div>

                {
                    data.length < 0 ? (

                        <>
                            <div className='w-full h-[180px] relative overflow-hidden'>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Tooltip content={<StatusTooltip />} />
                                        <Pie
                                            data={data}
                                            cx="50%"
                                            cy="100%" // Anchors the semi-circle to the bottom
                                            startAngle={180}
                                            endAngle={0}
                                            innerRadius={110}
                                            outerRadius={170}
                                            paddingAngle={2}
                                            cornerRadius={8} // Gives those soft rounded ends
                                            dataKey="value"
                                        >
                                            {data.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                {/* Centered Text Overlay */}
                                <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 text-center' style={{

                                }}>
                                    <p className='text-[#64748b] text-sm'>Total Vendors</p>
                                    <h2 style={{ margin: 0, fontSize: '28px', color: '#1e293b' }}>1280</h2>
                                </div>
                            </div>


                            {/* Custom Legend */}
                            <div className='mt-4 border-t border-[#f1f5f9] pt-3'>
                                {data.map((item) => (
                                    <div key={item.name} className='flex items-center justify-between py-[4px]'>
                                        <div className='flex items-center gap-2'>
                                            <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color, flexShrink: 0 }} />
                                            <span className='text-[#64748b] text-sm'>{item.name}</span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-[#94a3b8] text-xs'>{Math.round((item.value / total) * 100)}%</span>
                                            <span className='text-[#1e293b] text-sm font-bold w-6 text-right'>{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div></>

                    ) : (
                        <EmptyState imageSrc="/images/empty-data/vendor-status.png" title="No reports to show" description="Vendor reports will appear in here." />
                    )
                }



            </div>
        </div>
    );
};

export default VendorsStatusChart;