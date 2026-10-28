import api from "@/lib/axios";
import {
  CreateMemberPayload,
  GetTeamMembersParams,
  SingleTeamMemberResponse,
  TeamMember,
  TeamMembersResponse,
  UpdateMemberPayload,
} from "@/types/member.types";

export const memberService = {
  // Fetch team members list with optional pagination and query params
  async getMembers(
    params?: GetTeamMembersParams
  ): Promise<TeamMembersResponse["data"]> {
    const response = await api.get<TeamMembersResponse>(
      "/dashboard/team-permission",
      { params }
    );
    return (
      response.data?.data || {
        teamMembers: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 1,
      }
    );
  },

  // Fetch single team member details by ID
  async getMemberById(id: string): Promise<TeamMember> {
    const response = await api.get<SingleTeamMemberResponse>(
      `/dashboard/team-permission/${id}`
    );
    return response.data?.data;
  },

  // Create a new team member
  async createMember(payload: CreateMemberPayload): Promise<TeamMember> {
    const response = await api.post<SingleTeamMemberResponse>(
      "/dashboard/team-permission",
      payload
    );
    return response.data?.data;
  },

  // Update team member by ID (PATCH)
  async updateMember(
    id: string,
    payload: UpdateMemberPayload
  ): Promise<TeamMember> {
    const response = await api.patch<SingleTeamMemberResponse>(
      `/dashboard/team-permission/${id}`,
      payload
    );
    return response.data?.data;
  },

  // Delete team member by ID
  async deleteMember(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await api.delete<{ success: boolean; message?: string }>(
      `/dashboard/team-permission/${id}`
    );
    return response.data;
  },
};

