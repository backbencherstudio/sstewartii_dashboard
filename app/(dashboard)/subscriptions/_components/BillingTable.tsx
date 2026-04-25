"use client";

import ActionIcons from "@/components/icons/ActionIcons";
import OtherIcons from "@/components/icons/OtherIcons";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

// 1. Updated Type Definition
type Vendor = {
    subscriptionId: string;
    name: string;
    vendorId: string;
    plan: 'Starter' | 'Elite' | 'Pro';
    date: string; // "12-05-2026"
    time: string; // "09:15"
    billingDigits: string; // "6750"
    status: 'Active' | 'Expired';
};

// 2. Updated Columns
const getColumns = (): Column<Vendor>[] => [
    { header: "Subscription ID", accessor: "subscriptionId", cell: (row) => (
        <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.subscriptionId}</div>
    ) },
    {
        header: "Vendor",
        cell: (row) => (
            <div className="py-3">
                <div className="text-[color:var(--Secondary-700,#161618)] [font-family:Inter] text-sm font-semibold leading-[160%]">{row.name}</div>
                <div className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%] ">ID: #{row.vendorId}</div>
            </div>
        )
    },
    {
        header: "Plan",
        cell: (row) => (
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${row.plan === 'Starter' ? 'bg-yellow-400/20' : row.plan === 'Elite' ? 'bg-orange-400/20' : 'bg-yellow-500/20'}`}>
            
                <div className={cn("w-3 h-3 rounded-full",
                    row.plan === 'Starter' ? 'bg-yellow-400' :
                        row.plan === 'Elite' ? 'bg-orange-400' : 'bg-yellow-500'
                )} />
                <span className="text-[color:var(--B,#070707)] [font-family:Inter] text-sm font-medium leading-[130%]">{row.plan}</span>
            </div>
        )
    },
    {
        header: "Created Date",
        cell: (row) => (
            <div>
                <div className="self-stretch text-[color:var(--Secondary-700,#161618)] [font-family:Inter] text-sm font-semibold leading-[160%]">{row.date}</div>
                <div className="self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">{row.time}</div>
            </div>
        )
    },
    {
        header: "Billing",
        cell: (row) => (
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                    <OtherIcons.Card className="w-4 h-4 text-[#697586]" />
                    </span> •••• {row.billingDigits}
            </div>
        )
    },
    {
        header: "Status",
        cell: (row) => (
            <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5",
                row.status === 'Active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
            )}>
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {row.status}
            </span>
        )
    },
    {
        header: "Action",
        cell: (row) => (
            <Link href={`/vendors/account/${row.subscriptionId}`}>
                <Button size="icon" variant="ghost" className="border border-[#DFE1E7]">
                    <ActionIcons.View className="w-5 h-5 text-[#697586]" />
                </Button>
            </Link>
        ),
    },
];

// 3. Updated Dummy Data
const data: Vendor[] = [
    { subscriptionId: "#834759", name: "David John", vendorId: "834759", plan: "Starter", date: "12-05-2026", time: "09:15", billingDigits: "6750", status: "Active" },
    { subscriptionId: "#834754", name: "Teagan Grey", vendorId: "834759", plan: "Elite", date: "12-06-2026", time: "17:45", billingDigits: "6950", status: "Active" },
    { subscriptionId: "#834454", name: "Rowan Fox", vendorId: "834759", plan: "Elite", date: "12-07-2026", time: "11:30", billingDigits: "6900", status: "Active" },
    { subscriptionId: "#832454", name: "Riley Blake", vendorId: "834759", plan: "Pro", date: "12-08-2026", time: "16:00", billingDigits: "7050", status: "Expired" },
];

export default function VendorAccountTable() {
    return (
        <div className="bg-white rounded-2xl border border-[#ECEFF3]">
            <div className="p-6 flex justify-between items-center border-b border-[#ECEFF3]">
                <h2 className="text-xl font-semibold">Vendor Accounts</h2>
                <div className="flex items-center gap-6">
                    <div className="flex items-center  ">
                        <span className="text-sm text-[#697586]">Status:</span>
                        <select className="text-sm font-semibold p-1 outline-none rounded-lg text-center">
                            <option className="" value="all">All</option>
                            {/* <option value="verified">Verified</option>
                            <option value="suspended">Suspended</option>
                            <option value="expired">Expired</option>
                            <option value="inactive">Inactive</option> */}

                        </select>
                    </div>


                    <div className="flex items-center gap-2">
                        <span className="text-sm text-[#697586]">Sort by:</span>
                        <select className="text-sm font-semibold p-1 outline-none">
                            <option>Newest First</option>
                        </select>
                    </div>
                </div>
            </div>
            <DataTable columns={getColumns()} data={data} />
        </div>
    );
}