"use client";

import React from "react";
import { Shield, Users, KeyRound, Eye, Pencil, Trash2, AlertCircle, RefreshCw } from "lucide-react";
import { Role } from "@/types/teamPermission.types";
import { formatDateSafe } from "./permissionHelpers";

interface RoleTableProps {
  roles?: Role[] | null;
  isLoading: boolean;
  isError?: boolean;
  errorMessage?: string;
  onRetry?: () => void;
  onViewRole: (role: Role) => void;
  onEditRole: (role: Role) => void;
  onDeleteRole: (role: Role) => void;
}

export default function RoleTable({
  roles,
  isLoading,
  isError,
  errorMessage,
  onRetry,
  onViewRole,
  onEditRole,
  onDeleteRole,
}: RoleTableProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-[#EDEDED] overflow-hidden shadow-xs">
        <div className="p-12 text-center space-y-3">
          <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-[#E28611] mx-auto" />
          <p className="text-sm text-gray-500 font-medium">Loading team roles & permissions...</p>
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
          <h3 className="text-lg font-bold text-gray-900 font-lora">Failed to load roles</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            {errorMessage || "Unable to retrieve team roles. Please check your network or try again."}
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

  const safeRoles = roles || [];

  if (safeRoles.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#EDEDED] p-12 text-center space-y-3 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-amber-50 text-[#E28611] flex items-center justify-center mx-auto">
          <Shield className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 font-lora">No Roles Found</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto">
          No team roles have been created yet or none match your search. Click &ldquo;Create New Role&rdquo; to get started.
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
                Role Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Privileges / Permissions
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Assigned Users
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase">
                Created Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#44444A] tracking-wider uppercase text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#ECEFF3]">
            {safeRoles.map((role) => {
              const permCount =
                role?.permissions?.length ?? role?.permissionsCount ?? 0;
              const formattedDate = formatDateSafe(role?.createdAt);

              const previewPermissions = role?.permissions?.slice(0, 2) || [];
              const remainingCount = Math.max(0, permCount - 2);

              return (
                <tr
                  key={role.id}
                  className="hover:bg-gray-50/70 transition-colors group"
                >
                  {/* Role Name */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#E28611] shrink-0">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-[#161618]">
                            {role?.name || "Unnamed Role"}
                          </span>
                          {role?.isSystem && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                              System
                            </span>
                          )}
                        </div>
                        {role?.slug && (
                          <span className="text-xs text-[#697586] font-mono">
                            {role.slug}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Permissions */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <KeyRound className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-xs font-semibold text-gray-800">
                          {permCount} {permCount === 1 ? "Permission" : "Permissions"}
                        </span>
                      </div>

                      {previewPermissions.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1">
                          {previewPermissions.map((p) => (
                            <span
                              key={p.id}
                              className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200 truncate max-w-[120px]"
                            >
                              {p.name}
                            </span>
                          ))}
                          {remainingCount > 0 && (
                            <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                              +{remainingCount} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Users */}
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                      <Users className="w-3.5 h-3.5 text-gray-500" />
                      <span>
                        {role?.usersCount ?? 0}{" "}
                        {role?.usersCount === 1 ? "user" : "users"}
                      </span>
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4 text-sm text-[#697586]">
                    {formattedDate}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View button */}
                      <button
                        type="button"
                        onClick={() => onViewRole(role)}
                        title="View Role Details"
                        className="p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit button */}
                      <button
                        type="button"
                        onClick={() => onEditRole(role)}
                        title="Edit Role & Permissions"
                        className="p-2 rounded-lg text-gray-500 hover:text-[#E28611] hover:bg-amber-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>

                      {/* Delete button */}
                      <button
                        type="button"
                        onClick={() => onDeleteRole(role)}
                        title="Delete Role"
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
