// Interfaces for the payload and response data
export interface NotificationPreferencesPayload {
    pushNotificationsEnabled: boolean;
    systemAlertsEnabled: boolean;
    vendorUpdatesEnabled: boolean;
    customerReportsEnabled: boolean;
  }

// Notification Settings Data
export type UserRole = 'ADMIN' | 'CLIENT' | 'RESELLER' | 'USER';

export interface NotificationBaseSettings {
  id: string;
  doNotDisturbEnabled: boolean;
  doNotDisturbStart: string | null;
  doNotDisturbEnd: string | null;
}

export interface NotificationPreferences {
  pushNotificationsEnabled: boolean;
  systemAlertsEnabled: boolean;
  vendorUpdatesEnabled: boolean;
  customerReportsEnabled: boolean;
}

export interface NotificationSettingsData {
  role: UserRole;
  base: NotificationBaseSettings;
  preferences: NotificationPreferences;
}

export interface NotificationSettingsApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: NotificationSettingsData;
}