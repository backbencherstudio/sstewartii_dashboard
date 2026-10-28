"use client";

import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { Role } from "@/types/teamPermission.types";
import { useDeleteRole } from "@/hooks/useTeamPermission";
import { getErrorMessage } from "./permissionHelpers";

interface DeleteRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
}

export default function DeleteRoleModal({
  isOpen,
  onClose,
  role,
}: DeleteRoleModalProps) {
  const deleteMutation = useDeleteRole();

  if (!isOpen || !role) return null;

  const handleDelete = async () => {
    if (!role?.id) {
      toast.error("Role identifier is missing");
      return;
    }

    try {
      await deleteMutation.mutateAsync(role.id);
      toast.success(`Role "${role.name || "selected"}" was successfully deleted`);
      onClose();
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err, "Failed to delete role");
      toast.error(errMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
        {/* Top bar with close */}
        <div className="flex justify-end p-4 pb-0">
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 pt-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 stroke-[2]" />
          </div>

          <h3 className="text-xl font-bold text-[#03070C] font-lora mb-2">
            Delete Role
          </h3>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Are you sure you want to permanently delete the role{" "}
            <span className="font-semibold text-gray-900">
              &ldquo;{role?.name || "this role"}&rdquo;
            </span>?
            This will revoke all associated privileges from this role.
          </p>

          {(role?.usersCount ?? 0) > 0 ? (
            <div className="p-3 mb-4 rounded-xl bg-amber-50 border border-amber-200 text-left text-xs text-amber-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Warning:</strong> This role is currently assigned to{" "}
                <strong>{role.usersCount}</strong> team member(s). Deleting it
                may restrict their platform access.
              </span>
            </div>
          ) : null}

          {/* Buttons */}
          <div className="flex items-center gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={deleteMutation.isPending}
              className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex-1 py-2.5 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deleting...</span>
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
