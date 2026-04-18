"use client";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

// 1. Define the Vendor type based on your data structure
type Vendor = {
    id: string;
    name: string;
    documents: { type: string; provided: boolean }[];
    date: string;
};

// 2. Define the columns configuration
const getColumns = (handleReview: (vendor: Vendor) => void): Column<Vendor>[] => [
    {
        header: "Vendor ID", accessor: "id",
        cell: (row) => (
            <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.id}</div>
        )
    },
    {
        header: "Vendor Name", accessor: "name",
        cell: (row) => (
            <div className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.name}</div>
        )
    },
    {
        header: "Document Provided",
        cell: (row) => (
            <div className="flex gap-4">
                {row.documents.map((doc, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1 pl-2.5">
                        <span className="flex w-6 h-6 justify-center items-center [background:#3AC2C2] rounded-full">{TickIcon}</span> {/* Replace with your Icon */}
                        <span className="text-[#89A2C3] text-center text-[10px] font-medium leading-[120%]">{doc.type}</span>
                    </div>
                ))}
            </div>
        ),
    },
    { header: "Submission Date", accessor: "date" },
    {
        header: "Action",
        cell: (row) => (


            <Link href={`/vendors/verification/${row.id}`}>
                <Button className="bg-[#FFBB1C] hover:bg-[#e0a618] text-black font-bold rounded-xl px-6">
                    Review
                </Button>
            </Link>
        ),
    },
];


// Dummy data
const data: Vendor[] = [
    {
        id: "834759",
        name: "David John",
        date: "May 10, 2026",
        documents: [
            { type: "Business License", provided: true },
            { type: "Health Permit", provided: true },
            { type: "Proof of Insurance", provided: true },
        ],
    },
    {
        id: "834758",
        name: "John Doe",
        date: "May 10, 2026",
        documents: [
            { type: "Business License", provided: true },
            { type: "Health Permit", provided: true },
            { type: "Proof of Insurance", provided: true },
        ],
    },
    // ... add more items
];

// 3. Usage in your Page
export default function PendingApplicationsPage() {


    const [review, setReview] = useState<Vendor | null>(null);

    const handleReview = (vendor: Vendor) => {
        alert(`Reviewing vendor: ${vendor.name}`);
        setReview(vendor);
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
            <DataTable columns={getColumns(handleReview)} data={data}  />
        </div>
    );
}






// Tick icon


const TickIcon = <><svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.79167 7.9625L0 4.17083L1.3125 2.85833L3.79167 5.3375L9.12917 0L10.4417 1.3125L3.79167 7.9625Z" fill="#007070" />
</svg>
</>