"use client";

import React, { useState, useMemo } from "react";
import { UserPlus, Search, RefreshCw, Filter } from "lucide-react";
import PageTitle from "@/components/reusable/PageTitle";
import { useGetMembers } from "@/hooks/useMembers";
import { useGetRoles } from "@/hooks/useTeamPermission";
import { TeamMember } from "@/types/member.types";
import { getErrorMessage } from "../team-permission/_components/permissionHelpers";
import MemberStats from "./_components/MemberStats";
import MemberTable from "./_components/MemberTable";
import MemberModal from "./_components/MemberModal";
import MemberDetailsModal from "./_components/MemberDetailsModal";
import DeleteMemberModal from "./_components/DeleteMemberModal";

export default function MemberManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>("ALL");

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);

  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Queries
  const {
    data: membersData,
    isLoading: isLoadingMembers,
    isError: isErrorMembers,
    error: membersError,
    refetch: refetchMembers,
    isRefetching: isRefetchingMembers,
  } = useGetMembers();

  const {
    data: rolesData,
    isLoading: isLoadingRoles,
    refetch: refetchRoles,
  } = useGetRoles();

  const allMembers = useMemo(() => {
    return membersData?.teamMembers || [];
  }, [membersData]);

  const allRoles = useMemo(() => {
    return rolesData || [];
  }, [rolesData]);

  // Filter members defensively by search and role
  const filteredMembers = useMemo(() => {
    let result = allMembers;

    if (selectedRoleFilter !== "ALL") {
      result = result.filter(
        (m) =>
          m?.role?.id === selectedRoleFilter ||
          m?.role?.name?.toLowerCase() === selectedRoleFilter.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m?.name?.toLowerCase().includes(q) ||
          m?.email?.toLowerCase().includes(q) ||
          m?.role?.name?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [allMembers, searchQuery, selectedRoleFilter]);

  const handleCreateMember = () => {
    setMemberToEdit(null);
    setIsMemberModalOpen(true);
  };

  const handleEditMember = (member: TeamMember) => {
    setMemberToEdit(member);
    setIsMemberModalOpen(true);
  };

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDetailsModalOpen(true);
  };

  const handleDeleteMember = (member: TeamMember) => {
    setMemberToDelete(member);
    setIsDeleteModalOpen(true);
  };

  const handleRefresh = () => {
    refetchMembers();
    refetchRoles();
  };

  const isRefreshing = isRefetchingMembers;
  const membersErrorMessage = membersError
    ? getErrorMessage(membersError, "Failed to load team members")
    : undefined;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <PageTitle
          title="Member Management"
          description="Manage team members, assign operational roles, and monitor team access."
        />

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2 h-11 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors shadow-xs disabled:opacity-60"
            title="Refresh team members"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Sync</span>
          </button>

          <button
            type="button"
            onClick={handleCreateMember}
            className="btn-primary !w-auto !h-11 px-5 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
            <span className="whitespace-nowrap">Add New Member</span>
          </button>
        </div>
      </div>

      {/* Top Stats Overview */}
      <MemberStats members={allMembers} total={membersData?.total} />

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#EDEDED] shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#697586] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members by name, email, or role..."
              className="w-full h-11 pl-10 pr-4 text-sm rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] placeholder:text-[#94A3B8] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 font-medium"
            />
          </div>

          {/* Role Filter Dropdown */}
          <div className="relative min-w-[180px]">
            <select
              value={selectedRoleFilter}
              onChange={(e) => setSelectedRoleFilter(e.target.value)}
              className="w-full h-11 pl-9 pr-8 text-sm rounded-xl border border-[#D9D9D9] bg-[#F8FAFC] text-[#071E27] outline-none transition-all duration-200 focus:bg-white focus:border-[#F9B01A] focus:ring-4 focus:ring-[#F9B01A]/10 font-medium appearance-none cursor-pointer"
            >
              <option value="ALL">All Roles</option>
              {allRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="text-xs font-medium text-[#697586] flex items-center gap-2 shrink-0">
          <span>Showing:</span>
          <span className="font-semibold text-[#161618]">
            {filteredMembers.length} of {allMembers.length} members
          </span>
        </div>
      </div>

      {/* Member Table */}
      <MemberTable
        members={filteredMembers}
        isLoading={isLoadingMembers || isLoadingRoles}
        isError={isErrorMembers}
        errorMessage={membersErrorMessage}
        onRetry={handleRefresh}
        onViewMember={handleViewMember}
        onEditMember={handleEditMember}
        onDeleteMember={handleDeleteMember}
      />

      {/* Create / Edit Member Modal */}
      <MemberModal
        key={memberToEdit ? memberToEdit.id : isMemberModalOpen ? "new" : "closed"}
        isOpen={isMemberModalOpen}
        onClose={() => {
          setIsMemberModalOpen(false);
          setMemberToEdit(null);
        }}
        memberToEdit={memberToEdit}
        roles={allRoles}
      />

      {/* Member Details Modal */}
      <MemberDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedMember(null);
        }}
        member={selectedMember}
        onEditClick={handleEditMember}
      />

      {/* Delete Member Confirmation Modal */}
      <DeleteMemberModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMemberToDelete(null);
        }}
        member={memberToDelete}
      />
    </div>
  );
}

