// services/vendorAccounts.service.ts
import api from "@/lib/axios";
import { RangeType, VendorListResponse, VendorOverviewResponse } from "@/types/vendorAccount.types";

export const vendorAccountsService = {
    // Get the list of vendor accounts
    async getVendorAccounts(): Promise<VendorListResponse> {
        const response = await api.get("/admin/vendors/accounts");
        return response.data;
    },

    // Get the overview of a vendor account
    async getVendorOverview(
        vendorId: string,
        range: RangeType = "year"
      ): Promise<VendorOverviewResponse> {
        const response = await api.get(
          `/admin/vendors/${vendorId}/overview`,
          {
            params: { range },
          }
        );
    
        return response.data;
      },


};