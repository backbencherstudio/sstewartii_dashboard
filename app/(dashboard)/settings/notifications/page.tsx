'use client';

import React, { useEffect } from 'react';
import useSettings from '@/hooks/useSettings';
import { Bell, Mail, MessageSquare, ShieldAlert } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { NotificationPreferences } from '@/types/notifications.types';

export default function NotificationSettingsPage() {
  const {
    notificationPreferences,
    getNotificationPreferences,
    updateNotificationPreferences,
    isLoading,
  } = useSettings();

  useEffect(() => {
    getNotificationPreferences();
  }, []);

  const preferences = notificationPreferences;

  const handleToggle = async (key: keyof NotificationPreferences, value: boolean) => {
    if (!preferences) return;

    await updateNotificationPreferences({
      pushNotificationsEnabled: preferences.pushNotificationsEnabled,
      systemAlertsEnabled: preferences.systemAlertsEnabled,
      vendorUpdatesEnabled: preferences.vendorUpdatesEnabled,
      customerReportsEnabled: preferences.customerReportsEnabled,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="real border-b border-[#E6E6E6] py-4 text-2xl font-bold leading-[130%] tracking-[0.48px] text-[#2A3542] font-lora">
        Notification Preferences
      </h3>

      {/* System Alerts Section */}
      <section className="relative space-y-2 rounded-xl border border-[#E6E6E6] bg-white p-6">
        <div>
          <p className="mb-1 text-base font-bold leading-[130%] text-[#2A3542] font-lora">
            System Alerts
          </p>
          <p className="text-sm font-normal leading-[160%] text-[#697586] font-inter">
            Critical infrastructure updates, activity reports, and maintenance notifications.
          </p>
        </div>

        {/* Preferences Toggles */}
        <div>
          <AlertItem
            icon={<Bell className="h-5 w-5 text-[#697586]" />}
            label="Push Notifications"
            checked={preferences?.pushNotificationsEnabled ?? false}
            disabled={isLoading}
            onCheckedChange={(checked) => handleToggle('pushNotificationsEnabled', checked)}
          />

          <AlertItem
            icon={<ShieldAlert className="h-5 w-5 text-[#697586]" />}
            label="System Alerts"
            checked={preferences?.systemAlertsEnabled ?? false}
            disabled={isLoading}
            onCheckedChange={(checked) => handleToggle('systemAlertsEnabled', checked)}
          />

          <AlertItem
            icon={<Mail className="h-5 w-5 text-[#697586]" />}
            label="Vendor Updates"
            checked={preferences?.vendorUpdatesEnabled ?? false}
            disabled={isLoading}
            onCheckedChange={(checked) => handleToggle('vendorUpdatesEnabled', checked)}
          />

          <AlertItem
            icon={<MessageSquare className="h-5 w-5 text-[#697586]" />}
            label="Customer Reports"
            checked={preferences?.customerReportsEnabled ?? false}
            disabled={isLoading}
            noBorder
            onCheckedChange={(checked) => handleToggle('customerReportsEnabled', checked)}
          />
        </div>

        {/* Accent Bar */}
        <span className="absolute left-0 top-8 h-8 w-1 rounded-[0_12px_12px_0] [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))]" />
      </section>
    </div>
  );
}

interface AlertItemProps {
  icon: React.ReactNode;
  label: string;
  checked?: boolean;
  disabled?: boolean;
  noBorder?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

function AlertItem({
  icon,
  label,
  checked = false,
  disabled = false,
  noBorder = false,
  onCheckedChange,
}: AlertItemProps) {
  return (
    <div
      className={`flex items-center justify-between py-4 ${
        noBorder ? '' : 'border-b border-[#EEF2F6]'
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F5F9]">
          {icon}
        </div>
        <p className="text-base font-medium text-[#111827]">{label}</p>
      </div>

      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onCheckedChange}
        className="data-[state=checked]:bg-[#F59E0B]"
      />
    </div>
  );
}