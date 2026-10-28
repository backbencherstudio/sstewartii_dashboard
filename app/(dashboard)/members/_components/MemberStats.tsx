"use client";

import React from "react";
import { Users, UserCheck, Shield, KeyRound } from "lucide-react";
import StatsCard from "@/components/reusable/StatsCard";
import { TeamMember } from "@/types/member.types";

interface MemberStatsProps {
  members?: TeamMember[] | null;
  total?: number;
}

export default function MemberStats({ members, total }: MemberStatsProps) {
  const safeMembers = members || [];
  const totalCount = total ?? safeMembers.length;

  const verifiedCount = safeMembers.filter(
    (m) => m?.isEmailVerified === true
  ).length;

  // Unique roles count
  const distinctRoles = new Set(
    safeMembers.map((m) => m?.role?.name).filter(Boolean)
  ).size;

  // Privileged members (ADMIN or >= 10 permissions)
  const privilegedMembers = safeMembers.filter(
    (m) =>
      m?.role?.name?.toUpperCase() === "ADMIN" ||
      (m?.permissionsCount ?? 0) >= 10
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        color="#F9B01A"
        title="Total Members"
        value={totalCount}
        update="Platform operators"
        icon={<Users className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#10B981"
        title="Verified Accounts"
        value={verifiedCount}
        update="Email verified"
        icon={<UserCheck className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#2B80EC"
        title="Active Roles"
        value={distinctRoles}
        update="Distinct assigned roles"
        icon={<Shield className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#8B5CF6"
        title="Elevated Access"
        value={privilegedMembers}
        update="Admin / high-level"
        icon={<KeyRound className="w-5 h-5 text-white" />}
      />
    </div>
  );
}

