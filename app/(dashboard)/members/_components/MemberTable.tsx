"use client";

import React from "react";
import Image from "next/image";
import {
  Users,
  Shield,
  KeyRound,
  CheckCircle2,
  Clock,
  Eye,
  Pencil,
  Trash2,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { TeamMember } from "@/types/member.types";
import { formatDateSafe } from "../../team-permission/_components/permissionHelpers";

interface MemberTableProps {
  members?: TeamMember[] | null;
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onViewMember: (member: TeamMember) => void;
  onEditMember: (member: TeamMember) => void;
  onDeleteMember: (member: TeamMember) => void;
}

function getInitials(name?: string): string {
  if (!name) return "TM";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function MemberTable({
  members,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onViewMember,
  onEditMember,
  onDeleteMember,
}: MemberTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#EDEDED] overflow-hidden shadow-xs">
        <div className="p-12 text-center space-y-3">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#E28611] mx-auto" />
          <p className="text-sm text-gray-500 font-medium">
            Loading team members...
          </p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-10 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-900 font-lora">
            Failed to load team members
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {errorMessage ||
              "Unable to retrieve members list. Please check your connection and try again."}
          </p>
        </div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>
        )}
      </div>
    );
  }

  const safeMembers = members || [];

  if (safeMembers.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#EDEDED] p-12 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-[#E28611] flex items-center justify-center mx-auto">
          <Users className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 font-lora">
          No Team Members Found
        </h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          No team members match your current filters. Click &ldquo;Add New Member&rdquo; to invite or register a member.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#EDEDED] overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F9F9FB] border-b border-[#ECEFF3]">
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Member Info
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Assigned Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Privileges
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Verification
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Joined Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#ECEFF3]">
            {safeMembers.map((member) => {
              const formattedDate = formatDateSafe(member?.createdAt);
              const permCount =
                member?.permissionsCount ??
                member?.permissions?.length ??
                0;
              const roleName = member?.role?.name || "No Role";
              const isAdmin = roleName.toUpperCase().includes("ADMIN");

              return (
                <tr
                  key={member.id}
                  className="hover:bg-gray-50/70 transition-colors group"
                >
                  {/* Member Name + Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {member?.avatar ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-200">
                          <Image
                            src={member.avatar}
                            alt={member?.name || "Avatar"}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-white font-semibold flex items-center justify-center text-xs shadow-xs shrink-0">
                          {getInitials(member?.name)}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-bold text-[#161618] truncate">
                            {member?.name || "Unnamed Member"}
                          </span>
                        </div>
                        <p className="text-xs text-[#697586] truncate">
                          {member?.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Assigned Role */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border">
                      <Shield className="w-3.5 h-3.5 text-gray-500" />
                      <span
                        className={
                          isAdmin
                            ? "font-semibold text-amber-700"
                            : "text-gray-800"
                        }
                      >
                        {roleName}
                      </span>
                      {member?.role?.isSystem && (
                        <span className="text-[10px] px-1 rounded bg-purple-50 text-purple-700 border border-purple-200">
                          System
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Permissions count */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5 text-xs text-gray-700">
                      <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-semibold text-gray-900">
                        {permCount}
                      </span>
                      <span className="text-gray-500">privileges</span>
                    </div>
                  </td>

                  {/* Verification Status */}
                  <td className="px-6 py-4">
                    {member?.isEmailVerified ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        <Clock className="w-3 h-3 text-amber-600" />
                        <span>Pending</span>
                      </span>
                    )}
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4 text-sm text-[#697586]">
                    {formattedDate}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => onViewMember(member)}
                        title="View Member Details"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEditMember(member)}
                        title="Edit Member Information"
                        className="p-2 rounded-lg text-gray-500 hover:text-[#E28611] hover:bg-amber-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteMember(member)}
                        title="Delete Member"
                        className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

