import { useQuery } from "@tanstack/react-query";
import { AnalyticsService } from "@/services/analytics.service";

export const useGetAnalytics = () => {
  return useQuery({
    queryKey: ["analytics"],
    queryFn: AnalyticsService.getAnalytics, 
  });
};