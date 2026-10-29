"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export type Column<T> = {
    header: string;
    accessor?: keyof T;
    cell?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
    toolbar?: React.ReactNode; // Inject custom search/filter UI
    selectedId?: string | null; // Changed to single string
    onSelectionChange?: (id: string | null) => void;
    idKey?: keyof T;
    // Server-side pagination support (optional)
    serverPagination?: {
        currentPage: number;
        totalPages: number;
        totalCount?: number;
        onPageChange: (page: number) => void;
    };
};

export default function DataTable<T>({
    columns,
    data,
    pageSize = 5,
    selectedId,
    onSelectionChange,
    idKey,
    serverPagination
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const safeData: T[] = Array.isArray(data)
        ? data
        : Array.isArray((data as unknown as { items?: T[] })?.items)
        ? ((data as unknown as { items: T[] }).items)
        : Array.isArray((data as unknown as { logs?: T[] })?.logs)
        ? ((data as unknown as { logs: T[] }).logs)
        : Array.isArray((data as unknown as { auditLogs?: T[] })?.auditLogs)
        ? ((data as unknown as { auditLogs: T[] }).auditLogs)
        : Array.isArray((data as unknown as { data?: T[] })?.data)
        ? ((data as unknown as { data: T[] }).data)
        : [];

    const isServerPagination = Boolean(serverPagination);
    const effectiveTotalPages = isServerPagination
        ? serverPagination!.totalPages
        : Math.ceil(safeData.length / pageSize);
    const effectiveCurrentPage = isServerPagination
        ? serverPagination!.currentPage
        : currentPage;

    const paginatedData = isServerPagination
        ? safeData
        : safeData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
        );


    const handleRowClick = (id: string) => {
        // If the same row is clicked, deselect it. Otherwise, select the new one.
        onSelectionChange?.(selectedId === id ? null : id);
    };

    return (
        // <div className="border rounded-t-2xl rounded-b-none bg-white">
        <div className="border  bg-white">
            {/* 1. Optional Toolbar Slot */}
            {/* {toolbar &&

                <div className="flex justify-between items-center self-stretch px-6 py-4">

                    {toolbar}

                </div>

            } */}
            <div className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-[#F9F9FB] hover:bg-[#F9F9FB] border-b border-[#ECEFF3]  ">
                            {columns.map((col, i) => (
                                <TableHead key={i} className=" text-[#44444A]  text-xs font-medium leading-[normal] tracking-[-0.24px] px-4 py-3">
                                    {col.header}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                    {paginatedData.map((row, i) => {
                    const rowId = String(row[idKey!]);
                    const isSelected = selectedId === rowId;
                    
                    return (
                        <TableRow 
                            key={i} 
                            onClick={() => handleRowClick(rowId)}
                            className={isSelected ? "bg-blue-50 hover:bg-blue-50 cursor-pointer" : "cursor-pointer"}
                        >
                            {/*  */}
                            {columns.map((col, j) => (
                                <TableCell key={j}>
                                    {col.cell ? col.cell(row) : String(row[col.accessor!])}
                                </TableCell>
                            ))}
                        </TableRow>
                    );
                })}
                    </TableBody>
                </Table>
            </div>

            {/* 2. Pagination */}
            {effectiveTotalPages > 1 && (
                <div className="flex items-center justify-between p-3 border-t border-[#ECEFF3] bg-white">
                    <p className="text-xs text-neutral-500 font-medium">
                        Page <span className="font-semibold text-neutral-800">{effectiveCurrentPage}</span> of{" "}
                        <span className="font-semibold text-neutral-800">{effectiveTotalPages}</span>
                        {isServerPagination && serverPagination?.totalCount !== undefined && (
                            <span className="ml-2 text-neutral-400">
                                ({serverPagination.totalCount} total records)
                            </span>
                        )}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={effectiveCurrentPage <= 1}
                            onClick={() => {
                                if (isServerPagination) {
                                    serverPagination!.onPageChange(Math.max(effectiveCurrentPage - 1, 1));
                                } else {
                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                }
                            }}
                            className="h-8 px-3 text-xs font-semibold rounded-lg border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={effectiveCurrentPage >= effectiveTotalPages}
                            onClick={() => {
                                if (isServerPagination) {
                                    serverPagination!.onPageChange(Math.min(effectiveCurrentPage + 1, effectiveTotalPages));
                                } else {
                                    setCurrentPage((prev) => Math.min(prev + 1, effectiveTotalPages));
                                }
                            }}
                            className="h-8 px-3 text-xs font-semibold rounded-lg border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}