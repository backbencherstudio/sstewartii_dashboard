// services/vendorAccounts.service.ts
import api from "@/lib/axios";
import { RangeType, SubscriptionResponse, VendorDocumentResponse, VendorListResponse, VendorOverviewResponse } from "@/types/vendorAccount.types";

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

  // get vendors order
  // async getVendorsOrder(
  //   vendorId: string,
  //   params: VendorOrderQueryParams
  // ): Promise<VendorOrderResponse> {
  //   const response = await api.get(
  //     `/admin/vendors/${vendorId}/orders`,
  //     { params }
  //   );
  // },

  // 

  async getVendorsDocuments(
    accountId: string,
  ): Promise<VendorDocumentResponse> {
    const response = await api.get(
      `/admin/vendors/accounts/${accountId}/documents`,
    );
    return response.data;
  },

  // get vendors subscriptions
  async getVendorsSubscriptions(
    accountId: string,
  ): Promise<SubscriptionResponse> {
    const response = await api.get(
      `/admin/vendors/accounts/${accountId}/subscriptions`,
    );
    return response.data;
  },
};