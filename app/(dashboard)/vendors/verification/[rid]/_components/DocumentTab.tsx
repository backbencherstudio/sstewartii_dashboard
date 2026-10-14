"use client";

import React from "react";
import { AlertTriangle, FileText, History } from "lucide-react";
import VendorDetailCard from "./VendorDetailCard";
import DocumentTable from "./DocumentTable";
import ApproveDoc from "./ApproveDoc";
import {
  DocumentItem,
  VendorDetails,
  VendorVerificationData,
  VendorVerificationStatus,
} from "@/types/vendor.types";
import { useVendorVerificationDetails } from "@/hooks/useVendor";
import { formatDate } from "@/lib/utils";

function VerificationStatusBadge({ status }: { status: string }) {
  const normalized = (status || "").toUpperCase();
  const styles =
    normalized === "APPROVED"
      ? "bg-[#1A9844]"
      : normalized === "REJECTED"
        ? "bg-[#D92D20]"
        : "bg-[#DC6803]";

  return (
    <span
      className={`inline-flex justify-center items-center gap-2.5 px-4 py-2 rounded-lg text-white text-xs font-semibold leading-[120%] tracking-wide ${styles}`}
    >
      {normalized || "UNKNOWN"}
    </span>
  );
}

function InfoGrid({ rows }: { rows: { label: string; value: string }[] }) {
  return (
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
  );
}

function CardShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start gap-6 border border-[color:var(--background-hover-50,#ECEFF3)] bg-white p-6 rounded-2xl border-solid">
      <div className="flex items-center gap-2.5">
        <FileText className="w-[10.667px] h-[13.333px] text-[var(--Secondary-Text,#697586)]" />
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function VerificationOverviewCard({ data }: { data: VendorVerificationData }) {
  return (
    <CardShell title="Verification Overview">
      <InfoGrid
        rows={[
          {
            label: "Submitted At",
            value: data?.submittedAtLabel || (data?.submittedAt ? formatDate(data.submittedAt) : "-"),
          },
          { label: "Overall Status", value: data?.status || "-" },
          {
            label: "Credential Review",
            value: data?.credentialReview?.status || "-",
          },
          {
            label: "Business Document Review",
            value: data?.businessDocumentReview?.status || "-",
          },
          {
            label: "Business Document Uploaded",
            value: data?.businessDocumentReview?.uploaded ? "Yes" : "No",
          },
        ]}
      />
      {data?.decision?.message && (
        <div className="flex flex-col gap-1 w-full bg-[#F8FAFB] border border-[#ECEFF3] rounded-xl p-4">
          <span className="text-[#697586] [font-family:Inter] text-[10px] font-semibold leading-[120%] uppercase tracking-wide">
            Decision
          </span>
          <span className="text-[#2A3542] [font-family:Inter] text-sm font-medium leading-[150%]">
            {data.decision.message}
          </span>
        </div>
      )}
    </CardShell>
  );
}

function CredentialInfoCard({ data }: { data: VendorVerificationData }) {
  return (
    <CardShell title="Credential Information">
      <InfoGrid
        rows={[
          { label: "Credential Number", value: data?.credentialNumber || "-" },
          { label: "Issuing Authority", value: data?.issuingAuthority || "-" },
          { label: "Credential State", value: data?.credentialState || "-" },
          {
            label: "Credential Jurisdiction",
            value: data?.credentialJurisdiction || "-",
          },
          {
            label: "Expiration Date",
            value: data?.expirationDate ? formatDate(data.expirationDate) : "-",
          },
          { label: "Permit Holder Name", value: data?.permitHolderName || "-" },
          { label: "Verified ID Name", value: data?.verifiedIdName || "-" },
          {
            label: "Credential Review Status",
            value: data?.credentialReview?.status || "-",
          },
        ]}
      />
    </CardShell>
  );
}

function NameComparisonCard({ data }: { data: VendorVerificationData }) {
  const matches = data?.permitHolderNameMatchesVerifiedId;
  const manualReview = data?.manualReviewRequired;

  return (
    <CardShell title="Name Comparison">
      <InfoGrid
        rows={[
          {
            label: "Verified ID Name",
            value: data?.nameComparison?.verifiedIdName || data?.verifiedIdName || "-",
          },
          {
            label: "Permit Holder Name",
            value: data?.nameComparison?.permitHolderName || data?.permitHolderName || "-",
          },
          {
            label: "Business Name",
            value: data?.nameComparison?.businessName || data?.vendor?.businessName || "-",
          },
          {
            label: "Names Match",
            value: matches ? "Matched" : "Mismatch",
          },
          {
            label: "Manual Review Required",
            value: manualReview ? "Yes" : "No",
          },
          {
            label: "Can Approve / Can Reject",
            value: `${data?.decision?.canApprove ? "Yes" : "No"} / ${data?.decision?.canReject ? "Yes" : "No"}`,
          },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2 w-full">
        <span
          className={`inline-flex justify-center items-center gap-2.5 px-4 py-2 rounded-lg text-white text-xs font-semibold leading-[120%] ${
            matches ? "bg-[#1A9844]" : "bg-[#D92D20]"
          }`}
        >
          {matches ? "Names Matched" : "Names Mismatch"}
        </span>
        {manualReview && (
          <span className="inline-flex justify-center items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FEF0C7] text-[#B54708] text-xs font-semibold leading-[120%]">
            <AlertTriangle className="w-3.5 h-3.5" />
            Manual Review Required
          </span>
        )}
      </div>
    </CardShell>
  );
}

function ReviewHistoryCard({ data }: { data: VendorVerificationData }) {
  const history = data?.reviewHistory ?? [];

  return (
    <div className="flex flex-col items-start gap-6 border border-[color:var(--background-hover-50,#ECEFF3)] bg-white p-6 rounded-2xl border-solid">
      <div className="flex items-center gap-2.5">
        <History className="w-3.5 h-3.5 text-[var(--Secondary-Text,#697586)]" />
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-xs font-normal leading-[120%]">
          Review History ({history.length})
        </span>
      </div>

      {history.length === 0 ? (
        <p className="text-[#697586] [font-family:Inter] text-sm font-normal leading-[150%]">
          No review history yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4 w-full">
          {history.map((item, index) => (
            <div
              key={item.id || index}
              className="flex flex-col gap-2 w-full bg-[#F8FAFB] border border-[#ECEFF3] rounded-xl p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                {item.kind && (
                  <span className="inline-flex px-3 py-1 rounded-lg bg-[#ECF1F8] text-[#2A3542] text-[11px] font-semibold leading-[120%]">
                    {item.kind}
                  </span>
                )}
                {item.status && (
                  <span className="inline-flex px-3 py-1 rounded-lg bg-[#2A3542] text-white text-[11px] font-semibold leading-[120%]">
                    {item.status}
                  </span>
                )}
                <span className="text-[#697586] text-[11px] font-normal leading-[120%] ml-auto">
                  {item.reviewedAt ? formatDate(item.reviewedAt) : ""}
                </span>
              </div>
              {item.result && (
                <p className="text-[#2A3542] [font-family:Inter] text-sm font-medium leading-[150%]">
                  {item.result}
                </p>
              )}
              {item.reason && (
                <p className="text-[#697586] [font-family:Inter] text-sm font-normal leading-[150%]">
                  {item.reason}
                </p>
              )}
              {item.reviewerId && (
                <p className="text-[#697586] [font-family:Inter] text-[11px] font-normal leading-[120%]">
                  Reviewer: {item.reviewerId}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DocumentTab({ id }: { id: string }) {
  const { data: vendorVerificationDetails, isLoading, isError } =
    useVendorVerificationDetails(id);

  if (isLoading) {
    return <p className="text-[#2A3542] text-base">Loading documents...</p>;
  }

  if (isError || !vendorVerificationDetails) {
    return (
      <p className="text-[#2A3542] text-base">Unable to load documents.</p>
    );
  }

  const vendorDetails = vendorVerificationDetails?.vendor as VendorDetails;
  const vendorDocs =
    (vendorVerificationDetails?.documents as DocumentItem[]) || [];

  return (
    <>
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-[#1A1C1E] font-lora text-2xl font-bold leading-[130%] tracking-[0.48px]">
            Reviewing documents
          </h2>
          <VerificationStatusBadge status={vendorVerificationDetails?.status} />
        </div>

        <p className="text-[#2A3542] text-base font-normal leading-6">
          Submitted on {vendorVerificationDetails?.submittedAtLabel} • ID:{" "}
          {vendorVerificationDetails?.vendorCode}
        </p>
      </div>
      <section className="grid md:grid-cols-[70%_30%] grid-cols-1 gap-6">
        <div className="space-y-6">
          <DocumentTable docData={vendorDocs} />

          <VerificationOverviewCard data={vendorVerificationDetails} />

          <CredentialInfoCard data={vendorVerificationDetails} />

          <NameComparisonCard data={vendorVerificationDetails} />

          <ReviewHistoryCard data={vendorVerificationDetails} />

          <ApproveDoc
            verificationId={id}
            verificationStatus={
              vendorVerificationDetails?.status as VendorVerificationStatus
            }
          />
        </div>

        <div>
          <VendorDetailCard data={vendorDetails} />
        </div>
      </section>
    </>
  );
}
