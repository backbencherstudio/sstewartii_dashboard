"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
}

interface CustomTabsProps {
  tabs?: TabItem[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

const DEFAULT_TABS: TabItem[] = [
  { id: "document", label: "Document" },
  { id: "nid-information", label: "NID Information" },
];

export default function CustomTabs2({
  tabs = DEFAULT_TABS,
  defaultTab,
  onChange,
  className,
}: CustomTabsProps) {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || tabs[0]?.id);

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    onChange?.(id);
  };

  return (
    <div className={cn("w-full border-b border-gray-200", className)}>
      <div className="flex space-x-12 relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "relative pb-2.5  font-medium transition-colors focus:outline-none px-4",
                isActive
                  ? "text-amber-500 font-semibold"
                  : "text-slate-500 hover:text-slate-600"
              )}
            >
              <span>{tab.label}</span>

              {isActive && (
                <div className="absolute bottom-0 left-2 right-0 h-[3px] bg-amber-500 rounded-t-full " />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}