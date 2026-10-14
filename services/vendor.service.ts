import api from "@/lib/axios";
import {
  VendorVerificationQueryParams,
  VendorVerificationList,
  VendorVerificationData,
  VerificationReviewPayload,
  VerificationReviewResponse,
  VendorNidVerificationDetails,
} from "@/types/vendor.types";

export const vendorService = {
  // Existing list endpoint
  async getVerifications(
    params: VendorVerificationQueryParams,
  ): Promise<VendorVerificationList> {
    const response = await api.get("/admin/vendor-verifications", { params });

    return response.data.data;
  },

  // New detail endpoint
  async getVerificationDetails(
    verificationId: string,
  ): Promise<VendorVerificationData> {
    const response = await api.get(
      `/admin/vendor-verifications/${verificationId}`,
    );

    return response.data.data;
  },

  //   approve or reject document
  async approveOrRejectDocument(
    verificationId: string,
    status: "approve" | "reject",
  ): Promise<void> {
    const response = await api.patch(
      `/admin/vendor-verifications/${verificationId}/${status}`,
    );
    return response.data.data;
  },

  // =============================================== ADMIN REVIEW (credential / business-document) ========================================
  // PATCH /api/v1/admin/vendor-verifications/:verificationId/credential-review
  // PATCH /api/v1/admin/vendor-verifications/:verificationId/business-document-review
  // body: { status: "APPROVED" | "NEEDS_REVIEW" | "REJECTED", result: string, reason: string }
  async reviewCredentialItem(
    verificationId: string,
    payload: VerificationReviewPayload,
  ): Promise<VerificationReviewResponse> {
    const response = await api.patch(
      `/admin/vendor-verifications/${verificationId}/credential-review`,
      payload,
    );
    return response.data.data ?? response.data;
  },

  async reviewBusinessDocumentItem(
    verificationId: string,
    payload: VerificationReviewPayload,
  ): Promise<VerificationReviewResponse> {
    const response = await api.patch(
      `/admin/vendor-verifications/${verificationId}/business-document-review`,
      payload,
    );
    return response.data.data ?? response.data;
  },

  // =============================================== NID VERIFICATIONS ========================================

  async getNIDVerifications(): Promise<VendorNidVerificationDetails[]> {
    const response = await api.get("/admin/vendors/verification");
    return response.data.data;
  },

  async getNIDVerificationDetails(
    vendorId: string,
  ): Promise<VendorNidVerificationDetails> {
    const response = await api.get(`/admin/vendors/verification/${vendorId}`);
    return response.data.data;
  },

  async approveNIDVerification(
    verificationId: string,
  ): Promise<VendorNidVerificationDetails> {
    const response = await api.patch(
      `/admin/vendors/verification/${verificationId}/approve`,
    );
    return response.data.data;
  },

  async rejectNIDVerification(
    verificationId: string,
  ): Promise<VendorNidVerificationDetails> {
    const response = await api.patch(
      `/admin/vendors/verification/${verificationId}/reject`,
    );
    return response.data.data;
  },
};
