import { useQuery } from "@tanstack/react-query";
import { AnalyticsSummaryResponse } from "@/types/analytics.types";
import { AnalyticsService } from "@/services/analytics.service";

export const useGetAnalytics = () => {
    return useQuery<AnalyticsSummaryResponse>({
        queryKey: ["analytics"],
        queryFn: () => AnalyticsService.getAnalytics(),
    });
}