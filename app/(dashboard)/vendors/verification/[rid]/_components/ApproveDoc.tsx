"use client";
import CustomModal from "@/components/reusable/CustomModal";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ApproveDoc() {
    const [mode, setMode] = useState<"approve" | "reject" | null>(null);

    return (
        <>
            <div className="flex flex-col items-start gap-2.5 self-stretch [background:var(--BG-Linear,linear-gradient(180deg,#ECF1F8_0%,#FEFEFE_100%))] p-6 rounded-2xl">
                <h2 className="text-[color:var(--Secondary-700,#161618)] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px] mb-6">
                    Do you want to approve the documents?
                </h2>

                <div>
                    <p className="self-stretch text-[color:var(--Info,#3AC2C2)] [font-family:Inter] text-xs font-normal leading-[120%] mb-1">
                        Decision Required
                    </p>

                    <p className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Inter] text-base font-medium leading-[160%]">
                        Please verify all document details before submitting a final decision.
                    </p>
                </div>

                <div className="flex items-center gap-2 w-full">
                    <Button
                        variant="outline"
                        className="btn-outline flex-1 text-black h-12"
                        onClick={() => setMode("reject")}
                    >
                        Reject
                    </Button>

                    <Button
                        className="btn-primary flex-1 text-black h-12"
                        onClick={() => setMode("approve")}
                    >
                        Approve
                    </Button>
                </div>
            </div>

            {/* Reject Modal */}
            <CustomModal
                open={mode === "reject"}
                onOpenChange={(open) => !open && setMode(null)}
                closeButtonType="shadcn"
                size="md"
                className="p-10"
            >
                <ApproveRejectModal
                    onClose={() => setMode(null)}
                    mode="reject"
                />
            </CustomModal>

            {/* Approve Modal */}
            <CustomModal
                open={mode === "approve"}
                onOpenChange={(open) => !open && setMode(null)}
                closeButtonType="shadcn"
                size="md"
                className="p-10"
            >
                <ApproveRejectModal
                    onClose={() => setMode(null)}
                    mode="approve"
                />
            </CustomModal>
        </>
    );
}

const ApproveRejectModal = ({
    onClose,
    mode,
}: {
    onClose: () => void;
    mode: "approve" | "reject";
}) => {

    const router = useRouter();
    const handleBack = () => {
        onClose();
        router.push("/vendors/verification");
    }
    return (
        <div className="flex flex-col items-center justify-center gap-10">
            <div className="relative w-[157.907px] h-[159.88px] mb-6">
                <Image
                    src="/successCommon.svg"
                    alt="Status"
                    fill
                    className="object-cover"
                />
            </div>

            <div>
                <h2 className="text-[#070707] text-center font-lora text-2xl font-bold leading-[130%] tracking-[0.48px] mb-3">
                    {mode === "reject"
                        ? "Vendor Application Rejected!"
                        : "Vendor Application Successfully Approved!"}
                </h2>

                <p className="self-stretch text-[color:var(--Secondary-Text,#697586)] text-center [font-family:Inter] text-lg font-medium leading-[160%]">
                    {mode === "reject"
                        ? "The rejection notification has been sent to the vendor."
                        : "Vendor has been notified and granted platform access. They are now visible in the curated marketplace."}
                </p>
            </div>

            <div className="w-full">
                <button
                    className="btn-primary flex-1 text-black "
                    onClick={handleBack}
                >
                    Back to Manage Verification

                    <ArrowRightIcon className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};