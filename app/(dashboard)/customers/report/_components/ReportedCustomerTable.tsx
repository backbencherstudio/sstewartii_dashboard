"use client";

import React, { useState } from "react";
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
    report_count: number;
    vendor_count: number;
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
        header: "Report Count",
        cell: (row) => (
            <div className="text-xs  text-[#161618] font-medium leading-[180%] ">${row.report_count}</div>
        ),
    },

    {
        header: "Vendor Count",
        cell: (row) => (
            <div className="text-xs text-[#161618] font-medium leading-[180%]">${row.vendor_count}</div>
        ),
    },





];


// Dummy Data
const data: Vendor[] = [
    { CustomerId: "834759", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834754", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834759", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834754", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834759", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834754", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834759", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834754", customerName: "David John", customerEmail: "david.john@example.com", report_count: 10, vendor_count: 10 },
    { CustomerId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", report_count: 10, vendor_count: 10 },

];




// 4. Main Table Component
export default function ReportedCustomerTable({ selectedId, onSelectionChange }: { selectedId: string | null, onSelectionChange: (id: string | null) => void }) {

    console.log(selectedId);




    return (
        <div className="w-full"      >
            <TableToolBar searchPlaceholder="Search by name, email, or ID...">



                <div className="flex items-center gap-4">




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
            <DataTable columns={getColumns()} data={data} selectedId={selectedId} onSelectionChange={onSelectionChange} idKey="CustomerId" />
        </div>

    );
}