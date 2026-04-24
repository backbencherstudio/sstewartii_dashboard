"use client";

import React from 'react';
import { User, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import OtherIcons from '@/components/icons/OtherIcons';

interface CustomerData {
  name: string;
  id: string;
  avatarUrl: string;
  totalOrders: number;
  totalSpent: number;
  info: {
    fullName: string;
    email: string;
    dob: string;
    city: string;
    phone: string;
  };
  orderInfo: {
    lastOrdered: string;
    completed: number;
    cancelled: number;
    incomplete: number;
    reports: number;
  };
}

export default function CustomerProfileDetails({ customer }: { customer: CustomerData }) {
  return (
    <div className="bg-white rounded-3xl border border-[#ECEFF3] shadow-sm flex flex-col lg:flex-row items-stretch overflow-hidden">
      
      {/* Left Section: Profile Summary (Fixed width on desktop, full on mobile) */}
      <div className="flex flex-col items-center w-full lg:w-[280px] border-b lg:border-b-0 lg:border-r border-gray-100 p-4">
        <div className="relative w-[150px] h-[150px] mb-3">
          <Image
            src={customer.avatarUrl}
            alt={customer.name}
            fill
            className="rounded-full object-cover border-4 border-gray-50"
          />
        </div>
        <h2 className="text-[#2A3542] font-lora text-lg font-bold leading-[130%] mb-1">{customer.name}</h2>
        <p className="text-[#697586] text-base font-normal leading-[130%] mb-4">ID: #{customer.id}</p>

        <div className="flex w-full justify-center gap-6 border-t border-gray-100 pt-6">
          <div className="text-center">
            <p className="text-[#2A3542] font-lora text-2xl font-bold">{customer.totalOrders}</p>
            <p className="text-[#697586] text-sm font-medium">Total Orders</p>
          </div>
          <div className="w-px bg-gray-100 h-10" />
          <div className="text-center">
            <p className="text-[#2A3542] font-lora text-2xl font-bold">${customer.totalSpent.toLocaleString()}</p>
            <p className="text-[#697586] text-sm font-medium">Total Spent</p>
          </div>
        </div>
      </div>

      {/* Right Section: Detailed Info (Grows to fill space) */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        
        {/* Customer Info Card */}
        <div className="bg-[#F8FAFC] p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-[#1A1A2E] font-bold pb-2 border-b border-[#DFE1E7]">
            <OtherIcons.User className="w-5 h-5" /> Customer Info
          </div>
          <div className="space-y-3 text-sm">
            <DetailRow label="Full Name" value={customer.info.fullName} />
            <DetailRow label="Registered Email" value={customer.info.email} />
            <DetailRow label="Date of birth" value={customer.info.dob} />
            <DetailRow label="City of residence" value={customer.info.city} />
            <DetailRow label="Phone number" value={customer.info.phone} />
          </div>
        </div>

        {/* Order Info Card */}
        <div className="bg-[#F8FAFC] p-6 rounded-2xl flex flex-col">
          <div className="flex items-center gap-2 mb-4 text-[#1A1A2E] font-bold pb-2 border-b border-[#DFE1E7]">
            <OtherIcons.FoodOrder className="w-5 h-5" /> Order Info
          </div>
          <div className="space-y-3 text-sm">
            <DetailRow label="Last Ordered" value={customer.orderInfo.lastOrdered} />
            <DetailRow label="Completed Orders" value={customer.orderInfo.completed.toString()} />
            <DetailRow label="Cancelled Order" value={customer.orderInfo.cancelled.toString()} />
            <DetailRow label="Incomplete Orders" value={customer.orderInfo.incomplete.toString()} />
            <DetailRow label="Report Filled" value={customer.orderInfo.reports.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
}
// Helper component for uniform rows
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[color:var(--Secondary-Text,#697586)] text-center [font-family:Inter] text-base font-normal leading-[160%]">{label}:</span>
      <span className="text-[color:var(--Stroke,#2A3542)] text-center [font-family:Lora] text-lg font-bold leading-[130%]">{value}</span>
    </div>
  );
}