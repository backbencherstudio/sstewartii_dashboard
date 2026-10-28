"use client";

import React, { useState } from "react";
import { X, Loader2, UserPlus, Eye, EyeOff, Shield } from "lucide-react";
import { toast } from "sonner";
import { TeamMember, CreateMemberPayload, UpdateMemberPayload } from "@/types/member.types";
import { Role } from "@/types/teamPermission.types";
import { useCreateMember, useUpdateMember } from "@/hooks/useMembers";
import { getErrorMessage } from "../../team-permission/_components/permissionHelpers";

interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: TeamMember | null;
  roles?: Role[] | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function MemberModal({
  isOpen,
  onClose,
  memberToEdit,
  roles = [],
}: MemberModalProps) {
  const safeRoles = roles || [];

  const [name, setName] = useState(() => memberToEdit?.name || "");
  const [email, setEmail] = useState(() => memberToEdit?.email || "");
  const [roleId, setRoleId] = useState(() => memberToEdit?.role?.id || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const createMemberMutation = useCreateMember();
  const updateMemberMutation = useUpdateMember();

  const isEditing = Boolean(memberToEdit);
  const isSubmitting =
    createMemberMutation.isPending || updateMemberMutation.isPending;

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please provide member full name");
      return;
    }

    if (!email.trim() || !EMAIL_REGEX.test(email.trim())) {
      toast.error("Please provide a valid email address");
      return;
    }

    if (!roleId) {
      toast.error("Please assign a role to this member");
      return;
    }

    if (!isEditing && (!password || password.length < 6)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      if (isEditing && memberToEdit?.id) {
        const payload: UpdateMemberPayload = {
          name: name.trim(),
          email: email.trim(),
          roleId,
        };
        if (password.trim()) {
          payload.password = password.trim();
        }

        await updateMemberMutation.mutateAsync({
          id: memberToEdit.id,
          payload,
        });
        toast.success(`Member "${payload.name}" updated successfully!`);
      } else {
        const payload: CreateMemberPayload = {
          name: name.trim(),
          email: email.trim(),
          roleId,
          password: password.trim(),
        };

        await createMemberMutation.mutateAsync(payload);
        toast.success(`Member "${payload.name}" created successfully!`);
      }

      onClose();
    } catch (err: unknown) {
      const errMsg = getErrorMessage(
        err,
        isEditing ? "Failed to update member" : "Failed to create member"
      );
      toast.error(errMsg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-[#E28611]">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#03070C] font-lora">
                {isEditing ? "Edit Team Member" : "Add Team Member"}
              </h2>
              <p className="text-xs text-[#697586]">
                {isEditing
                  ? "Update member profile and role permissions"
                  : "Invite a new member and grant dashboard access"}
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#161618] mb-1.5">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Sarah Jenkins"
              className="w-full h-11 px-4 rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 text-sm font-medium"
              required
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-semibold text-[#161618] mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-11 px-4 rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 text-sm font-medium"
              required
            />
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-semibold text-[#161618] mb-1.5">
              Assign Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
                className="w-full h-11 px-4 pr-10 rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 text-sm font-medium appearance-none cursor-pointer"
                required
              >
                <option value="" disabled>
                  Select a team role...
                </option>
                {safeRoles.map((r) => {
                  const permCount =
                    r?.permissionsCount ?? r?.permissions?.length ?? 0;
                  return (
                    <option key={r.id} value={r.id}>
                      {r.name} ({permCount} privileges)
                    </option>
                  );
                })}
              </select>
              <Shield className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Roles define which features and APIs this member can access.
            </p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#161618] mb-1.5">
              Password {isEditing ? "(Optional)" : <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={
                  isEditing
                    ? "Leave blank to keep current password"
                    : "Create temporary password (min 6 chars)"
                }
                className="w-full h-11 pl-4 pr-11 rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 text-sm font-medium"
                required={!isEditing}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {isEditing && (
              <p className="text-xs text-gray-400 mt-1">
                Only fill this field if you want to reset this member&apos;s password.
              </p>
            )}
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
              "Add Member"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

