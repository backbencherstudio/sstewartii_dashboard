"use client";

import { useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";
import Image from "next/image";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useGetCustomerReportDetails } from "@/hooks/useCustomers";


type VendorReportSummary = {
    vendorId: string;
    vendorCode?: string;
    businessName?: string;
    coverImage?: string;
    reportCount?: number;
};

type ReportDetail = {
    id?: string;
    reportId?: string;
    reportCode?: string;
    date?: string;
    reportedAt?: string;
    createdAt?: string;
    reason?: string;
    reportReason?: string;
    details?: string;
    additionalDetails?: string;
    description?: string;
    comment?: string;
};

type ApiRecord = Record<string, unknown>;

function isRecord(value: unknown): value is ApiRecord {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getVendors(customerReports: unknown): VendorReportSummary[] {
    if (Array.isArray(customerReports)) {
        return customerReports as VendorReportSummary[];
    }

    if (!isRecord(customerReports)) {
        return [];
    }

    const data = customerReports.data;

    if (isRecord(data) && Array.isArray(data.vendors)) {
        return data.vendors as VendorReportSummary[];
    }

    if (Array.isArray(customerReports.vendors)) {
        return customerReports.vendors as VendorReportSummary[];
    }

    return Array.isArray(data) ? (data as VendorReportSummary[]) : [];
}

function getReportDetails(reportDetails: unknown): ReportDetail[] {
    if (Array.isArray(reportDetails)) {
        return reportDetails as ReportDetail[];
    }

    if (!isRecord(reportDetails)) {
        return [];
    }

    const data = reportDetails.data;

    if (isRecord(data) && Array.isArray(data.reports)) {
        return data.reports as ReportDetail[];
    }

    if (isRecord(data) && isRecord(data.data) && Array.isArray(data.data.reports)) {
        return data.data.reports as ReportDetail[];
    }

    if (isRecord(data) && Array.isArray(data.data)) {
        return data.data as ReportDetail[];
    }

    if (Array.isArray(data)) {
        return data as ReportDetail[];
    }

    if (Array.isArray(reportDetails.reports)) {
        return reportDetails.reports as ReportDetail[];
    }

    return [];
}

function formatReportDate(value?: string) {
    if (!value) {
        return "N/A";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString();
}

export default function ReportsAccordion({ customerReports }: { customerReports: unknown }) {
    const [openVendorId, setOpenVendorId] = useState<string>("");
    const vendors = getVendors(customerReports);

    if (!vendors.length) {
        return (
            <div className="w-full rounded-xl bg-white p-4">
                <h2 className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-sm font-bold leading-[130%] mb-3">
                    Reports
                </h2>
                <div className="flex items-center justify-center rounded-lg bg-[#F6F8FA] px-4 py-8 text-sm text-[#667085]">
                    No reports found.
                </div>
            </div>
        );
    }

    return (
        <div className="w-full  rounded-xl bg-white p-4">
            <h2 className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-sm font-bold leading-[130%] mb-3">
                Reports
            </h2>

            <div className="max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                <Accordion
                    type="single"
                    collapsible
                    className="space-y-2"
                    value={openVendorId}
                    onValueChange={setOpenVendorId}
                >
                    {vendors.map((vendor) => (
                        <VendorReportItem
                            key={vendor.vendorId}
                            vendor={vendor}
                            isOpen={openVendorId === vendor.vendorId}
                        />
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

function VendorReportItem({
    vendor,
    isOpen,
}: {
    vendor: VendorReportSummary;
    isOpen: boolean;
}) {
    const { data: reportDetails, isLoading, error } = useGetCustomerReportDetails(
        vendor.vendorId,
        isOpen
    );
    const reports = getReportDetails(reportDetails);
    const displayName = vendor.businessName || "Unknown vendor";

    return (
        <AccordionItem
            value={vendor.vendorId}
            className="overflow-hidden rounded-lg border-none bg-[#F6F8FA]"
        >
            <AccordionTrigger className="px-3 py-3 hover:no-underline [&>svg]:text-[#344054]">
                <div className="flex w-full items-center justify-between gap-4 pr-2">
                    <div className="flex items-center gap-3">
                        {vendor.coverImage ? (
                            <Image
                                src={vendor.coverImage}
                                alt={displayName}
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-[#667085]">
                                {displayName.charAt(0)}
                            </div>
                        )}

                        <div className="text-left">
                            <h3 className="text-sm font-semibold text-[#263244]">
                                {displayName}
                            </h3>
                            <p className="text-sm font-normal text-[#667085]">
                                ID: {vendor.vendorCode || vendor.vendorId}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-[#667085]">
                        <span>Report Count:</span>
                        <span className="font-semibold text-[#111827]">
                            {vendor.reportCount ?? 0}
                        </span>
                    </div>
                </div>
            </AccordionTrigger>

            <AccordionContent className="px-3 pb-3 ">
                <div className="space-y-0 border-t border-[#EAECF0]">
                    {isLoading ? (
                        <div className="py-3 text-sm text-[#667085]">Loading report details...</div>
                    ) : error ? (
                        <div className="py-3 text-sm text-red-500">Unable to load report details.</div>
                    ) : reports.length ? (
                        reports.map((report, index) => (
                            <ReportRow
                                key={report.reportId || report.id || `${vendor.vendorId}-${index}`}
                                report={report}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="py-3 text-sm text-[#667085]">No report details found.</div>
                    )}
                </div>
            </AccordionContent>
        </AccordionItem>
    );
}

function ReportRow({ report, index }: { report: ReportDetail; index: number }) {
    const reportId = report.reportCode || report.reportId || report.id || "N/A";
    const reason = report.reportReason || report.reason || "N/A";
    const details =
        report.additionalDetails ||
        report.details ||
        report.description ||
        report.comment ||
        "N/A";
    const date = formatReportDate(report.reportedAt || report.createdAt || report.date);

    return (
        <div className="flex items-center justify-between gap-2 border-b border-[#EAECF0] last:border-b-0 py-2">

            <div className="flex items-center gap-2">
                <span className="text-xs text-[#98A2B3] leading-none">
                    {index + 1}
                </span>

                <span className="text-xs font-medium text-[#667085] leading-none">
                    Report ID: {reportId}
                </span>
            </div>

            <div className="flex items-center gap-2 h-10 justify-center ">
                <span className="text-xs font-medium text-[#344054] leading-none">
                    {date}
                </span>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <button type="button" className="flex items-center">
                            <Info className="h-3.5 w-3.5 text-[#98A2B3]" />
                        </button>
                    </TooltipTrigger>

                    <TooltipContent
                        arrowVariant="light"
                        side="left"
                        sideOffset={10}
                        className="max-w-[430px] rounded-lg border border-[#EAECF0] bg-white px-5 py-4 shadow-xl 
             [&>svg]:fill-white [&>svg]:stroke-[#EAECF0]"
                    >
                        <div className="space-y-5">
                            <div>
                                <p className="mb-2 text-sm font-normal text-[#667085]">
                                    Reason for report
                                </p>
                                <p className="m-0 text-base font-normal leading-[150%] text-[#101828]">
                                    {reason}
                                </p>
                            </div>

                            <div>
                                <p className="mb-2 text-sm font-normal text-[#667085]">
                                    Additional Details
                                </p>
                                <p className="m-0 text-base font-normal leading-[150%] text-[#101828]">
                                    {details}
                                </p>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </div>

        </div>
    );
}