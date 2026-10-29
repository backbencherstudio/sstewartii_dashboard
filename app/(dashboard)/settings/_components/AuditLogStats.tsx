"use client";

import React from "react";
import { Activity, ShieldCheck, CheckCircle2, UserCheck } from "lucide-react";
import StatsCard from "@/components/reusable/StatsCard";
import { AuditLogSummaryData } from "@/types/settings.types";

interface AuditLogStatsProps {
  summary?: AuditLogSummaryData | null;
  totalLogs?: number;
}

export default function AuditLogStats({
  summary,
  totalLogs,
}: AuditLogStatsProps) {
  const total = summary?.total ?? totalLogs ?? 0;
  const distinctActions = summary?.byAction?.length ?? 0;
  const recentActivities = summary?.recentActivity?.length ?? 0;
  const successfulActions =
    summary?.recentActivity?.filter((act) => act?.result === "SUCCESS")
      ?.length ?? recentActivities;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        color="#F9B01A"
        title="Total Logs"
        value={total}
        update="Recorded audit events"
        icon={<Activity className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#2B80EC"
        title="Unique Actions"
        value={distinctActions}
        update="Tracked system event types"
        icon={<ShieldCheck className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#10B981"
        title="Recent Activities"
        value={recentActivities}
        update="Recent audit stream"
        icon={<CheckCircle2 className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#8B5CF6"
        title="Success Rate"
        value={
          recentActivities > 0
            ? `${Math.round((successfulActions / recentActivities) * 100)}%`
            : "100%"
        }
        update="Successful executions"
        icon={<UserCheck className="w-5 h-5 text-white" />}
      />
    </div>
  );
}

