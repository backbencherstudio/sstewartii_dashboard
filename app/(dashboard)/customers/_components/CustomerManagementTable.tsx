"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Eye, Plus, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TableToolBar from "@/components/reusable/table/TableToolBar";
import ActionIcons from "@/components/icons/ActionIcons";

// 1. Define Types
type Vendor = {
    CustomerId: string;
    customerName: string;
    customerEmail: string;
    status: 'active' | 'reported' | 'suspended';
    date_joined: string;
    orders_count: number;
    total_spent: number;
};

// 2. Column Definitions
const getColumns = (): Column<Vendor>[] => [
    {
        header: "Customer ID", accessor: "CustomerId", cell: (row) => (
            <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.CustomerId}</div>
        )
    },
    {
        header: "Customer ",
        cell: (row) => (
            <div className="text-sm font-semibold text-[#1A1A2E]">
                <p className="text-sm font-semibold text-[#1A1A2E]">{row.customerName || 'N/A'}</p>
                <p className="text-xs text-[#697586]">{row.customerEmail || 'N/A'}</p>
            </div>
        ),
    },

    {
        header: "Status",
        cell: (row) => <StatusBadge status={row.status} />,
    },
    {
        header: "Date Joined           ",
        cell: (row) => (
            <div className="text-xs text-[#161618] font-medium leading-[180%]">{row.date_joined}</div>
        ),
    },
    {
        header: "Orders",
        cell: (row) => (
            <div className="text-xs  text-[#161618] font-medium leading-[180%] ">${row.orders_count}</div>
        ),
    },

    {
        header: "Total Spent",
        cell: (row) => (
            <div className="text-xs text-[#161618] font-medium leading-[180%]">${row.total_spent}</div>
        ),
    },

    {
        header: "Action",
        cell: (row) => (
            <Link
                href={`/customers/${row.CustomerId}`}>
                <Button size="icon" variant="ghost" className="border border-[#DFE1E7]">
                    <ActionIcons.View className="w-5 h-5 text-[#697586]" />
                </Button>
            </Link>
        ),
    },



];

// 3. Status Badge Components
const StatusBadge = ({ status }: { status: Vendor['status'] }) => {
    const styles = {
        active: "bg-[#BBFFA7] text-[#298C20] ",
        reported: "bg-[#FFF291] text-[#8B7500] ",
        suspended: "bg-[#FFADAE] text-[#872F31] ",
    };
    return <span className={cn("px-4 py-2 rounded-lg text-sm font-semibold leading-[130%] uppercase", styles[status])}>{status}</span>;
};



// 4. Main Table Component
export default function CustomerManagementTable() {
    // Dummy Data
    const data: Vendor[] = [
        { CustomerId: "834759", customerName: "David John", customerEmail: "david.john@example.com", status: "active", date_joined: "May 10, 2026", orders_count: 10, total_spent: 100.00 },
        { CustomerId: "834754", customerName: "David John", customerEmail: "david.john@example.com", status: "reported", date_joined: "May 10, 2026", orders_count: 10, total_spent: 140.00 },
        { CustomerId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", status: "suspended", date_joined: "May 10, 2026", orders_count: 10, total_spent: 250.00 },
        { CustomerId: "834454", customerName: "Rowan Dox", customerEmail: "skylar.kai@example.com", status: "suspended", date_joined: "May 10, 2026", orders_count: 10, total_spent: 250.00 },
        { CustomerId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", status: "suspended", date_joined: "May 10, 2026", orders_count: 10, total_spent: 250.00 },

    ];

    return (
        <div >
            {/* Table Header with Search and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                {/* <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-6 text-gray-400" />
            <input 
              placeholder="Search by name, email..." 
              className=" border border-[#ECEFF3] px-4 py-3 pl-10 rounded-md outline-none w-68"
            />
          </div> */}


            </div>

            <div>
                <TableToolBar searchPlaceholder="Search by name, email, or ID...">



                    <div className="flex items-center gap-4">


                        {/* Sort by */}
                        <div>

                            <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="status">Status:</label>

                            <select className=" rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="status">
                                <option value="all"> All</option>
                                <option> Completed</option>
                                <option> Cancelled</option>
                                <option> Incomplete</option>
                            </select>
                        </div>

                        {/* Sort by */}
                        <div>

                            <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">Sort by:</label>

                            <select className=" rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="sort">
                                <option> Newest First</option>
                                <option> Oldest First</option>
                            </select>
                        </div>
                    </div>
                </TableToolBar>
                <DataTable columns={getColumns()} data={data} />
            </div>
        </div>
    );
}