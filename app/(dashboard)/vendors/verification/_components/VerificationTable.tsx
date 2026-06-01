"use client";

import EmptyState from "@/components/reusable/EmptyState";
import DataTable, { Column } from "@/components/reusable/table/DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { VendorVerification } from "@/types/vendor.types";
import { VendorVerificationList } from "@/types/vendor.types";

// Tick icon
const TickIcon = (
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.79167 7.9625L0 4.17083L1.3125 2.85833L3.79167 5.3375L9.12917 0L10.4417 1.3125L3.79167 7.9625Z"
      fill="#007070"
    />
  </svg>
);

// Document badge
function DocumentBadge({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-1 pl-2.5">
      <span className="flex w-6 h-6 justify-center items-center bg-[#3AC2C2] rounded-full">
        {TickIcon}
      </span>
      <span className="text-[#89A2C3] text-center text-[10px] font-medium leading-[120%]">
        {label}
      </span>
    </div>
  );
}

// Columns
const getColumns = (): Column<VendorVerification>[] => [
  {
    header: "Vendor ID",
    cell: (row) => (
      <div className="text-[#697586] text-sm font-medium ml-2">
        {row.vendorCode}
      </div>
    ),
  },
  {
    header: "Vendor Name",
    cell: (row) => (
      <div className="text-[#161618] text-sm font-medium ml-2">
        {row.vendorName}
      </div>
    ),
  },
  {
    header: "Document Provided",
    cell: (row) => (
      <div className="flex gap-4">
        {row.documents.businessLicense && (
          <DocumentBadge label="Business License" />
        )}
        {row.documents.healthPermit && (
          <DocumentBadge label="Health Permit" />
        )}
        {row.documents.insuranceProof && (
          <DocumentBadge label="Insurance Proof" />
        )}
      </div>
    ),
  },
  {
    header: "Submission Date",
    cell: (row) => (
      <div className="text-sm text-[#697586]">
        {row.submissionDateLabel}
      </div>
    ),
  },
  {
    header: "Action",
    cell: (row) => (
      <Link
        href={`/vendors/verification/${row.verificationId}`}
      >
        <Button className="bg-[#FFBB1C] hover:bg-[#e0a618] text-black font-bold rounded-xl px-6">
          Review
        </Button>
      </Link>
    ),
  },
];

interface Props {
  data: VendorVerificationList | undefined;
}

export default function PendingApplicationsPage({
  data,
}: Props) {
  return (
    <div>
      {data?.items?.length === 0 ? (
        <EmptyState
          title="No vendor applications found"
          description="Please try again later"
        />
      ) : (
        <>
          <div className="border-x border-t rounded-t-2xl bg-white p-6">
            <div className="flex justify-between items-center w-full">
              <h2 className="section-title">
                Pending Vendor Applications
              </h2>

              <div>
                <label
                  className="text-[#697586] text-sm"
                  htmlFor="sort"
                >
                  Sort by:
                </label>

                <select
                  className="rounded-md p-1 text-[#2A3542] text-sm font-semibold hover:bg-gray-50"
                  id="sort"
                >
                  <option>Newest First</option>
                  <option>Oldest First</option>
                </select>
              </div>
            </div>
          </div>

          <DataTable
            columns={getColumns()}
            data={data?.items ?? []}
          />
        </>
      )}
    </div>
  );
}