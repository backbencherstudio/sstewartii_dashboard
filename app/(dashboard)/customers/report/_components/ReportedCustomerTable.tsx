"use client";

import DataTable, { Column } from "@/components/reusable/table/DataTable";
import TableToolBar from "@/components/reusable/table/TableToolBar";
import { useGetCustomerReports } from "@/hooks/useCustomers";
import Image from "next/image";

// 1. Define Types based on the new data structure
type Vendor = {
    customerId: string;
    customerCode: string;
    fullName: string;
    email: string;
    avatar: string;
    reportCount: number;
    vendorCount: number;
};

// 2. Column Definitions
const getColumns = (): Column<Vendor>[] => [
    {
        header: "Customer ID",
        accessor: "customerCode",
        cell: (row) => (
            <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">
                {row.customerCode || row.customerId || 'N/A'}
            </div>
        )
    },
    {
        header: "Customer",
        accessor: "fullName",
        cell: (row) => (
            <div className="flex items-center gap-3">
                {row.avatar ? (
                    <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                        <Image
                            src={row.avatar}
                            alt={row.fullName || 'Customer'}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-medium text-sm">
                            {row.fullName?.charAt(0) || 'U'}
                        </span>
                    </div>
                )}
                <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{row.fullName || 'N/A'}</p>
                    <p className="text-xs text-[#697586]">{row.email || 'N/A'}</p>
                </div>
            </div>
        ),
    },
    {
        header: "Report Count",
        accessor: "reportCount",
        cell: (row) => (
            <div className="text-sm text-[#161618] font-medium leading-[180%]">
                {row.reportCount || 0}
            </div>
        ),
    },
    {
        header: "Vendor Count",
        accessor: "vendorCount",
        cell: (row) => (
            <div className="text-sm text-[#161618] font-medium leading-[180%]">
                {row.vendorCount || 0}
            </div>
        ),
    },
];

// 3. Main Table Component
export default function ReportedCustomerTable({ 
    selectedId, 
    onSelectionChange 
}: { 
    selectedId: string | null; 
    onSelectionChange: (id: string | null) => void;
}) {
    const { data: customerReports, isLoading, error } = useGetCustomerReports();
    
    // Handle loading state
    if (isLoading) {
        return (
            <div className="w-full">
                <TableToolBar searchPlaceholder="Search by name, email, or ID...">
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">
                                Sort by:
                            </label>
                            <select className="rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="sort">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                            </select>
                        </div>
                    </div>
                </TableToolBar>
                <div className="flex items-center justify-center py-12">
                    <div className="text-[#697586]">Loading customer data...</div>
                </div>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="w-full">
                <TableToolBar searchPlaceholder="Search by name, email, or ID...">
                    <div className="flex items-center gap-4">
                        <div>
                            <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">
                                Sort by:
                            </label>
                            <select className="rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="sort">
                                <option>Newest First</option>
                                <option>Oldest First</option>
                            </select>
                        </div>
                    </div>
                </TableToolBar>
                <div className="flex items-center justify-center py-12">
                    <div className="text-red-500">Error loading customer data. Please try again.</div>
                </div>
            </div>
        );
    }

    // Transform API data to match the expected format
    const transformedData: Vendor[] = customerReports?.data?.map((item: any) => ({
        customerId: item.customerId,
        customerCode: item.customerCode,
        fullName: item.fullName,
        email: item.email,
        avatar: item.avatar || '',
        reportCount: item.reportCount,
        vendorCount: item.vendorCount,
    })) || [];

    return (
        <div className="w-full">
            <TableToolBar searchPlaceholder="Search by name, email, or ID...">
                <div className="flex items-center gap-4">
                    {/* Sort by */}
                    <div>
                        <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">
                            Sort by:
                        </label>
                        <select className="rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="sort">
                            <option>Newest First</option>
                            <option>Oldest First</option>
                        </select>
                    </div>
                </div>
            </TableToolBar>
            
            <DataTable 
                columns={getColumns()} 
                data={transformedData} 
                selectedId={selectedId} 
                onSelectionChange={onSelectionChange} 
                idKey="customerId" 
            />
        </div>
    );
}