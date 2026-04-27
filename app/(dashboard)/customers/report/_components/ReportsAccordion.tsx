"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Info } from "lucide-react";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip as TooltipPrimitive } from "radix-ui"

type Report = {
    id: string;
    date: string;
    reason: string;
    details: string;
};

type ReportUser = {
    id: string;
    name: string;
    userId: string;
    image: string;
    reports: Report[];
};

const reportUsers: ReportUser[] = [
    {
        id: "1",
        name: "Sophia Lee",
        userId: "#24781",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=100",
        reports: [
            { id: "#58392", date: "01-15-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." },
            { id: "#92746", date: "01-17-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." },
            { id: "#10583", date: "01-23-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." },
        ],
    },
    {
        id: "2",
        name: "Michael Carter",
        userId: "#65734",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100",
        reports: [{ id: "#22145", date: "01-18-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." }],
    },
    {
        id: "3",
        name: "Emma Wilson",
        userId: "#13456",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=100",
        reports: [
            {
                id: "#58392",
                date: "01-15-2027",
                reason: "Customer did not arrive",
                details:
                    "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me.",
            },
        ]
    },
    {
        id: "4",
        name: "Liam Brown",
        userId: "#88902",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100",
        reports: [
            { id: "#30125", date: "01-12-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." },
            { id: "#30126", date: "01-13-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." },
            { id: "#30127", date: "01-14-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." },

        ],
    },
    {
        id: "5",
        name: "Noah Johnson",
        userId: "#56219",
        image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=100",
        reports: [{ id: "#11892", date: "01-19-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." }],
    },
    {
        id: "6",
        name: "Olivia Smith",
        userId: "#47382",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=100",
        reports: [{ id: "#66721", date: "01-25-2027", reason: "Customer did not arrive", details: "Describe the situation, e.g., waited for 30 mins, tried calling twice but didn’t show on me." }],
    },
];

export default function ReportsAccordion() {
    return (
        <div className="w-full  rounded-xl bg-white p-4">
            <h2 className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-sm font-bold leading-[130%] mb-3">
                Reports
            </h2>

            <div className="max-h-[360px] overflow-y-auto pr-2 custom-scrollbar">
                <Accordion type="single" collapsible className="space-y-2">
                    {reportUsers.map((user) => (
                        <AccordionItem
                            key={user.id}
                            value={user.id}
                            className="overflow-hidden rounded-lg border-none bg-[#F6F8FA]"
                        >
                            <AccordionTrigger className="px-3 py-3 hover:no-underline [&>svg]:text-[#344054]">
                                <div className="flex w-full items-center justify-between gap-4 pr-2">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={user.image}
                                            alt={user.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />

                                        <div className="text-left">
                                            <h3 className="text-sm font-semibold text-[#263244]">
                                                {user.name}
                                            </h3>
                                            <p className="text-sm font-normal text-[#667085]">
                                                ID: {user.userId}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1 text-sm text-[#667085]">
                                        <span>Report Count:</span>
                                        <span className="font-semibold text-[#111827]">
                                            {user.reports.length}
                                        </span>
                                    </div>
                                </div>
                            </AccordionTrigger>

                            <AccordionContent className="px-3 pb-3 ">
                                <div className="space-y-0 border-t border-[#EAECF0]">
                                    {user.reports.map((report, index) => (
                                        <div className="flex items-center justify-between gap-2 border-b border-[#EAECF0] last:border-b-0 py-2">

                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-[#98A2B3] leading-none">
                                                    {index + 1}
                                                </span>

                                                <span className="text-xs font-medium text-[#667085] leading-none">
                                                    Report ID: {report.id}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2 h-10 justify-center ">
                                                <span className="text-xs font-medium text-[#344054] leading-none">
                                                    {report.date}
                                                </span>


                                                {/* <Tooltip>
                                                    <TooltipTrigger>Hover</TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Add to library</p>
                                                    </TooltipContent>
                                                </Tooltip> */}

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
                                                                    {report.reason}
                                                                </p>
                                                            </div>

                                                            <div>
                                                                <p className="mb-2 text-sm font-normal text-[#667085]">
                                                                    Additional Details
                                                                </p>
                                                                <p className="m-0 text-base font-normal leading-[150%] text-[#101828]">
                                                                    {report.details}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    

                                                    </TooltipContent>
                                                </Tooltip>

                                            </div>

                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}