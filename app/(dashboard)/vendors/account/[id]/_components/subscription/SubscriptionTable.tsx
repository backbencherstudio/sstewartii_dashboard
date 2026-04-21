"use client";
import ActionIcons from "@/components/icons/ActionIcons";
import CustomModal from "@/components/reusable/CustomModal";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ViewDoc from "@/app/(dashboard)/vendors/verification/[rid]/_components/ViewDoc";
import OtherIcons from "@/components/icons/OtherIcons";
import TransactionDetails from "./TransactionDetails";


// 1. Define the Vendor type based on your data structure
type Document = {
    invoice_id: string;
    subscription_plan: string;
    payment_method: string;
    start_at: string;
    end_at: string;
    is_active: boolean;
};



// 2. Define the columns configuration
const getColumns = (handleView: (document: Document) => void): Column<Document>[] => [
    {
        header: "Invoice ID", accessor: "invoice_id",
        cell: (row) => (
            <div className="relative">
                <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">{row.invoice_id}</div>



            </div>
        )
    },
    {
        header: "Subscription Plan", accessor: "subscription_plan",
        cell: (row) => (


            <div className="flex gap-2 items-center ">

                <p className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px] flex items-center">{row.subscription_plan}
                </p>

                {
                    row.is_active && (
                        <div className="[background:rgba(0,255,106,0.10)] p-2 rounded-lg border-solid border-[rgba(0,255,106,0.10)] text-[#1A994F] text-sm font-medium leading-[130%]">
                            Active
                        </div>
                    )
                }


            </div>





        )
    },

    {
        header: "Payment Method", accessor: "payment_method",
        cell: (row) => (
            <div className="flex gap-2 items-center ">

                {
                    row.payment_method ? ( <>
                        <OtherIcons.Card className="w-6 h-6 text-[#697586]" />
    
                        <p className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px] flex items-center">{row.payment_method}
                        </p>
                    </>) : (
                        <p className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px] flex items-center">-</p>
                    )
                }

               
            </div>
        )
    },
    {
        header: "Start At", accessor: "start_at", cell: (row) => (
            <div className="text-[#161618] text-sm font-medium leading-[180%] ">{row.start_at}</div>
        )
    },
    {
        header: "End At", accessor: "end_at", cell: (row) => (
            <div className="text-[#161618] text-sm font-medium leading-[180%] ">{row.end_at}</div>
        )
    },

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
        invoice_id: "834759",
        subscription_plan: "Pro",
        payment_method: "Stripe",
        start_at: "May 10, 2026",
        end_at: "May 10, 2026",
        is_active: true,
    },
    {
        invoice_id: "834759",
        subscription_plan: "Elite",
        payment_method: "Stripe",
        start_at: "May 10, 2026",
        end_at: "May 10, 2026",
        is_active: false,
    },
    {
        invoice_id: "834758",
        subscription_plan: "Business Free Trial",
        payment_method: "",
        start_at: "May 10, 2026",
        end_at: "May 10, 2026",
        is_active: false,
    },
    // ... add more items
];


// badge




// 3. Usage in your Page
export default function DocumentInfoTable() {


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
                size="sm"
                // title="Document View"
                closeButtonType="shadcn"
                closeButtonProps={{
                    onClick: () => {
                        setView(null);
                        console.log("close button clicked");
                    },

                }}
                className="p-0"
                showCloseButton={true}
            >
                <TransactionDetails />
            </CustomModal>
        </div >
    );
}





