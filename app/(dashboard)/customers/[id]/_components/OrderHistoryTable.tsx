"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Eye, Plus, Search } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import TableToolBar from "@/components/reusable/table/TableToolBar";

// 1. Define Types
type Vendor = {
  OrderId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  totalAmount: number;
  status: 'completed' | 'cancelled' | 'incomplete';
};

// 2. Column Definitions
const getColumns = (): Column<Vendor>[] => [
  {
    header: "Order ID", accessor: "OrderId", cell: (row) => (
      <div className="self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.OrderId}</div>
    )
  },
  {
    header: "Customer Name",
    cell: (row) => (
      <div className="text-sm font-semibold text-[#1A1A2E]">
        <p className="text-sm font-semibold text-[#1A1A2E]">{row.customerName || 'N/A'}</p>
        <p className="text-xs text-[#697586]">{row.customerEmail || 'N/A'}</p>
      </div>
    ),
  },
  {
    header: "Date",
    cell: (row) => (
      <div className="text-xs text-[#161618] font-medium leading-[180%]">{row.date}</div>
    ),
  },
  {
    header: "Time",
    cell: (row) => (
      <div className="text-xs  text-[#161618] font-medium leading-[180%] ">{row.time}</div>
    ),
  },

  {
    header: "Total Amount",
    cell: (row) => (
      <div className="text-xs text-[#161618] font-medium leading-[180%]             ">{row.totalAmount}</div>
    ),
  },
  {
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },



];

// 3. Status Badge Components
const StatusBadge = ({ status }: { status: Vendor['status'] }) => {
  const styles = {
    completed: "bg-[#78F6F5] text-[#007070] ",
    cancelled: "bg-[#FFADAE] text-[#872F31] ",
    incomplete: "bg-[#C8DFFF] text-[#2771D3] ",
  };
  return <span className={cn("px-4 py-2 rounded-lg text-sm font-semibold leading-[130%] uppercase", styles[status])}>{status}</span>;
};



// 4. Main Table Component
export default function OrderHistoryTable() {
  // Dummy Data
  const data: Vendor[] = [
    { OrderId: "834759", customerName: "David John", customerEmail: "david.john@example.com", status: "completed", date: "May 10, 2026", time: "10:00 AM", totalAmount: 100 },
    { OrderId: "834754", customerName: "David John", customerEmail: "david.john@example.com", status: "cancelled", date: "May 10, 2026", time: "10:00 AM", totalAmount: 100 },
    { OrderId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", status: "cancelled", date: "May 10, 2026", time: "10:00 AM", totalAmount: 100 },
    { OrderId: "834453", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", status: "completed", date: "May 10, 2026", time: "10:00 AM", totalAmount: 100 },
    { OrderId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", status: "incomplete", date: "May 10, 2026", time: "10:00 AM", totalAmount: 100 },
    { OrderId: "834454", customerName: "Rowan Fox", customerEmail: "skylar.kai@example.com", status: "incomplete", date: "May 10, 2026", time: "10:00 AM", totalAmount: 100 },

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
                <option value="all">All </option>
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