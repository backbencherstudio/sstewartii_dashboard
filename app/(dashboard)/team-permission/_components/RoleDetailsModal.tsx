"use client";

import React, { useMemo } from "react";
import { X, ShieldCheck, Users, Calendar, Key, Pencil } from "lucide-react";
import { Role } from "@/types/teamPermission.types";
import {
  groupPermissionsByResource,
  getActionBadgeInfo,
  formatDateSafe,
} from "./permissionHelpers";

interface RoleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  onEditClick: (role: Role) => void;
}

export default function RoleDetailsModal({
  isOpen,
  onClose,
  role,
  onEditClick,
}: RoleDetailsModalProps) {
  const groupedCategories = useMemo(() => {
    return groupPermissionsByResource(role?.permissions);
  }, [role?.permissions]);

  if (!isOpen || !role) return null;

  const formattedCreated = formatDateSafe(
    role?.createdAt,
    "MMM d, yyyy h:mm a"
  );

  const totalPermCount =
    role?.permissions?.length ?? role?.permissionsCount ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-[#FCFDFE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#E28611]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#03070C] font-lora">
                  {role?.name || "Role Details"}
                </h2>
                {role?.isSystem ? (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                    System
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Custom
                  </span>
                )}
              </div>
              {role?.slug && (
                <p className="text-xs text-[#697586] font-mono">slug: {role.slug}</p>
              )}
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
          {/* Metadata Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center gap-3">
              <Users className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Assigned Users</p>
                <p className="text-sm font-bold text-gray-900">
                  {role?.usersCount ?? 0}{" "}
                  {role?.usersCount === 1 ? "User" : "Users"}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center gap-3">
              <Key className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Permissions</p>
                <p className="text-sm font-bold text-gray-900">
                  {totalPermCount} Granted
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Created On</p>
                <p className="text-xs font-semibold text-gray-900 truncate">
                  {formattedCreated}
                </p>
              </div>
            </div>
          </div>

          {/* Assigned Permissions List */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center justify-between">
              <span>Granted Permissions</span>
              <span className="text-xs font-normal text-gray-500">
                {totalPermCount} total
              </span>
            </h3>

            {groupedCategories.length === 0 ? (
              <div className="py-6 text-center text-sm text-gray-400 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                No permissions currently assigned to this role.
              </div>
            ) : (
              <div className="space-y-3">
                {groupedCategories.map(({ category, permissions }) => {
                  const safePerms = permissions || [];
                  return (
                    <div
                      key={category}
                      className="border border-gray-200 rounded-xl p-3.5 bg-white"
                    >
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100">
                        <span className="text-xs font-bold text-gray-700 tracking-wide uppercase">
                          {category} Module
                        </span>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {safePerms.length} items
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
        </div>

        {/* Modal Footer */}
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
              onEditClick(role);
            }}
            className="btn-primary !w-auto !h-10 !py-2 px-5 flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Role</span>
          </button>
        </div>
      </div>
    </div>
  );
}
