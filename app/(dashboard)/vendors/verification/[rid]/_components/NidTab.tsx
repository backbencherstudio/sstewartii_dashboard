"use client";

import CustomModal from "@/components/reusable/CustomModal";
import { Button } from "@/components/ui/button";
import {
  useApproveNIDVerification,
  useNIDVerificationDetails,
  useRejectNIDVerification,
} from "@/hooks/useVendor";
import { formatDate } from "@/lib/utils";
import { DocumentItem, NidKycStatus, VendorDetails, VendorNidVerificationDetails } from "@/types/vendor.types";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowRightIcon, FileText } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import DocumentTable from "./DocumentTable";
import VendorDetailCard from "./VendorDetailCard";

function fileNameFromUrl(url: string, fallback: string) {
  if (!url) return fallback;
  const segment = url.split("?")[0].split("/").pop();
  return segment || fallback;
}

function toDocumentItems(data: VendorNidVerificationDetails): DocumentItem[] {
  const doc = data?.kycProfile?.document;
  const selfies = data?.kycProfile?.selfie?.images ?? [];
  const inactive = data?.kycStatus === "REJECTED";
  const status = inactive ? "INACTIVE" : "ACTIVE";

  const items: DocumentItem[] = [];

  if (doc?.frontImageUrl) {
    items.push({
      serial: "01",
      type: doc.type || "NATIONAL_ID",
      label: "National ID — Front",
      fileName: fileNameFromUrl(doc.frontImageUrl, "nid-front.jpg"),
      fileUrl: doc.frontImageUrl,
      status,
    });
  }

  if (doc?.backImageUrl) {
    items.push({
      serial: "02",
      type: doc?.type || "NATIONAL_ID",
      label: "National ID — Back",
      fileName: fileNameFromUrl(doc.backImageUrl, "nid-back.jpg"),
      fileUrl: doc.backImageUrl,
      status,
    });
  }

  selfies.forEach((selfie, index) => {
    items.push({
      serial: String(items.length + 1).padStart(2, "0"),
      type: "SELFIE",
      label: `Selfie — ${selfie.pose || `#${index + 1}`}`,
      fileName: fileNameFromUrl(selfie.imageUrl, `selfie-${index + 1}.jpg`),
      fileUrl: selfie.imageUrl,
      status,
    });
  });

  return items;
}

function KycStatusBadge({ status }: { status: NidKycStatus }) {
  const normalized = (status || "").toUpperCase();
  const styles =
    normalized === "APPROVED"
      ? "bg-[#1A9844]"
      : normalized === "REJECTED"
        ? "bg-[#D92D20]"
        : "bg-[#DC6803]";
  const label =
    normalized === "PENDING_REVIEW"
      ? "PENDING REVIEW"
      : normalized || "UNKNOWN";

  return (
    <span
      className={`inline-flex justify-center items-center gap-2.5 px-4 py-2 rounded-lg text-white text-xs font-semibold leading-[120%] tracking-wide ${styles}`}
    >
      {label}
    </span>
  );
}

function NidIdentityCard({ data }: { data: VendorNidVerificationDetails }) {
  const kyc = data?.kycProfile;
  const rows = [
    { label: "Document Type", value: kyc?.document?.type || "-" },
    { label: "Document Number", value: kyc?.document?.documentNumber || "-" },
    { label: "Verified ID Name", value: kyc?.verifiedIdName || "-" },
    { label: "Owner Name", value: data?.owner?.name || "-" },
    { label: "Business Name", value: data?.businessName || "-" },
    {
      label: "Submitted At",
      value: kyc?.submittedAt ? formatDate(kyc.submittedAt) : "-",
    },
    {
      label: "Reviewed At",
      value: kyc?.reviewedAt ? formatDate(kyc.reviewedAt) : "-",
    },
    {
      label: "Verified At",
      value: kyc?.verifiedAt ? formatDate(kyc.verifiedAt) : "-",
    },
  ];

  return (
    <div className="flex flex-col items-start gap-6 border border-[color:var(--background-hover-50,#ECEFF3)] bg-white p-6 rounded-2xl border-solid">
      <div className="flex items-center gap-2.5">
        <FileText className="w-[10.667px] h-[13.333px] text-[var(--Secondary-Text,#697586)]" />
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">
          NID Information
        </span>
      </div>

      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 w-full">
        {rows.map((info, index) => (
          <div key={index} className="flex flex-col">
            <span className="self-stretch text-[rgba(80,69,51,0.70)] [font-family:Inter] text-[10px] font-normal leading-[120%]">
              {info.label}
            </span>
            <span className="self-stretch text-[color:var(--Neutrals-04,#585D63)] [font-family:Lora] text-sm font-bold leading-[130%] break-words">
              {info.value || "-"}
            </span>
          </div>
        ))}
      </div>

      {kyc?.rejectionReason && (
        <div className="flex flex-col gap-1 w-full bg-[#FEF3F2] border border-[#FECDCA] rounded-xl p-4">
          <span className="text-[#D92D20] [font-family:Inter] text-[10px] font-semibold leading-[120%] uppercase tracking-wide">
            Rejection Reason
          </span>
          <span className="text-[#912018] [font-family:Inter] text-sm font-medium leading-[150%]">
            {kyc.rejectionReason}
          </span>
        </div>
      )}
    </div>
  );
}

