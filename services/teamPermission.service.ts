import api from "@/lib/axios";
import {
  PermissionsResponse,
  Role,
  RolePayload,
  RolesResponse,
  SingleRoleResponse,
} from "@/types/teamPermission.types";

export const teamPermissionService = {
  // Fetch all available permissions
  async getPermissions(): Promise<PermissionsResponse["data"]> {
    const response = await api.get<PermissionsResponse>(
      "/dashboard/team-permission/permissions"
    );
    return response.data?.data;
  },

  // Fetch all roles
  async getRoles(): Promise<Role[]> {
    const response = await api.get<RolesResponse>(
      "/dashboard/team-permission/roles"
    );
    return response.data?.data || [];
  },

  // Fetch single role details by ID
  async getRoleById(id: string): Promise<Role> {
    const response = await api.get<SingleRoleResponse>(
      `/dashboard/team-permission/roles/${id}`
    );
    return response.data?.data;
  },

  // Create a new role
  async createRole(payload: RolePayload): Promise<Role> {
    const response = await api.post<SingleRoleResponse>(
      "/dashboard/team-permission/roles",
      payload
    );
    return response.data?.data;
  },

  // Update role by ID
  async updateRole(id: string, payload: RolePayload): Promise<Role> {
    const response = await api.patch<SingleRoleResponse>(
      `/dashboard/team-permission/roles/${id}`,
      payload
    );
    return response.data?.data;
  },

  // Delete role by ID
  async deleteRole(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await api.delete<{ success: boolean; message?: string }>(
      `/dashboard/team-permission/roles/${id}`
    );
    return response.data;
  },
};
