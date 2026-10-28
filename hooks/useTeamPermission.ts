import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { teamPermissionService } from "@/services/teamPermission.service";
import { RolePayload } from "@/types/teamPermission.types";

export const TEAM_PERMISSION_QUERY_KEYS = {
  PERMISSIONS: ["team-permissions"] as const,
  ROLES: ["team-roles"] as const,
  ROLE: (id: string) => ["team-role", id] as const,
};

export const useGetPermissions = () => {
  return useQuery({
    queryKey: TEAM_PERMISSION_QUERY_KEYS.PERMISSIONS,
    queryFn: () => teamPermissionService.getPermissions(),
  });
};

export const useGetRoles = () => {
  return useQuery({
    queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES,
    queryFn: () => teamPermissionService.getRoles(),
  });
};

export const useGetRoleById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLE(id),
    queryFn: () => teamPermissionService.getRoleById(id),
    enabled: Boolean(id) && enabled,
  });
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RolePayload) => teamPermissionService.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES });
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RolePayload }) =>
      teamPermissionService.updateRole(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES });
      queryClient.invalidateQueries({
        queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLE(variables.id),
      });
    },
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teamPermissionService.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES });
    },
  });
};

