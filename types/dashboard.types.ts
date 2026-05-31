export interface DashboardSummary {
  totalVendors: number;
  totalCustomers: number;
  activeTrucksToday: number;
  platformRevenue: number;
  currency: string;
}

export interface DashboardAlerts {
  issuesNeedAttention: number;
  pendingOnboarding: number;
  inactiveVendors: number;
  todayRevenue: number;
  currency: string;
}

export interface VendorsByStatus {
  pending: number;
  verified: number;
  expired: number;
  suspended: number;
  rejected: number;
  total: number;
}

export interface DashboardOverview {
  summary: DashboardSummary;
  alerts: DashboardAlerts;
  vendorsByStatus: VendorsByStatus;
  lastUpdatedAt: string;
}

export interface DashboardOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardOverview;
}

// types/dashboard-revenue.types.ts
export type RevenueRange = "day" | "week" | "month" | "year";
export type RevenueMetric = "revenue" | "orders" | "customers";

export interface RevenueItem {
  label: string;
  value: number;
}

export interface DashboardRevenue {
  range: RevenueRange;
  metric: RevenueMetric;
  currency: string;
  total: number;
  items: RevenueItem[];
  lastUpdatedAt: string;
}

export interface DashboardRevenueResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: DashboardRevenue;
}