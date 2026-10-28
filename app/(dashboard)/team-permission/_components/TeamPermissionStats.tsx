"use client";

import React from "react";
import { Shield, KeyRound, Users, CheckCircle2 } from "lucide-react";
import StatsCard from "@/components/reusable/StatsCard";
import { Role } from "@/types/teamPermission.types";

interface TeamPermissionStatsProps {
  roles?: Role[] | null;
  totalPermissions?: number | null;
}

export default function TeamPermissionStats({
  roles,
  totalPermissions,
}: TeamPermissionStatsProps) {
  const safeRoles = roles || [];
  const totalRoles = safeRoles.length;

  const totalUsers = safeRoles.reduce(
    (acc, role) => acc + (role?.usersCount ?? 0),
    0
  );

  const activeAssignments = safeRoles.reduce(
    (acc, role) =>
      acc + (role?.permissionsCount ?? role?.permissions?.length ?? 0),
    0
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        color="#F9B01A"
        title="Total Roles"
        value={totalRoles}
        update="Configured roles"
        icon={<Shield className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#2B80EC"
        title="Total Permissions"
        value={totalPermissions ?? 0}
        update="System actions"
        icon={<KeyRound className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#10B981"
        title="Assigned Users"
        value={totalUsers}
        update="Team members with roles"
        icon={<Users className="w-5 h-5 text-white" />}
      />

      <StatsCard
        color="#8B5CF6"
        title="Granted Privileges"
        value={activeAssignments}
        update="Total permission links"
        icon={<CheckCircle2 className="w-5 h-5 text-white" />}
      />
    </div>
  );
}
