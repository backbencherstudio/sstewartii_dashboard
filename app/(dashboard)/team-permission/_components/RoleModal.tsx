"use client";

import React, { useState, useMemo } from "react";
import { X, Loader2, Check, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Permission, Role, RolePayload } from "@/types/teamPermission.types";
import {
  groupPermissionsByResource,
  getActionBadgeInfo,
  getErrorMessage,
} from "./permissionHelpers";
import { useCreateRole, useUpdateRole } from "@/hooks/useTeamPermission";

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  roleToEdit?: Role | null;
  allPermissions?: Permission[] | null;
}

export default function RoleModal({
  isOpen,
  onClose,
  roleToEdit,
  allPermissions = [],
}: RoleModalProps) {
  const safeAllPermissions = useMemo(
    () => allPermissions || [],
    [allPermissions]
  );

  const [roleName, setRoleName] = useState(() => roleToEdit?.name || "");
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>(
    () => roleToEdit?.permissions?.map((p) => p.id) || []
  );
  const [searchFilter, setSearchFilter] = useState("");

  const createRoleMutation = useCreateRole();
  const updateRoleMutation = useUpdateRole();

  const isEditing = Boolean(roleToEdit);
  const isSubmitting =
    createRoleMutation.isPending || updateRoleMutation.isPending;

  // Filter and group permissions defensively
  const filteredPermissions = useMemo(() => {
    if (!searchFilter.trim()) return safeAllPermissions;
    const q = searchFilter.toLowerCase();
    return safeAllPermissions.filter(
      (p) =>
        p?.name?.toLowerCase().includes(q) ||
        (p?.description && p.description.toLowerCase().includes(q))
    );
  }, [safeAllPermissions, searchFilter]);

  const groupedCategories = useMemo(() => {
    return groupPermissionsByResource(filteredPermissions);
  }, [filteredPermissions]);

  if (!isOpen) return null;

  // Toggle single permission
  const handleTogglePermission = (id: string) => {
    setSelectedPermissionIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle all permissions in a specific category
  const handleToggleCategory = (categoryPerms: Permission[]) => {
    const categoryIds = (categoryPerms || []).map((p) => p.id);
    const allSelected = categoryIds.every((id) =>
      selectedPermissionIds.includes(id)
    );

    if (allSelected) {
      setSelectedPermissionIds((prev) =>
        prev.filter((id) => !categoryIds.includes(id))
      );
    } else {
      setSelectedPermissionIds((prev) =>
        Array.from(new Set([...prev, ...categoryIds]))
      );
    }
  };

  // Toggle all permissions globally
  const handleSelectAllGlobal = () => {
    if (selectedPermissionIds.length === safeAllPermissions.length) {
      setSelectedPermissionIds([]);
    } else {
      setSelectedPermissionIds(safeAllPermissions.map((p) => p.id));
    }
  };

  // Form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roleName.trim()) {
      toast.error("Please enter a role name");
      return;
    }

    if (selectedPermissionIds.length === 0) {
      toast.error("Please select at least one permission");
      return;
    }

    const payload: RolePayload = {
      name: roleName.trim(),
      permissionIds: selectedPermissionIds,
    };

    try {
      if (isEditing && roleToEdit?.id) {
        await updateRoleMutation.mutateAsync({
          id: roleToEdit.id,
          payload,
        });
        toast.success(`Role "${payload.name}" updated successfully!`);
      } else {
        await createRoleMutation.mutateAsync(payload);
        toast.success(`Role "${payload.name}" created successfully!`);
      }
      onClose();
    } catch (err: unknown) {
      const errMsg = getErrorMessage(
        err,
        isEditing ? "Failed to update role" : "Failed to create role"
      );
      toast.error(errMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#E28611]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#03070C] font-lora">
                {isEditing ? "Edit Role" : "Create New Role"}
              </h2>
              <p className="text-xs text-[#697586]">
                {isEditing
                  ? "Update role name and access permissions"
                  : "Define a role title and assign specific privileges"}
              </p>
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

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Role Name */}
          <div>
            <label className="block text-sm font-semibold text-[#161618] mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="e.g. Operations Manager, Support Lead, Auditor"
              className="w-full h-12 px-4 rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 text-sm font-medium"
              required
            />
          </div>

          {/* Permissions Header & Global Controls */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-[#161618]">
                  Assign Permissions <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-[#697586]">
                  Selected:{" "}
                  <span className="font-semibold text-[#E28611]">
                    {selectedPermissionIds.length}
                  </span>{" "}
                  of {safeAllPermissions.length} permissions
                </p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Filter permissions..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="h-8 px-3 text-xs rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-[#F9B01A] outline-none w-44"
                />

                <button
                  type="button"
                  onClick={handleSelectAllGlobal}
                  className="px-3 py-1.5 text-xs font-medium text-[#2A3542] bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  {selectedPermissionIds.length === safeAllPermissions.length
                    ? "Deselect All"
                    : "Select All"}
                </button>
              </div>
            </div>

            {/* Permissions List Grouped by Resource */}
            <div className="space-y-4 pt-1">
              {groupedCategories.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  No permissions found matching &ldquo;{searchFilter}&rdquo;
                </div>
              ) : (
                groupedCategories.map(({ category, permissions: catPerms }) => {
                  const safeCatPerms = catPerms || [];
                  const catIds = safeCatPerms.map((p) => p.id);
                  const isCatAllSelected =
                    catIds.length > 0 &&
                    catIds.every((id) => selectedPermissionIds.includes(id));
                  const isCatPartiallySelected =
                    !isCatAllSelected &&
                    catIds.some((id) => selectedPermissionIds.includes(id));

                  return (
                    <div
                      key={category}
                      className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-xs"
                    >
                      {/* Category Header */}
                      <div className="flex items-center justify-between px-4 py-3 bg-[#F9FAFB] border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-[#1E293B]">
                            {category} Module
                          </span>
                          <span className="text-xs text-gray-400">
                            ({safeCatPerms.length} privileges)
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleToggleCategory(safeCatPerms)}
                          className="text-xs font-medium text-[#E28611] hover:text-[#FFBB1C] transition-colors"
                        >
                          {isCatAllSelected
                            ? "Deselect Group"
                            : isCatPartiallySelected
                            ? "Select All in Group"
                            : "Select Group"}
                        </button>
                      </div>

                      {/* Permissions Grid */}
                      <div className="p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white">
                        {safeCatPerms.map((perm) => {
                          const isSelected = selectedPermissionIds.includes(
                            perm.id
                          );
                          const { action, badgeClass } = getActionBadgeInfo(
                            perm?.name
                          );

                          return (
                            <label
                              key={perm.id}
                              className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                                isSelected
                                  ? "bg-amber-50/60 border-amber-300 ring-1 ring-amber-300/30"
                                  : "bg-white border-gray-150 hover:bg-gray-50/70"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <div
                                  className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? "bg-[#E28611] border-[#E28611] text-white"
                                      : "border-gray-300 bg-white"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 stroke-[3]" />
                                  )}
                                </div>
                                <span className="text-xs font-medium text-gray-800 truncate">
                                  {perm?.name}
                                </span>
                              </div>

                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded border capitalize ${badgeClass}`}
                              >
                                {action}
                              </span>

                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={isSelected}
                                onChange={() => handleTogglePermission(perm.id)}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn-primary !w-auto min-w-[140px] !h-10 !py-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving...</span>
              </>
            ) : isEditing ? (
              "Save Changes"
            ) : (
              "Create Role"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
