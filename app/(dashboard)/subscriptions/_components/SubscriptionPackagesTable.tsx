"use client";

import ActionIcons from "@/components/icons/ActionIcons";
import EmptyState from "@/components/reusable/EmptyState";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { BadgeCheck, BanIcon, CircleX, ClockIcon, Pencil, TicketIcon, XIcon } from "lucide-react";
import { LoadingBoundaryProvider } from "next/dist/client/components/layout-router";
import Link from "next/link";

// 1. Updated Vendor type to match the data needed for badges
type SubscriptionPackage = {
    serial: string;
    planName: string;
    price: string;
    subscribers: string;
    features: string;
    status: "ACTIVE" | "INACTIVE";
  };
// 2. Define Columns
const getColumns = (): Column<SubscriptionPackage>[] => [
    { header: "Serial", accessor: "serial" },
    {
        header: "Plan Name",
        cell: (row) => (
            <div>
                <div className="text-sm font-medium text-[#161618] py-3 ">{row.planName}</div>
            </div>
        )
    },
    {
        header: "Price",
        cell: (row) => <div className="text-sm font-medium text-[#161618]">{row.price}</div>
    },
    { header: "Number of Users", accessor: "subscribers" },
    { header: "Features", accessor: "features" },
    { header: "Status", accessor: "status", cell: (row) => <Badge                 variant={row.status === "ACTIVE" ? "success" : "danger"}>{row.status}</Badge> },
    {
        header: "Action",
        cell: (row) => (
           <div className="flex gap-2">
             <ActionButton icon={<ActionIcons.View2 className="w-5 h-5 text-[#697586]" />} />
             <ActionButton icon={<ActionIcons.edit className="w-5 h-5 text-[#697586]" />} />
             <ActionButton icon={<ActionIcons.delete className="w-5 h-5 text-[#697586]" />} />
           </div>
        )
    }
];

const Badge = ({
    variant,
    children,
  }: {
    variant: "success" | "danger";
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={cn(
          "flex w-[84px] h-7 items-center justify-center gap-1 rounded border px-4 py-1 text-sm font-medium leading-[116%] tracking-[0.07px] font-inter",
          variant === "success" &&
            "bg-[#EFFFEF] border-[#06AD06] text-[#06AD06]",
          variant === "danger" &&
            "bg-[#FFEFEF] border-[#D92D20] text-[#D92D20]"
        )}
      >
        {children}
      </div>
    );
  };


// 4. Dummy Data
const data: SubscriptionPackage[] = [
    {
      serial: "01",
      planName: "Starter",
      price: "$19.99",
      subscribers: "245 users",
      features: "12 features",
      status: "ACTIVE",
    },
    {
      serial: "02",
      planName: "Pro",
      price: "$49.99",
      subscribers: "295 users",
      features: "10 features",
      status: "ACTIVE",
    },
    {
      serial: "03",
      planName: "Elite",
      price: "$99.99",
      subscribers: "745 users",
      features: "8 features",
      status: "ACTIVE",
    },
    {
      serial: "04",
      planName: "Free",
      price: "$00.00",
      subscribers: "1147 users",
      features: "4 features",
      status: "ACTIVE",
    },
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




function ActionButton({ icon }: { icon: React.ReactNode }) {
    return (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className=" bg-[#F8FAFC] text-[#4B5563] hover:bg-[#EEF2F6] flex w-10 h-10 justify-center items-center gap-2 aspect-[1/1] border border-[color:var(--background-pressed-100,#DFE1E7)] [background:var(--background-normal-25,#F6F8FA)] px-4 py-2 rounded-xl border-solid"
      >
        {icon}
      </Button>
    );
  }