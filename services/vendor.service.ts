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
};