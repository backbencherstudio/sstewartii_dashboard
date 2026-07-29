export interface AnalyticsStats {
  totalVendors: number;
  totalCustomers: number;
  totalSubscribers: number;
  platformRevenue: number;
  currency: string;
  updatedAt: string;
}

export interface PlatformGrowthSeriesItem {
  label: string;
  vendors: number;
  customers: number;
}

export interface PlatformGrowth {
  series: PlatformGrowthSeriesItem[];
  totalVendors: number;
  totalCustomers: number;
}

export interface SubscriberGrowthSeriesItem {
  label: string;
  value: number;
}

export interface SubscriberGrowth {
  series: SubscriberGrowthSeriesItem[];
  totalSubscribers: number;
}

export interface RevenueGrowthSeriesItem {
  label: string;
  value: number;
}

export interface RevenueGrowth {
  series: RevenueGrowthSeriesItem[];
  total: number;
  currency: string;
}

export interface LeaderboardItem {
  id: string;
  name: string;
  value: number;
}

export interface Leaderboard {
  customers: LeaderboardItem[];
  vendors: LeaderboardItem[];
}

export interface AnalyticsSummaryData {
  stats: AnalyticsStats;
  platformGrowth: PlatformGrowth;
  subscriberGrowth: SubscriberGrowth;
  revenueGrowth: RevenueGrowth;
  leaderboard: Leaderboard;
}

export interface AnalyticsSummaryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AnalyticsSummaryData;
}