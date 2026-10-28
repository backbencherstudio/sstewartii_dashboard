import { Permission } from "./teamPermission.types";

export interface TeamMemberRole {
  id: string;
  name: string;
  slug?: string | null;
  description?: string | null;
  isSystem?: boolean;
}

export interface TeamMember {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: TeamMemberRole;
  permissionsCount?: number;
  permissions?: Permission[];
  isEmailVerified: boolean;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMembersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    teamMembers: TeamMember[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface SingleTeamMemberResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: TeamMember;
}

export interface CreateMemberPayload {
  name: string;
  email: string;
  password: string;
  roleId: string;
}

export interface UpdateMemberPayload {
  name?: string;
  email?: string;
  password?: string;
  roleId?: string;
}

export interface GetTeamMembersParams {
  page?: number;
  limit?: number;
  search?: string;
}

