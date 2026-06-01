import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

// Get the dashboard overview
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: () => dashboardService.getOverview(),
  });
};


// Get the dashboard revenue
export const useDashboardRevenue = (params: {
  range?: "day" | "week" | "month" | "year";
  metric?: "revenue" | "orders" | "customers";
}) => {
  return useQuery({
    queryKey: ["dashboard-revenue"],
    queryFn: () => dashboardService.getRevenue(params),
  });
};
