"use client";

import ActionIcons from "@/components/icons/ActionIcons";
import EmptyState from "@/components/reusable/EmptyState";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BadgeCheck, BanIcon, CircleX, ClockIcon, TicketIcon, XIcon } from "lucide-react";
import { LoadingBoundaryProvider } from "next/dist/client/components/layout-router";
import Link from "next/link";

// 1. Updated Vendor type to match the data needed for badges
type Vendor = {
    id: string;
    name: string;
    email: string;
    status: 'VERIFIED' | 'SUSPENDED' | 'REJECTED' | 'EXPIRED';
    subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'FREE TRIAL' | 'EXPIRED';
    date: string;
};

// 2. Define Columns
const getColumns = (): Column<Vendor>[] => [
    { header: "Vendor ID", accessor: "id" },
    {
        header: "Vendor",
        cell: (row) => (
            <div>
                <div className="text-sm font-medium text-[#161618]">{row.name}</div>
                <div className="text-xs text-[#697586]">{row.email}</div>
            </div>
        )
    },
    {
        header: "Status",
        cell: (row) => <StatusBadge status={row.status} />
    },
    { header: "Date Joined", accessor: "date" },
    {
        header: "Subscription Status",
        cell: (row) => <SubscriptionStatusBadge status={row.subscriptionStatus} />
    },
    
    {
        header: "Action",
        cell: (row) => (
            <Link
                href={`/vendors/account/${row.id}`}>
                <Button size="icon" variant="ghost" className="border border-[#DFE1E7]">
                    <ActionIcons.View className="w-5 h-5 text-[#697586]" />
                </Button>
                </Link>
        ),
    },

    
];


// 4. Dummy Data
const data: Vendor[] = [
    { id: "834759", name: "David John", email: "david.john@example.com", status: "VERIFIED", subscriptionStatus: "ACTIVE", date: "May 10, 2026" },
    { id: "834454", name: "Rowan Fox", email: "skylar.kai@example.com", status: "SUSPENDED", subscriptionStatus: "INACTIVE", date: "May 10, 2026" },
    { id: "834453", name: "Rowan Fox", email: "skylar.kai@example.com", status: "REJECTED", subscriptionStatus: "FREE TRIAL", date: "May 10, 2026" },
    { id: "83445`", name: "Rowan Fox", email: "skylar.kai@example.com", status: "EXPIRED", subscriptionStatus: "EXPIRED", date: "May 10, 2026" },
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




// 3. Status Badge Logic (Matching the colors in your image)
export const StatusBadge = ({ status }: { status: Vendor['status'] }) => {
    const styles = {
        VERIFIED: {
            background: "bg-[#9DFF6C]",
            icon: <BadgeCheck className="w-3.5 h-3.5 text-black" />,
        }, // Green
        SUSPENDED: {
            background: "bg-[#FF7070]",
            icon: <BanIcon className="w-3.5 h-3.5 text-black" />,
        }, // Red
        REJECTED: {
            background: "bg-[#89A2C3]",
            icon: <CircleX className="w-3.5 h-3.5 text-black" />,
        },  // Blue
        EXPIRED: {
            background: "bg-[#3AC2C2]",
            icon: <ClockIcon className="w-3.5 h-3.5 text-black" />,
        },   // Teal
    };
    return <span className={cn("px-4 py-2 rounded-full text-xs  uppercase text-center inline-flex items-center gap-2", styles[status].background)}>{styles[status].icon} {status}</span>;
};

const SubscriptionStatusBadge = ({ status }: { status: Vendor['subscriptionStatus'] }) => {
    const styles = {
        ACTIVE: " [background:rgba(0,255,106,0.10)] border-[rgba(0,255,106,0.10)] text-[#1A994F]",
        INACTIVE: "[background:rgba(118,118,118,0.20)] px-4 py-2 rounded-lg border-solid border-[rgba(118,118,118,0.30)]          ",
        "FREE TRIAL": "[background:rgba(28,100,255,0.10)] border-[rgba(61,123,255,0.14)] text-[#1967D2]",
        EXPIRED: " [background:rgba(161,0,0,0.10)]  border-[rgba(242,85,85,0.15)] text-[#A10000]",
    };
    return <span className={cn("px-4 py-2 rounded-lg border  text-sm font-medium uppercase", styles[status])}>{status}</span>;
};

