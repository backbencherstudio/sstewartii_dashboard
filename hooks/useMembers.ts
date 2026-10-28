import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { memberService } from "@/services/member.service";
import {
  CreateMemberPayload,
  GetTeamMembersParams,
  UpdateMemberPayload,
} from "@/types/member.types";
import { TEAM_PERMISSION_QUERY_KEYS } from "./useTeamPermission";

export const TEAM_MEMBERS_QUERY_KEYS = {
  ALL: ["team-members"] as const,
  LIST: (params?: GetTeamMembersParams) => ["team-members", params] as const,
  DETAIL: (id: string) => ["team-member", id] as const,
};

export const useGetMembers = (params?: GetTeamMembersParams) => {
  return useQuery({
    queryKey: TEAM_MEMBERS_QUERY_KEYS.LIST(params),
    queryFn: () => memberService.getMembers(params),
  });
};

export const useGetMemberById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: TEAM_MEMBERS_QUERY_KEYS.DETAIL(id),
    queryFn: () => memberService.getMemberById(id),
    enabled: Boolean(id) && enabled,
  });
};

export const useCreateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMemberPayload) =>
      memberService.createMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_MEMBERS_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({
        queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES,
      });
    },
  });
};

export const useUpdateMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateMemberPayload;
    }) => memberService.updateMember(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: TEAM_MEMBERS_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({
        queryKey: TEAM_MEMBERS_QUERY_KEYS.DETAIL(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES,
      });
    },
  });
};

export const useDeleteMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => memberService.deleteMember(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TEAM_MEMBERS_QUERY_KEYS.ALL });
      queryClient.invalidateQueries({
        queryKey: TEAM_PERMISSION_QUERY_KEYS.ROLES,
      });
    },
  });
};

