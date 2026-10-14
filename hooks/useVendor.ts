import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { VendorVerificationQueryParams, VerificationReviewKind, VerificationReviewPayload } from "@/types/vendor.types";
import { vendorService } from "@/services/vendor.service";
import { toast } from "sonner";

export const useVendorVerifications = (
  params: VendorVerificationQueryParams
) => {
  return useQuery({
    queryKey: ["vendor-verifications", params],
    queryFn: () =>
      vendorService
    .getVerifications(params),
  });
};

export const useVendorVerificationDetails = (
  verificationId: string
) => {
  return useQuery({
    queryKey: ["vendor-verification-details", verificationId],
    queryFn: () => vendorService.getVerificationDetails(verificationId),
  });
};



  
  type Status = "approve" | "reject";

  export const useApproveOrRejectDocument = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({
        verificationId,
        status,
      }: {
        verificationId: string;
        status: Status;
      }) => vendorService.approveOrRejectDocument(verificationId, status),
  
      onSuccess: () => {
        toast.success("Document status updated successfully");
  
        // invalidate related queries (adjust key based on your project)
        queryClient.invalidateQueries({
          queryKey: ["vendor-verifications"],
        });
      },
  
      onError: (error: any) => {
        console.error(error);
        toast.error(
          error?.response?.data?.message || "Something went wrong"
        );
      },
    });
  };



  export const useNIDVerifications = () => {
    return useQuery({
      queryKey: ["nid-verifications"],
      queryFn: () => vendorService.getNIDVerifications(),
    });
  };

  export const useNIDVerificationDetails = (vendorId?: string) => {
    return useQuery({
      queryKey: ["nid-verification-details", vendorId],
      queryFn: () => vendorService.getNIDVerificationDetails(vendorId!),
      enabled: !!vendorId,
    });
  };


  export const useApproveNIDVerification = () => {
    return useMutation({
      mutationFn: (verificationId: string) => vendorService.approveNIDVerification(verificationId),
    });
  };

  export const useRejectNIDVerification = () => {
    return useMutation({
      mutationFn: (verificationId: string) => vendorService.rejectNIDVerification(verificationId),
    });
  };

  // PATCH /admin/vendor-verifications/:verificationId/credential-review
  // PATCH /admin/vendor-verifications/:verificationId/business-document-review
  // body: { status: "APPROVED" | "NEEDS_REVIEW" | "REJECTED", result, reason }
  export const useReviewVerificationDocument = () => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: ({
        verificationId,
        kind,
        payload,
      }: {
        verificationId: string;
        kind: VerificationReviewKind;
        payload: VerificationReviewPayload;
      }) =>
        kind === "credential"
          ? vendorService.reviewCredentialItem(verificationId, payload)
          : vendorService.reviewBusinessDocumentItem(verificationId, payload),

      onSuccess: () => {
        toast.success("Document review saved successfully");
        queryClient.invalidateQueries({
          queryKey: ["vendor-verifications"],
        });
        queryClient.invalidateQueries({
          queryKey: ["vendor-verification-details"],
        });
        queryClient.invalidateQueries({
          queryKey: ["vendor-documents"],
        });
      },

      onError: (error: any) => {
        console.error(error);
        toast.error(
          error?.response?.data?.message || "Failed to update document status"
        );
      },
    });
  };
