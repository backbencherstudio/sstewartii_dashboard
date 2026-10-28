"use client";

import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { TeamMember } from "@/types/member.types";
import { useDeleteMember } from "@/hooks/useMembers";
import { getErrorMessage } from "../../team-permission/_components/permissionHelpers";

interface DeleteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
}

export default function DeleteMemberModal({
  isOpen,
  onClose,
  member,
}: DeleteMemberModalProps) {
  const deleteMutation = useDeleteMember();

  if (!isOpen || !member) return null;

  const handleDelete = async () => {
    if (!member?.id) {
      toast.error("Member identifier is missing");
      return;
    }

    try {
      await deleteMutation.mutateAsync(member.id);
      toast.success(
        `Member "${member.name || "selected"}" was successfully removed`
      );
      onClose();
    } catch (err: unknown) {
      const errMsg = getErrorMessage(err, "Failed to delete team member");
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
            Delete Team Member
          </h3>

          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Are you sure you want to remove{" "}
            <span className="font-semibold text-gray-900">
              &ldquo;{member?.name || "this member"}&rdquo;
            </span>{" "}
            ({member?.email}) from the platform? Their access to the dashboard
            will be revoked immediately.
          </p>

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
                "Yes, Remove"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

