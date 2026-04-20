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
  id: string;
  name: string;
  email: string;
  status: 'VERIFIED' | 'SUSPENDED' | 'REJECTED' | 'EXPIRED';
  subscriptionStatus: 'ACTIVE' | 'INACTIVE' | 'FREE TRIAL' | 'EXPIRED';
  date: string;
};

// 2. Column Definitions
const getColumns = (): Column<Vendor>[] => [
  { header: "Vendor ID", accessor: "id" },
  {
    header: "Vendor",
    cell: (row) => (
      <div>
        <div className="text-sm font-semibold text-[#1A1A2E]">{row.name}</div>
        <div className="text-xs text-[#697586]">{row.email}</div>
      </div>
    ),
  },
  {
    header: "Status",
    cell: (row) => <StatusBadge status={row.status} />,
  },
  { header: "Date Joined", accessor: "date" },
 
  {
    header: "Action",
    cell: (row) => (
      <Link href={`/vendors/account/${row.id}`}>
        <Button size="icon" variant="ghost" className="border border-[#DFE1E7]">
          <Eye className="w-5 h-5 text-[#697586]" />
        </Button>
      </Link>
    ),
  },
];

// 3. Status Badge Components
const StatusBadge = ({ status }: { status: Vendor['status'] }) => {
  const styles = {
    VERIFIED: "bg-[#E6FFEA] text-[#1A994F] border-[#C8E6C9]",
    SUSPENDED: "bg-[#FFEBEE] text-[#D32F2F] border-[#FFCDD2]",
    REJECTED: "bg-[#F5F5F5] text-[#767676] border-[#E0E0E0]",
    EXPIRED: "bg-[#FFF3E0] text-[#EF6C00] border-[#FFE0B2]",
  };
  return <span className={cn("px-3 py-1 rounded-full border text-[10px] font-bold uppercase", styles[status])}>{status}</span>;
};



// 4. Main Table Component
export default function OrdersTable() {
  // Dummy Data
  const data: Vendor[] = [
    { id: "834759", name: "David John", email: "david.john@example.com", status: "VERIFIED", subscriptionStatus: "ACTIVE", date: "May 10, 2026" },
    { id: "834454", name: "Rowan Fox", email: "skylar.kai@example.com", status: "SUSPENDED", subscriptionStatus: "INACTIVE", date: "May 10, 2026" },
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
        <TableToolBar searchPlaceholder="Search by name, email...">
        <div className="flex items-center gap-4">
          
          
          <select className="text-sm font-semibold bg-gray-50 p-2 rounded-lg outline-none cursor-pointer">
            <option>Status: All</option>
          </select>
          
          <select className="text-sm font-semibold bg-gray-50 p-2 rounded-lg outline-none cursor-pointer">
            <option>Newest First</option>
          </select>
        </div>
        </TableToolBar>
        <DataTable columns={getColumns()} data={data} />
     </div>
    </div>
  );
}