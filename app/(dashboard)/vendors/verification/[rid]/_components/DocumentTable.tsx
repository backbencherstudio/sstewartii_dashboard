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
        header: "Serial #", accessor: "id",
        cell: (row) => (
            <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.id}</div>
        )
    },
    {
        header: "Document Type", accessor: "documents",
        cell: (row) => (
            <div className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.documents}</div>
        )
    },
    {
        header: "Status",
        cell: (row) => (
            <div className="flex ">
                {/* <StatusBadge status={row.status} variant="solid" color="green" /> */}

                <div className={`flex justify-center items-center gap-2.5 bg-[${row.status === "active" ? "#1A9844" : "#D92D20"}] px-4 py-2 rounded-lg text-white text-sm font-medium leading-[120%]`}>
                    {row.status === "active" ? "Active" : "Inactive"}
                </div>
            </div>
        ),
    },
    { header: "Expiration Date", accessor: "expiry_date" },
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
        status: "active",
        expiry_date: "May 10, 2026",
    },
    {
        id: "834758",
        documents: "Business License",
        status: "pending",
        expiry_date: "May 10, 2026",
    },
    // ... add more items
];


// map status to badge color

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
            <DataTable columns={getColumns(handleView)} data={data} />


            <CustomModal
                open={view !== null}
                onOpenChange={() => setView(null)}
                size="lg"
                // title="Document View"
                closeButtonType="shadcn"
                closeButtonProps={{
                    onClick: () => {
                        setView(null);
                        console.log("close button clicked");
                    },

                }}
                className="p-0"
                showCloseButton={false}
            >
                <ViewDoc onClose={() => setView(null)} />
            </CustomModal>
        </div >
    );
}



