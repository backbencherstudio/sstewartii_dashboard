"use client";

import React, { useState } from "react";
import { AlertTriangle, FileText, History } from "lucide-react";
import VendorDetailCard from "./VendorDetailCard";
import DocumentTable from "./DocumentTable";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DocumentItem,
  VendorDetails,
  VendorVerificationData,
  VerificationReviewKind,
  VerificationReviewStatus,
} from "@/types/vendor.types";
import {
  useReviewVerificationDocument,
  useVendorVerificationDetails,
} from "@/hooks/useVendor";
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
            value:
              data?.submittedAtLabel ||
              (data?.submittedAt ? formatDate(data.submittedAt) : "-"),
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
            value:
              data?.nameComparison?.verifiedIdName ||
              data?.verifiedIdName ||
              "-",
          },
          {
            label: "Permit Holder Name",
            value:
              data?.nameComparison?.permitHolderName ||
              data?.permitHolderName ||
              "-",
          },
          {
            label: "Business Name",
            value:
              data?.nameComparison?.businessName ||
              data?.vendor?.businessName ||
              "-",
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

export const REVIEW_STATUS_OPTIONS: {
  value: VerificationReviewStatus;
  label: string;
}[] = [
  { value: "APPROVED", label: "Approve" },
  { value: "NEEDS_REVIEW", label: "Needs Review" },
  { value: "REJECTED", label: "Reject" },
];

function SeparateReviewCard({
  verificationId,
  kind,
  title,
  description,
  currentStatus,
  uploaded,
  resultPlaceholder,
  reasonPlaceholder,
}: {
  verificationId: string;
  kind: VerificationReviewKind;
  title: string;
  description: string;
  currentStatus: string;
  uploaded?: boolean;
  resultPlaceholder: string;
  reasonPlaceholder: string;
}) {
  const { mutate: reviewDocument, isPending } = useReviewVerificationDocument();
  const [status, setStatus] = useState<VerificationReviewStatus>("APPROVED");
  const [result, setResult] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const normalized = (currentStatus || "").toUpperCase();
  const badgeStyles =
    normalized === "APPROVED"
      ? "bg-[#1A9844]"
      : normalized === "REJECTED"
        ? "bg-[#D92D20]"
        : "bg-[#DC6803]";

  const handleSubmit = () => {
    if (result.trim().length < 3 || reason.trim().length < 3) {
      setError("Result and reason are required (min 3 characters).");
      return;
    }
    setError("");
    reviewDocument(
      {
        verificationId,
        kind,
        payload: {
          status,
          result: result.trim(),
          reason: reason.trim(),
        },
      },
      {
        onSuccess: () => {
          setResult("");
          setReason("");
        },
      },
    );
  };

  return (
    <div className="flex flex-col items-start gap-2.5 self-stretch [background:var(--BG-Linear,linear-gradient(180deg,#ECF1F8_0%,#FEFEFE_100%))] p-6 rounded-2xl">
      <div className="flex items-center gap-3 flex-wrap w-full">
        <h2 className="text-[color:var(--Secondary-700,#161618)] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px]">
          {title}
        </h2>
        <span
          className={`inline-flex justify-center items-center gap-2.5 px-4 py-2 rounded-lg text-white text-xs font-semibold leading-[120%] tracking-wide ${badgeStyles}`}
        >
          {normalized || "UNKNOWN"}
        </span>
      </div>

      <div>
        <p className="self-stretch text-[color:var(--Info,#3AC2C2)] [font-family:Inter] text-xs font-normal leading-[120%] mb-1">
          Decision Required
        </p>
        <p className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Inter] text-base font-medium leading-[160%]">
          {description}
        </p>
      </div>

      {uploaded === false && (
        <div className="flex items-center gap-2 w-full bg-[#FFFAEB] border border-[#FEDF89] rounded-xl p-4">
          <AlertTriangle className="w-4 h-4 text-[#B54708] shrink-0" />
          <p className="text-[#B54708] [font-family:Inter] text-sm font-medium leading-[150%]">
            No business document uploaded. You can still request review or
            reject with a reason.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 w-full flex-wrap">
        {REVIEW_STATUS_OPTIONS.map((option) => {
          const active = status === option.value;
          const activeColors: Record<VerificationReviewStatus, string> = {
            APPROVED: "#1A9844",
            NEEDS_REVIEW: "#DC6803",
            REJECTED: "#D92D20",
          };
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => setStatus(option.value)}
              style={
                active
                  ? {
                      backgroundColor: activeColors[option.value],
                      borderColor: activeColors[option.value],
                      color: "#fff",
                    }
                  : {
                      backgroundColor: "#fff",
                      borderColor: "#DFE1E7",
                      color: "#000",
                    }
              }
              className={`flex-1 h-12 min-w-[120px] rounded-lg border border-solid text-sm font-semibold transition-colors cursor-pointer ${
                active ? "hover:opacity-90" : "hover:bg-gray-50"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor={`${kind}-result`}>Result</Label>
        <textarea
          id={`${kind}-result`}
          rows={3}
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder={resultPlaceholder}
          className="w-full rounded-lg border border-input bg-white px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      <div className="space-y-2 w-full">
        <Label htmlFor={`${kind}-reason`}>Reason</Label>
        <textarea
          id={`${kind}-reason`}
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={reasonPlaceholder}
          className="w-full rounded-lg border border-input bg-white px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <Button
        type="button"
        className="btn-primary w-full text-black h-12"
        disabled={isPending}
        onClick={handleSubmit}
      >
        {isPending ? "Saving..." : `Save ${title.toLowerCase()}`}
      </Button>
    </div>
  );
}

function formatReviewKind(kind: string): string {
  const normalized = (kind || "").toLowerCase().replace(/_/g, "-");
  if (normalized.includes("business")) return "Business Document";
  if (
    normalized.includes("credential") ||
    normalized.includes("permit") ||
    normalized.includes("license")
  )
    return "Permit";
  if (!kind) return "-";
  return kind.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
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
                {item.item && (
                  <span
                    style={{ backgroundColor: "#ECF1F8", color: "#2A3542" }}
                    className="inline-flex px-3 py-1 rounded-lg text-[11px] font-semibold leading-[120%]"
                  >
                    {formatReviewKind(item.item || "")}
                  </span>
                )}
                {item.status && (
                  <span
                    style={{
                      backgroundColor:
                        item.status.toUpperCase() === "APPROVED"
                          ? "#1A9844"
                          : item.status.toUpperCase() === "REJECTED"
                            ? "#D92D20"
                            : "#2A3542",
                      color: "#fff",
                    }}
                    className="inline-flex px-3 py-1 rounded-lg text-[11px] font-semibold leading-[120%]"
                  >
                    {item.status}
                  </span>
                )}
                <span className="text-[#697586] text-[11px] font-normal leading-[120%] ml-auto">
                  {item.reviewedAt ? formatDate(item.reviewedAt) : ""}
                </span>
              </div>
              {item.result && (
                <p className="text-sm leading-[150%]">
                  <span className="font-semibold text-[#697586] text-xs uppercase tracking-wide mr-1.5">
                    Result:
                  </span>
                  <span className="font-medium text-[#2A3542]">
                    {" "}
                    {item.result}
                  </span>
                </p>
              )}
              {item.reason && (
                <p className="text-sm leading-[150%]">
                  <span className="font-semibold text-[#697586] text-xs uppercase tracking-wide mr-1.5">
                    Reason:
                  </span>
                  <span className="text-[#585D63]"> {item.reason}</span>
                </p>
              )}
              {item.reviewerId && (
                <p className="text-[#697586] [font-family:Inter] text-[11px] font-normal leading-[120%]">
                  Reviewer: {item.reviewerName ?? item.reviewerId ?? ""}
                  {/* {item.source ? ` • ${item.source}` : ""} */}
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
  const {
    data: vendorVerificationDetails,
    isLoading,
    isError,
  } = useVendorVerificationDetails(id);

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

          <SeparateReviewCard
            verificationId={id}
            kind="credential"
            title="Permit review"
            description="Review the permit details and file separately before submitting a decision."
            currentStatus={
              vendorVerificationDetails?.credentialReview?.status || ""
            }
            resultPlaceholder="e.g. Permit details match the ID record and are valid."
            reasonPlaceholder="e.g. No issues found"
          />

          <SeparateReviewCard
            verificationId={id}
            kind="business-document"
            title="Business document review"
            description="Review the business license separately before submitting a decision."
            currentStatus={
              vendorVerificationDetails?.businessDocumentReview?.status || ""
            }
            uploaded={
              vendorVerificationDetails?.businessDocumentReview?.uploaded
            }
            resultPlaceholder="e.g. Business document matches the registered business name."
            reasonPlaceholder="e.g. Business name mismatch"
          />
        </div>

        <div>
          <VendorDetailCard data={vendorDetails} />
        </div>
      </section>
    </>
  );
}
