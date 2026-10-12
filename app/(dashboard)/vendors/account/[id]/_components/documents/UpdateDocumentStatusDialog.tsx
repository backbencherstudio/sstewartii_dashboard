"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomModal from "@/components/reusable/CustomModal";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useReviewVerificationDocument } from "@/hooks/useVendor";
import type { DocumentItem } from "@/types/vendorAccount.types";
import type {
  VerificationReviewKind,
  VerificationReviewStatus,
} from "@/types/vendor.types";

const reviewSchema = z.object({
  status: z.enum(["APPROVED", "NEEDS_REVIEW", "REJECTED"]),
  result: z.string().trim().min(3, "Result is required (min 3 characters)"),
  reason: z.string().trim().min(3, "Reason is required (min 3 characters)"),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

export const REVIEW_STATUS_OPTIONS: {
  value: VerificationReviewStatus;
  label: string;
}[] = [
  { value: "APPROVED", label: "Approved" },
  { value: "NEEDS_REVIEW", label: "Needs Review" },
  { value: "REJECTED", label: "Rejected" },
];

/**
 * Decide which admin review route a document maps to:
 * - credential-review: permit / health permit / credential items
 * - business-document-review: business license / business name docs
 */
export function getReviewKindForDocument(
  documentType: string
): VerificationReviewKind {
  const normalized = documentType.toUpperCase();
  if (normalized.includes("BUSINESS")) return "business-document";
  return "credential";
}

interface UpdateDocumentStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document: DocumentItem | null;
  /** :verificationId for PATCH /admin/vendor-verifications/:verificationId/{credential-review|business-document-review} */
  verificationId: string;
  kind?: VerificationReviewKind;
  onSuccess?: () => void;
}

export default function UpdateDocumentStatusDialog({
  open,
  onOpenChange,
  document,
  verificationId,
  kind,
  onSuccess,
}: UpdateDocumentStatusDialogProps) {
  const { mutate: reviewDocument, isPending } = useReviewVerificationDocument();
  const resolvedKind: VerificationReviewKind =
    kind ?? getReviewKindForDocument(document?.documentType ?? "");

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { status: "APPROVED", result: "", reason: "" },
  });

  useEffect(() => {
    if (open) reset({ status: "APPROVED", result: "", reason: "" });
  }, [open, reset]);

  const onSubmit = (values: ReviewFormValues) => {
    if (!document) return;
    reviewDocument(
      {
        verificationId,
        kind: resolvedKind,
        payload: {
          status: values.status,
          result: values.result.trim(),
          reason: values.reason.trim(),
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          reset();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <CustomModal
      open={open}
      onOpenChange={onOpenChange}
      size="md"
      title="Update document status"
      className="p-6 sm:p-8"
    >
      {document && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="rounded-xl border border-[#ECEFF3] bg-[#F8FAFC] p-4 text-sm">
            <p className="font-semibold text-[#161618]">
              {document.documentName}
            </p>
            <p className="mt-1 text-[#697586]">
              {document.documentType} •{" "}
              {resolvedKind === "credential"
                ? "credential-review"
                : "business-document-review"}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-status">Approval status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="review-status" className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {REVIEW_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && (
              <p className="text-sm text-red-600">{errors.status.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-result">Result</Label>
            <textarea
              id="review-result"
              rows={3}
              placeholder="e.g. Permit details match the ID record and are valid."
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("result")}
            />
            {errors.result && (
              <p className="text-sm text-red-600">{errors.result.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-reason">Reason</Label>
            <textarea
              id="review-reason"
              rows={3}
              placeholder="e.g. No issues found"
              className="w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              {...register("reason")}
            />
            {errors.reason && (
              <p className="text-sm text-red-600">{errors.reason.message}</p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              className="h-12 flex-1"
              disabled={isPending}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn-primary h-12 flex-1 text-black"
              disabled={isPending}
            >
              {isPending ? "Saving..." : "Save review"}
            </Button>
          </div>
        </form>
      )}
    </CustomModal>
  );
}
