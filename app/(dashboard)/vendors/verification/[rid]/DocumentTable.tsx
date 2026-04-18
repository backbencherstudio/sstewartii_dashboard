"use client";
import ActionIcons from "@/components/icons/ActionIcons";
import CustomModal from "@/components/reusable/CustomModal";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckIcon, EyeIcon, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// 1. Define the Vendor type based on your data structure
type Document = {
    id: string;
    documents: string;
    status: string;
    expiry_date: string;

};

// 2. Define the columns configuration
const getColumns = (handleView: (document: Document) => void): Column<Document>[] => [
    {
        header: "Document ID", accessor: "id",
        cell: (row) => (
            <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.id}</div>
        )
    },
    {
        header: "Document Name", accessor: "documents",
        cell: (row) => (
            <div className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.documents}</div>
        )
    },
    {
        header: "Document Provided",
        cell: (row) => (
            <div className="flex ">
                <span className="text-[#89A2C3] text-center text-[10px] font-medium leading-[120%]">{row.status}</span>
            </div>
        ),
    },
    { header: "Submission Date", accessor: "expiry_date" },
    {
        header: "Action",
        cell: (row) => (


            <Button onClick={() => handleView(row)} size="icon" className="flex  justify-center items-center gap-2 border border-[#DFE1E7] [background:#F6F8FA] px-4 py-2  border-solid">
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
        status: "Pending",
        expiry_date: "May 10, 2026",
    },
    {
        id: "834758",
        documents: "Business License",
        status: "Pending",
        expiry_date: "May 10, 2026",
    },
    // ... add more items
];

// 3. Usage in your Page
export default function PendingApplicationsPage() {


    // const [review, setReview] = useState<Document | null>(null);
    const [view, setView] = useState<Document | null>(null);



    const handleView = (document: Document) => {

        setView(document);
    };



    return (
        <div className="">

            <div className="border-x border-t rounded-t-2xl rounded-b-none bg-white p-6">

                <div className="flex justify-between items-center self-stretch w-full" >
                    <h2 className="section-title">Pending Vendor Applications</h2>
                    <div>

                        <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">Sort by:</label>

                        <select className=" rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50" id="sort">
                            <option> Newest First</option>
                            <option> Oldest First</option>
                        </select>
                    </div>


                </div>
            </div>
            <DataTable columns={getColumns(handleView)} data={data} />


            <CustomModal
                open={view !== null}
                onOpenChange={() => setView(null)}
                size="md"
                // title="Document View"
                closeButtonType="shadcn"
                closeButtonProps={{
                    onClick: () => setView(null),

                }}>
                <div className="flex flex-col items-center gap-10">
                    {/* Your Icon/Graphic here */}
                    <div className="w-[157.907px] h-[159.88px] relative">
                        <Image
                            src="/successCommon.svg"
                            alt="Document View"
                            fill
                            className="object-contain"
                        />
                    </div>


                    <div className="w-full">
                        <h2 className="self-stretch text-[color:var(--B,#070707)] text-center [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px]">Vendor Application Successfully
                            Approved!</h2>


                        <p className="b">Vendor has been notified and granted platform access. They are now visible in the curated marketplace.</p>
                    </div>


                    <div className="w-full">
                        <button className="btn-primary w-full">Back to Manage Verification


                            <ArrowRight
                                className="w-6 h-6 "
                                onClick={() => setView(null)}
                            />
                        </button>


                    </div>
                </div>
            </CustomModal>
        </div >
    );
}
