"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
};

export default function DataTable<T>({
    columns,
    data,
    pageSize = 5,
    toolbar
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / pageSize);

    const paginatedData = data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

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
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center py-10 text-neutral-500 ">
                                    No data found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, i) => (
                                <TableRow key={i} className="border-b border-white/5 hover:bg-white/5">
                                    {columns.map((col, j) => (
                                        <TableCell key={j} className="px-4 py-2.5">
                                            {col.cell ? col.cell(row) : (col.accessor ? String(row[col.accessor] ?? "—") : "—")}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 2. Simple Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-neutral-400">Page {currentPage} of {totalPages}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Prev</Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</Button>
                    </div>
                </div>
            )}
        </div>
    );
}