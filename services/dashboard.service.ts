import api from "@/lib/axios";
import { DashboardRevenue } from "@/types/dashboard.types";

export const dashboardService = {
  // Get the dashboard overview
  async getOverview() {
    const res = await api.get("/admin/dashboard/overview");
    return res.data.data;
  },


  // Get the dashboard revenue

  async getRevenue(params: {
    range?: "day" | "week" | "month" | "year";
    metric?: "revenue" | "orders" | "customers";
  }) {
    const res = await api.get("/admin/dashboard/revenue", {
      params,
    });

    return res.data.data;
  },
};