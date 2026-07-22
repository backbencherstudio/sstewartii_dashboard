"use client";
import ActionIcons from "@/components/icons/ActionIcons";
import CustomModal from "@/components/reusable/CustomModal";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ViewDoc from "@/app/(dashboard)/vendors/verification/[rid]/_components/ViewDoc";
import { useVendorDocuments } from "@/hooks/useVendorAccount";
import { DocumentItem } from "@/types/vendorAccount.types";

// 1. Define the Document type using your existing interface
type Document = DocumentItem;

// Helper function to format document type for display
const formatDocumentType = (type: string): string => {
    return type.split('_').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
};

// Helper function to get status color
const getStatusColor = (status: string): string => {
    switch (status.toUpperCase()) {
        case 'ACTIVE':
            return 'bg-[#1A9844]';
        case 'PENDING':
            return 'bg-[#F59E0B]';
        case 'REJECTED':
            return 'bg-[#D92D20]';
        case 'EXPIRED':
            return 'bg-[#6B7280]';
        default:
            return 'bg-[#6B7280]';
    }
};

// 2. Define the columns configuration
const getColumns = (handleView: (document: Document) => void): Column<Document>[] => [
    // {
    //     header: "S/N",
    //     accessor: "id",
    //     cell: (row: DocumentItem) => {
    //         const i = 1
    //         return (
    //             <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">
    //                 {i + 1}
    //             </div>
    //         )
    //     }
    //     // cell: (row: DocumentItem, index: number) => (
    //     //     <div className="self-stretch text-[#697586] text-sm font-medium leading-[150%] tracking-[-0.28px]">
    //     //         {index + 1}
    //     //     </div>
    //     // )
    // },
    {
        header: "Document Type",
        accessor: "documentType",
        cell: (row) => (
            <div className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px]">
                {formatDocumentType(row.documentType)}
            </div>
        )
    },
    {
        header: "Document Name",
        accessor: "documentName",
        cell: (row) => (
            <div className="self-stretch text-[#161618] text-sm font-medium leading-[150%] tracking-[-0.28px]">
                {row.documentName}
            </div>
        )
    },
    {
        header: "Status",
        cell: (row) => (
            <div className="flex">
                <span className={`flex justify-center items-center gap-2.5 ${getStatusColor(row.status)} px-4 py-2 rounded-lg text-white text-sm font-medium leading-[120%]`}>
                    {row.statusLabel.toUpperCase()}
                </span>
            </div>
        ),
    },
    {
        header: "Uploaded At",
        accessor: "uploadedAtLabel",
        cell: (row) => (
            <div className="text-[#697586] text-sm">
                {row.uploadedAtLabel}
            </div>
        )
    },
    {
        header: "Action",
        cell: (row) => (
            <Button
                onClick={() => handleView(row)}
                size="icon"
                className="flex justify-center items-center gap-2 border border-[#DFE1E7] [background:#F6F8FA] px-4 py-2 border-solid"
            >
                <ActionIcons.View className="w-6 h-6 text-[#697586]" />
            </Button>
        ),
    },
];

// 3. Usage in your Page
export default function DocumentInfoTable({ accountId }: { accountId: string }) {
    const [view, setView] = useState<Document | null>(null);
    const { data: docData } = useVendorDocuments(accountId);

    // Get the documents from the API response
    const documents: Document[] = docData?.data?.items || [];

    const handleView = (document: Document) => {
        setView(document);
    };

    return (
        <div className="">
            <div className="border-x border-t rounded-t-2xl rounded-b-none bg-white p-6">
                <div className="flex justify-between items-center self-stretch w-full">
                    <h2 className="section-title">Document Information</h2>
                    <div>
                        <label className="text-[#697586] text-sm font-normal leading-[160%]" htmlFor="sort">
                            Sort by:
                        </label>
                        <select
                            className="rounded-md p-1 text-[#2A3542] text-sm font-semibold leading-[160%] hover:bg-gray-50"
                            id="sort"
                        >
                            <option>Newest First</option>
                            <option>Oldest First</option>
                        </select>
                    </div>
                </div>
            </div>

            <DataTable columns={getColumns(handleView)} data={documents} />

            <CustomModal
                open={view !== null}
                onOpenChange={() => setView(null)}
                size="lg"
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
                {view && (
                    <ViewDoc onClose={() => setView(null)} document={view} />
                )}
            </CustomModal>
        </div>
    );
}