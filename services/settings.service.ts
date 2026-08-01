import api from "@/lib/axios";
import {
    NotificationPreferencesPayload,
    NotificationSettingsApiResponse,
    NotificationSettingsData,
} from "@/types/notifications.types";
import { ChangePasswordPayload, UpdateProfilePayload } from "@/types/settings.types";


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
      }
}



