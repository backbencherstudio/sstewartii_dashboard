"use client";
import ActionIcons from "@/components/icons/ActionIcons";
import CustomModal from "@/components/reusable/CustomModal";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/reusable/CustomBadge";
import { ArrowRight, CheckIcon, EyeIcon, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ViewDoc from "../_components/ViewDoc";
import { DocumentItem } from "@/types/vendor.types";

// 1. Define the Vendor type based on your data structure
type Document = {
    id: string;
    documents: string;
    status: string;
    expiry_date: string;

};



// 2. Define the columns configuration
const getColumns = (
    handleView: (document: DocumentItem) => void
): Column<DocumentItem>[] => [
        {
            header: "Serial #",
            accessor: "serial",
            cell: (row) => (
                <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">
                    {row.serial}
                </div>
            ),
        },
        {
            header: "Document Type",
            accessor: "label",
            cell: (row) => (
                <div className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px]">
                    {row.label}
                </div>
            ),
        },
        {
            header: "Status",
            cell: (row) => (
                <span
                    className={`inline-flex justify-center items-center gap-2.5 px-4 py-2 rounded-lg text-white text-sm font-medium leading-[120%] ${row.status === "ACTIVE"
                        ? "bg-[#1A9844]"
                        : "bg-[#D92D20]"
                        }`}
                >
                    {row.status === "ACTIVE" ? "ACTIVE" : "INACTIVE"}
                </span>
            ),
        },
        {
            header: "File Name",
            accessor: "fileName",
            cell: (row) => (
                <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">
                    {row.fileName}
                </div>
            ),
        },
        {
            header: "Action",
            cell: (row) => (
                <Button
                    onClick={() => handleView(row)}
                    size="icon"
                    className="flex justify-center items-center gap-2 border border-[#DFE1E7] bg-[#F6F8FA] px-4 py-2 border-solid"
                >
                    <ActionIcons.View className="w-6 h-6 text-[#697586]" />
                </Button>
            ),
        },
    ];

// Dummy data
const data: Document[] = [
    {
        id: "834759",
        documents: "Business License",
        status: "active",
        expiry_date: "May 10, 2026",
    },
    {
        id: "834758",
        documents: "Business License",
        status: "active",
        expiry_date: "May 10, 2026",
    },
    // ... add more items
];


// map status to badge color

// 3. Usage in your Page
export default function DocumentTable({ docData }: { docData: DocumentItem[] }) {

    console.dir(docData);


    // const [review, setReview] = useState<Document | null>(null);
    const [view, setView] = useState<DocumentItem | null>(null);

    const handleView = (document: DocumentItem) => {
        setView(document);
    };



    return (
        <div className="">

            <div className="border-x border-t rounded-t-2xl rounded-b-none bg-white p-6">

                <div className="flex justify-between items-center self-stretch w-full" >
                    <h2 className="section-title">Document Information</h2>
                    <div>

                        <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">Sort by:</label>

                        <select className=" rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="sort">
                            <option> Newest First</option>
                            <option> Oldest First</option>
                        </select>
                    </div>


                </div>
            </div>
            <DataTable
                columns={getColumns(handleView)}
                data={docData ?? []}
            />


            <CustomModal
                open={view !== null}
                onOpenChange={() => setView(null)}
                size="lg"
                closeButtonType="shadcn"
                closeButtonProps={{
                    onClick: () => setView(null),
                }}
                className="p-0"
                showCloseButton={false}
            >
                {view && (
                    <ViewDoc
                        document={view}
                        onClose={() => setView(null)}
                    />
                )}
            </CustomModal>
        </div >
    );
}