function NidSelfieCard({ data }: { data: VendorNidVerificationDetails }) {
  const images = data?.kycProfile?.selfie?.images ?? [];
  if (images.length === 0) return null;

  return (
    <div className="flex flex-col items-start gap-6 border border-[color:var(--background-hover-50,#ECEFF3)] bg-white p-6 rounded-2xl border-solid">
      <div className="flex items-center gap-2.5">
        <FileText className="w-[10.667px] h-[13.333px] text-[var(--Secondary-Text,#697586)]" />
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">
          Selfie Verification
        </span>
      </div>

      <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 w-full">
        {images.map((img, index) => (
          <a
            key={`${img.imageUrl}-${index}`}
            href={img.imageUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-2 border border-[#ECEFF3] rounded-xl overflow-hidden bg-[#F8FAFB] hover:shadow-md transition-shadow"
          >
            <div className="relative w-full h-[180px] bg-gray-100">
              <Image
                src={img.imageUrl}
                alt={`Selfie ${img.pose || index + 1}`}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform"
              />
            </div>
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-[#2A3542] text-xs font-semibold leading-[120%]">
                {img.pose || `Pose ${index + 1}`}
              </span>
              <span className="text-[#697586] text-[10px] font-normal leading-[120%]">
                {img.uploadedAt ? formatDate(img.uploadedAt) : ""}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

function ApproveNid({
  vendorId,
  kycStatus,
}: {
  vendorId: string;
  kycStatus: NidKycStatus;
}) {
  const [mode, setMode] = useState<"approve" | "reject" | null>(null);
  const queryClient = useQueryClient();
  const { mutate: approveNid, isPending: isApproving } =
    useApproveNIDVerification();
  const { mutate: rejectNid, isPending: isRejecting } =
    useRejectNIDVerification();
  const isPending = isApproving || isRejecting;

  const invalidate = () => {
    queryClient.invalidateQueries({
      queryKey: ["nid-verification-details", vendorId],
    });
    queryClient.invalidateQueries({ queryKey: ["nid-verification-details"] });
    queryClient.invalidateQueries({ queryKey: ["nid-verifications"] });
  };

  const handleApprove = () => {
    approveNid(vendorId, {
      onSuccess: () => {
        toast.success("NID approved successfully");
        invalidate();
        setMode("approve");
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error(
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to approve NID",
        );
      },
    });
  };

  const handleReject = () => {
    rejectNid(vendorId, {
      onSuccess: () => {
        toast.success("NID rejected successfully");
        invalidate();
        setMode("reject");
      },
      onError: (error: unknown) => {
        console.log(error);
        toast.error(
          (error as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to reject NID",
        );
      },
    });
  };

  if (kycStatus === "APPROVED" || kycStatus === "REJECTED") {
    return (
      <div className="flex flex-col items-start gap-2.5 self-stretch [background:var(--BG-Linear,linear-gradient(180deg,#ECF1F8_0%,#FEFEFE_100%))] p-6 rounded-2xl ">
        <p className="self-stretch text-[#2A3542] text-base font-medium leading-[160%] text-center">
          {kycStatus === "APPROVED"
            ? "You have already approved this NID."
            : "You have already rejected this NID."}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-start gap-2.5 self-stretch [background:var(--BG-Linear,linear-gradient(180deg,#ECF1F8_0%,#FEFEFE_100%))] p-6 rounded-2xl">
        <h2 className="text-[color:var(--Secondary-700,#161618)] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px] mb-6">
          Do you want to approve this NID?
        </h2>

        <div>
          <p className="self-stretch text-[color:var(--Info,#3AC2C2)] [font-family:Inter] text-xs font-normal leading-[120%] mb-1">
            Decision Required
          </p>

          <p className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Inter] text-base font-medium leading-[160%]">
            Please verify NID front, back and selfie before submitting a final
            decision.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Button
            variant="outline"
            className="btn-outline flex-1 text-black h-12"
            onClick={handleReject}
            disabled={isPending}
          >
            {isRejecting ? "Rejecting..." : "Reject"}
          </Button>

          <Button
            className="btn-primary flex-1 text-black h-12"
            onClick={handleApprove}
            disabled={isPending}
          >
            {isApproving ? "Approving..." : "Approve"}
          </Button>
        </div>
      </div>

      <CustomModal
        open={mode === "reject"}
        onOpenChange={(open) => !open && setMode(null)}
        closeButtonType="shadcn"
        size="md"
        className="p-10"
      >
        <ApproveRejectModal onClose={() => setMode(null)} mode="reject" />
      </CustomModal>

      <CustomModal
        open={mode === "approve"}
        onOpenChange={(open) => !open && setMode(null)}
        closeButtonType="shadcn"
        size="md"
        className="p-10"
      >
        <ApproveRejectModal onClose={() => setMode(null)} mode="approve" />
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
  };
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
            ? "Vendor NID Rejected!"
            : "Vendor NID Successfully Approved!"}
        </h2>

        <p className="self-stretch text-[color:var(--Secondary-Text,#697586)] text-center [font-family:Inter] text-lg font-medium leading-[160%]">
          {mode === "reject"
            ? "The rejection notification has been sent to the vendor."
            : "Vendor has been notified and granted platform access. They are now visible in the curated marketplace."}
        </p>
      </div>

      <div className="w-full">
        <button className="btn-primary flex-1 text-black " onClick={handleBack}>
          Back to Manage Verification
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default function NidTab({ vendorId }: { vendorId: string }) {
  const {
    data: vendorNidDetails,
    isLoading,
    isError,
  } = useNIDVerificationDetails(vendorId);

  if (isLoading) {
    return <p className="text-[#2A3542] text-base">Loading NID details...</p>;
  }

  if (isError || !vendorNidDetails) {
    return (
      <p className="text-[#2A3542] text-base">Unable to load NID details.</p>
    );
  }

  const nidDocs = toDocumentItems(vendorNidDetails);

  const vendorDetails: VendorDetails = {
    id: vendorNidDetails.id,
    vendorCode: vendorNidDetails.vendorCode,
    businessName: vendorNidDetails.businessName,
    coverImage: vendorNidDetails.coverImage ?? undefined,
    ownerName: vendorNidDetails.owner?.name ?? "",
    ownerEmail: vendorNidDetails.owner?.email ?? "",
    publicEmail: vendorNidDetails.publicEmail ?? "",
    contactNumber: vendorNidDetails.contactNumber ?? "",
    joinedAt: vendorNidDetails.createdAt ?? "",
    joinedAtLabel: vendorNidDetails.createdAt
      ? formatDate(vendorNidDetails.createdAt)
      : "",
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[#1A1C1E] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px]">
            Reviewing NID
          </h2>
          <KycStatusBadge status={vendorNidDetails.kycStatus} />
        </div>

        <p className="text-[#2A3542] text-base font-normal leading-6">
          Submitted on{" "}
          {vendorNidDetails?.kycProfile?.submittedAt
            ? formatDate(vendorNidDetails.kycProfile.submittedAt)
            : "-"}{" "}
          • ID: {vendorNidDetails?.vendorCode}
        </p>
      </div>
      <section className="grid md:grid-cols-[70%_30%] grid-cols-1 gap-6">
        <div className="space-y-6">
          <DocumentTable docData={nidDocs} />

          <NidIdentityCard data={vendorNidDetails} />

          <NidSelfieCard data={vendorNidDetails} />

          <ApproveNid
            vendorId={vendorId}
            kycStatus={vendorNidDetails.kycStatus}
          />
        </div>

        <div>
          <VendorDetailCard data={vendorDetails} />
        </div>
      </section>
    </>
  );
}
