import api from "@/lib/axios";
import {
  NotificationPreferencesPayload,
  NotificationSettingsApiResponse,
  NotificationSettingsData,
} from "@/types/notifications.types";
import {
  AdminLog,
  AdminLogsResponse,
  AuditLogActionsResponse,
  AuditLogQueryParams,
  AuditLogStaffMember,
  AuditLogStaffResponse,
  AuditLogSummaryData,
  AuditLogSummaryResponse,
  ChangePasswordPayload,
  SingleAuditLogResponse,
  UpdateProfilePayload,
} from "@/types/settings.types";


export const settingsService = {
  // Existing list endpoint
  async getNotificationPreferences(): Promise<NotificationSettingsData> {
    const response = await api.get<NotificationSettingsApiResponse>(
      "/notifications/settings",
    );

    return response.data.data;
  },

  // Update the service to send the nested structure expected 
  async updateNotificationPreferences(
    data: NotificationPreferencesPayload
  ): Promise<NotificationSettingsData> {
    const response = await api.patch<{ data: NotificationSettingsData }>(
      "/notifications/settings/admin",

      data, // <--- Wrap inside preferences object

    );

    return response.data.data;
  },


  // get notification preferences by role
  async changePassword(data: ChangePasswordPayload): Promise<any> {
    const response = await api.post<{ data: any }>(
      "/auth/change-password",
      data
    );

    return response.data.data;
  },

  // update user
  async updateUser(data: UpdateProfilePayload): Promise<any> {
    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.avatar) {
      formData.append("avatar", data.avatar);
    }

    const res = await api.patch<{ data: any }>(
      "/auth/admin/profile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.data;
  },

  async getAuditLogs(
    params?: AuditLogQueryParams
  ): Promise<AdminLogsResponse> {
    const cleanParams: Record<string, string | number> = {};
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== "" && val !== "ALL") {
          cleanParams[key] = val;
        }
      });
    }

    const response = await api.get<AdminLogsResponse>("/admin/audit-logs", {
      params: cleanParams,
    });
    return response.data;
  },

  async getAuditLogById(id: string): Promise<AdminLog> {
    const response = await api.get<SingleAuditLogResponse>(
      `/admin/audit-logs/${id}`,
    );

    return response.data.data;
  },

  async getAuditLogStaff(): Promise<AuditLogStaffMember[]> {
    const response = await api.get<AuditLogStaffResponse>(
      "/admin/audit-logs/staff"
    );
    return response.data?.data || [];
  },

  async getAuditLogActions(): Promise<string[]> {
    const response = await api.get<AuditLogActionsResponse>(
      "/admin/audit-logs/actions"
    );
    return response.data?.data?.actions || [];
  },

  async getAuditLogSummary(): Promise<AuditLogSummaryData> {
    const response = await api.get<AuditLogSummaryResponse>(
      "/admin/audit-logs/summary"
    );
    return response.data.data;
  },


}



