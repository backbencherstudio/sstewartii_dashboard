import { useState } from "react";

import { settingsService } from "@/services/settings.service";
import {
    NotificationPreferences,
    NotificationPreferencesPayload,
} from "@/types/notifications.types";
import { ChangePasswordPayload, UpdateProfilePayload } from "@/types/settings.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useSettings = () => {
    const [notificationPreferences, setNotificationPreferences] =
        useState<NotificationPreferences | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    

    const getNotificationPreferences = async () => {
        setIsLoading(true);

        try {
            const response =
                await settingsService.getNotificationPreferences();

            setNotificationPreferences(response.preferences);

            return response;
        } finally {
            setIsLoading(false);
        }
    };

    const updateNotificationPreferences = async (
        data: NotificationPreferencesPayload
    ) => {
        setIsLoading(true);

        try {
            const response =
                await settingsService.updateNotificationPreferences(data);

            setNotificationPreferences(response.preferences);

            return response;
        } finally {
            setIsLoading(false);
        }
    };

    const changePassword = async (data: ChangePasswordPayload) => {
        setIsLoading(true);

        try {
            const response = await settingsService.changePassword(data);
            return response;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        notificationPreferences,
        isLoading,
        getNotificationPreferences,
        updateNotificationPreferences,
        changePassword,
    };
};

export default useSettings;




// 2. Custom Mutation Hook
export const useUpdateUser = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (data: UpdateProfilePayload) => settingsService.updateUser(data),
      onSuccess: () => {
        // Invalidate admin profile query to trigger an automatic refetch
        queryClient.invalidateQueries({ queryKey: ["admin-profile"] });
      },
    });
  };




//   audit logs 

import { AuditLogQueryParams } from "@/types/settings.types";

export const useAuditLogs = (params?: AuditLogQueryParams) => {
    const getAuditLogsList = useQuery({
        queryKey: ["audit-logs", params],
        queryFn: () => settingsService.getAuditLogs(params),
    });

    return {
        getAuditLogsList,
    };
};

export const useAuditLogStaff = () => {
    return useQuery({
        queryKey: ["audit-logs-staff"],
        queryFn: () => settingsService.getAuditLogStaff(),
    });
};

export const useAuditLogActions = () => {
    return useQuery({
        queryKey: ["audit-logs-actions"],
        queryFn: () => settingsService.getAuditLogActions(),
    });
};

export const useAuditLogSummary = () => {
    return useQuery({
        queryKey: ["audit-logs-summary"],
        queryFn: () => settingsService.getAuditLogSummary(),
    });
};

export const useAuditLog = (id: string) => {
    return useQuery({
        queryKey: ["audit-log", id],
        queryFn: () => settingsService.getAuditLogById(id),
        enabled: !!id,
    });
};