import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { VendorVerificationQueryParams } from "@/types/vendor.types";
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


interface MutationParams {
    verificationId: string;
    status: 'approve' | 'reject';
  }

  
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