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
    selectedId?: string | null; // Changed to single string
    onSelectionChange?: (id: string | null) => void;
    idKey?: keyof T;
};

export default function DataTable<T>({
    columns,
    data,
    pageSize = 5,
    toolbar,
    selectedId,
    onSelectionChange,
    idKey
}: DataTableProps<T>) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / pageSize);

    const paginatedData = data.slice(
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

            {/* 2. Simple Pagination */}
            {/* {totalPages > 1 && (
                <div className="flex items-center justify-between pt-2">
                    <p className="text-xs text-neutral-400">Page {currentPage} of {totalPages}</p>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Prev</Button>
                        <Button variant="outline" size="sm" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next</Button>
                    </div>
                </div>
            )} */}
        </div>
    );
}