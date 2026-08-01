import api from "@/lib/axios";
import {
    VendorVerificationQueryParams,
    VendorVerificationList,
    VendorVerificationData
} from '@/types/vendor.types';

export const vendorService = {
    // Existing list endpoint
    async getVerifications(
        params: VendorVerificationQueryParams
    ): Promise<VendorVerificationList> {
        const response = await api.get(
            "/admin/vendor-verifications",
            { params }
        );

        return response.data.data;
    },

    // New detail endpoint
    async getVerificationDetails(
        verificationId: string
    ): Promise<VendorVerificationData> {
        const response = await api.get(
            `/admin/vendor-verifications/${verificationId}`
        );

        return response.data.data;
    },


    //   approve or reject document
    async approveOrRejectDocument(
        verificationId: string,
        status: "approve" | "reject"
    ): Promise<void> {
        const response = await api.patch(
            `/admin/vendor-verifications/${verificationId}/${status}`,
        );
        return response.data.data;
    },

    // =============================================== NID VERIFICATIONS ========================================

  
    async getNIDVerifications(): Promise<any> {
        const response = await api.get(
            "/admin/vendors/verification"
        );
        return response.data.data;
    },


    async getNIDVerificationDetails(verificationId: string): Promise<any> {
        const response = await api.get(
            `/admin/vendors/verification/${verificationId}`
        );
        return response.data.data;
    },


 

    async approveNIDVerification(verificationId: string): Promise<any> {
        const response = await api.patch(
            `/admin/vendors/verification/${verificationId}/approve`
        );
        return response.data.data;
    },

 
    async rejectNIDVerification(verificationId: string): Promise<any> {
        const response = await api.patch(
            `/admin/vendors/verification/${verificationId}/reject`
        );
        return response.data.data;
    },
};

