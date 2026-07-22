export interface AnalyticsSummaryResponse {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
      totalVendors: number;
      totalCustomers: number;
      totalSubscribers: number;
      platformRevenue: number;
      updatedAt: string; 
    };
  }