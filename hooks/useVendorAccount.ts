// hooks/useVendorAccounts.ts
import { useQuery } from "@tanstack/react-query";
import { vendorAccountsService } from "@/services/vendorAccount.service";
import { RangeType } from "@/types/vendorAccount.types";

export const useVendorAccounts = () => {
  return useQuery({
    queryKey: ["vendor-accounts"],
    queryFn: vendorAccountsService.getVendorAccounts,
  });
};


export const useVendorOverview = (
    vendorId: string,
    range: RangeType = "year"
  ) => {
    return useQuery({
      queryKey: ["vendor-overview", vendorId, range],
      queryFn: () =>
        vendorAccountsService.getVendorOverview(vendorId, range),
      enabled: !!vendorId,
    });
  };