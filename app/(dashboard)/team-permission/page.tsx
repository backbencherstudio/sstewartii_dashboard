"use client";

import React, { useState, useMemo } from "react";
import { Plus, Search, RefreshCw } from "lucide-react";
import PageTitle from "@/components/reusable/PageTitle";
import { useGetPermissions, useGetRoles } from "@/hooks/useTeamPermission";
import { Role } from "@/types/teamPermission.types";
import { getErrorMessage } from "./_components/permissionHelpers";
import TeamPermissionStats from "./_components/TeamPermissionStats";
import RoleTable from "./_components/RoleTable";
import RoleModal from "./_components/RoleModal";
import RoleDetailsModal from "./_components/RoleDetailsModal";
import DeleteRoleModal from "./_components/DeleteRoleModal";

export default function TeamPermissionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<Role | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  // Queries
  const {
    data: permissionsData,
    isLoading: isLoadingPermissions,
    refetch: refetchPermissions,
    isRefetching: isRefetchingPermissions,
  } = useGetPermissions();

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    isError: isErrorRoles,
    error: rolesError,
    refetch: refetchRoles,
    isRefetching: isRefetchingRoles,
  } = useGetRoles();

  const allPermissions = useMemo(() => {
    return permissionsData?.permissions || [];
  }, [permissionsData]);

  const allRoles = useMemo(() => {
    return rolesData || [];
  }, [rolesData]);

  // Filter roles defensively
  const filteredRoles = useMemo(() => {
    if (!searchQuery.trim()) return allRoles;
    const q = searchQuery.toLowerCase();
    return allRoles.filter(
      (r) =>
        r?.name?.toLowerCase().includes(q) ||
        (r?.slug && r.slug.toLowerCase().includes(q)) ||
        r?.permissions?.some((p) => p?.name?.toLowerCase().includes(q))
    );
  }, [allRoles, searchQuery]);

  const handleCreateNewRole = () => {
    setRoleToEdit(null);
    setIsRoleModalOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setRoleToEdit(role);
    setIsRoleModalOpen(true);
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role);
    setIsDeleteModalOpen(true);
  };

  const handleRefresh = () => {
    refetchPermissions();
    refetchRoles();
  };

  const isRefreshing = isRefetchingPermissions || isRefetchingRoles;
  const rolesErrorMessage = rolesError
    ? getErrorMessage(rolesError, "Failed to load roles from server")
    : undefined;

  return (
    <div className="space-y-6">
      {/* Page Title & Top Action */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageTitle
          title="Team Permission"
          description="Configure roles, assign access privileges, and manage permissions for team members."
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 h-11 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-xs disabled:opacity-60"
            title="Refresh roles & permissions"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <button
            type="button"
            onClick={handleCreateNewRole}
            className="btn-primary !w-auto !h-11 px-5 flex items-center gap-2"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="whitespace-nowrap">Create New Role</span>
          </button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <TeamPermissionStats
        roles={allRoles}
        totalPermissions={permissionsData?.total ?? allPermissions.length}
      />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EDEDED] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#697586] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles by title, slug, or permission..."
            className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 font-medium"
          />
        </div>

        <div className="text-xs font-medium text-[#697586] flex items-center gap-2">
          <span>Showing:</span>
          <span className="font-semibold text-[#161618]">
            {filteredRoles.length} of {allRoles.length} roles
          </span>
        </div>
      </div>

      {/* Role Table */}
      <RoleTable
        roles={filteredRoles}
        isLoading={isLoadingRoles || isLoadingPermissions}
        isError={isErrorRoles}
        errorMessage={rolesErrorMessage}
        onRetry={handleRefresh}
        onViewRole={handleViewRole}
        onEditRole={handleEditRole}
        onDeleteRole={handleDeleteRole}
      />

      {/* Create / Edit Role Modal */}
      <RoleModal
        key={roleToEdit ? roleToEdit.id : isRoleModalOpen ? "new" : "closed"}
        isOpen={isRoleModalOpen}
        onClose={() => {
          setIsRoleModalOpen(false);
          setRoleToEdit(null);
        }}
        roleToEdit={roleToEdit}
        allPermissions={allPermissions}
      />

      {/* Role Details Modal */}
      <RoleDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedRole(null);
        }}
        role={selectedRole}
        onEditClick={handleEditRole}
      />

      {/* Delete Role Modal */}
      <DeleteRoleModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setRoleToDelete(null);
        }}
        role={roleToDelete}
      />
    </div>
  );
}
