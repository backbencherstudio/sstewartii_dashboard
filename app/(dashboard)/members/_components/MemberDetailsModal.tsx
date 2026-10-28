"use client";

import React, { useMemo } from "react";
import {
  X,
  Shield,
  KeyRound,
  Calendar,
  CheckCircle2,
  Clock,
  Pencil,
  Loader2,
} from "lucide-react";
import { TeamMember } from "@/types/member.types";
import { useGetMemberById } from "@/hooks/useMembers";
import {
  formatDateSafe,
  groupPermissionsByResource,
  getActionBadgeInfo,
} from "../../team-permission/_components/permissionHelpers";
import MemberAvatar from "./MemberAvatar";

interface MemberDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onEditClick: (member: TeamMember) => void;
}

export default function MemberDetailsModal({
  isOpen,
  onClose,
  member,
  onEditClick,
}: MemberDetailsModalProps) {
  // Query full member details with permissions by ID
  const {
    data: memberDetails,
    isLoading,
  } = useGetMemberById(member?.id || "", isOpen && Boolean(member?.id));

  // Merge loaded details with fallback to prop
  const activeMember = memberDetails || member;

  const groupedCategories = useMemo(() => {
    return groupPermissionsByResource(activeMember?.permissions);
  }, [activeMember?.permissions]);

  if (!isOpen || !member) return null;

  const formattedCreated = formatDateSafe(
    activeMember?.createdAt,
    "MMM d, yyyy h:mm a"
  );

  const permCount =
    activeMember?.permissions?.length ??
    activeMember?.permissionsCount ??
    0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#FCFDFE]">
          <div className="flex items-center gap-3">
            <MemberAvatar
              avatar={activeMember?.avatar}
              name={activeMember?.name}
              size="lg"
            />

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#03070C] font-lora">
                  {activeMember?.name || "Team Member"}
                </h2>
                {activeMember?.isEmailVerified ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    <Clock className="w-3 h-3 text-amber-600" />
                    Pending
                  </span>
                )}
              </div>
              <p className="text-xs text-[#697586]">{activeMember?.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {isLoading && !memberDetails ? (
            <div className="py-12 text-center space-y-2">
              <Loader2 className="w-6 h-6 animate-spin text-[#E28611] mx-auto" />
              <p className="text-xs text-gray-500">Loading full permission scope...</p>
            </div>
          ) : (
            <>
              {/* Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Assigned Role</p>
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {activeMember?.role?.name || "No Role"}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center gap-3">
                  <KeyRound className="w-5 h-5 text-gray-500 shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Privileges</p>
                    <p className="text-sm font-bold text-gray-900">
                      {permCount} Permissions
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 font-medium">Joined Date</p>
                    <p className="text-xs font-semibold text-gray-900 truncate">
                      {formattedCreated}
                    </p>
                  </div>
                </div>
              </div>

              {/* Granted Permissions List */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
                  <span>Effective Permissions</span>
                  <span className="text-xs font-normal text-gray-500">
                    Granted through {activeMember?.role?.name || "Role"}
                  </span>
                </h3>

                {groupedCategories.length === 0 ? (
                  <div className="py-6 text-center text-sm text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    No individual permissions assigned to this member&apos;s role.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {groupedCategories.map(({ category, permissions }) => {
                      const safePerms = permissions || [];
                      return (
                        <div
                          key={category}
                          className="border border-gray-200 rounded-xl p-3.5 bg-white shadow-2xs"
                        >
                          <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100">
                            <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">
                              {category} Module
                            </span>
                            <span className="text-[11px] text-gray-400 font-medium">
                              {safePerms.length} privileges
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            {safePerms.map((perm) => {
                              const { action, badgeClass } = getActionBadgeInfo(
                                perm?.name
                              );
                              return (
                                <div
                                  key={perm.id}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs border border-gray-200 bg-gray-50/80 text-gray-800"
                                >
                                  <span
                                    className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${badgeClass}`}
                                  >
                                    {action}
                                  </span>
                                  <span className="font-mono text-[11px]">
                                    {perm?.name}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Close
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (activeMember) onEditClick(activeMember);
            }}
            className="btn-primary !w-auto !h-10 !py-2 px-5 flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Member</span>
          </button>
        </div>
      </div>
    </div>
  );
}

