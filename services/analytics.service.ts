import api from "@/lib/axios";
import { AnalyticsSummaryResponse } from "@/types/analytics.types";

export const AnalyticsService = {
    async getAnalytics() {
        const { data } = await api.get<AnalyticsSummaryResponse>("/admin/analytical-summary");
        return data;
    },


}