import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Pending', value: 23, color: '#f59e0b' },
  { name: 'Verified', value: 12, color: '#a3ff71' },
  { name: 'Expired', value: 30, color: '#38bdf8' },
  { name: 'Suspended', value: 14, color: '#fb7185' },
  { name: 'Rejected', value: 10, color: '#8fa3c1' },
];

const VendorsStatusChart = () => {
  return (
   <div className='w-full max-w-[416px] h-[414px]  '>
     <div className='bg-white md:p-6 p-4 rounded-2xl shadow-[0_2px_20px_0_rgba(0,0,0,0.10)]'>
      <div className='flex items-center justify-between mb-4'>
        <h3 className="section-title">Vendors by status</h3>
        <select style={{ border: '1px solid #eee', borderRadius: '8px', padding: '4px 8px' }}>
          <option>This year</option>
        </select>
      </div>

      <div className='w-full h-[180px] relative '>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
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
      <div className='mt-3'>
        {data.map((item) => (
          <div key={item.name} className='flex items-center justify-between  py-[3px]'>
            <div className='flex items-center gap-2'>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color }} />
              <span className='text-[#64748b] text-sm'>{item.name}</span>
            </div>
            <span className='text-[#1e293b] text-sm font-bold'>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default VendorsStatusChart;