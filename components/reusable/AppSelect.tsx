"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface AppSelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface AppSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: AppSelectOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "filter" | "outline";
}

export function AppSelect({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  disabled = false,
  className,
  triggerClassName,
  contentClassName,
  size = "default",
  variant = "default",
}: AppSelectProps) {
  // Radix UI Select requires non-empty string value or undefined
  const safeValue = value && value !== "" ? value : undefined;

  const sizeClasses = {
    sm: "h-8 px-2.5 py-1 text-xs rounded-lg",
    default: "h-9 px-3 py-1.5 text-xs rounded-xl",
    lg: "h-11 px-4 py-2.5 text-sm rounded-xl",
  };

  const variantClasses = {
    default:
      "bg-white border-[#E0E2E7] hover:border-gray-300 text-gray-800 shadow-xs focus:ring-2 focus:ring-[#E28611]/25 focus:border-[#E28611]",
    filter:
      "bg-white border-[#DFE1E7] text-gray-700 hover:bg-gray-50/80 hover:border-gray-300 shadow-xs focus:ring-2 focus:ring-[#E28611]/20",
    outline:
      "bg-transparent border-[#DFE1E7] text-gray-800 hover:bg-white focus:ring-2 focus:ring-[#E28611]/25",
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Select
        value={safeValue}
        onValueChange={(val) => {
          // If "__all__" is selected, trigger empty string for reset/all
          onValueChange(val === "__all__" ? "" : val);
        }}
        disabled={disabled}
      >
        <SelectTrigger
          className={cn(
            "w-full flex items-center justify-between border font-medium transition-all duration-150 outline-none select-none",
            sizeClasses[size],
            variantClasses[variant],
            disabled && "opacity-50 cursor-not-allowed",
            triggerClassName
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <SelectValue placeholder={placeholder} />
          </div>
        </SelectTrigger>

        <SelectContent
          position="popper"
          align="start"
          className={cn(
            "z-50 min-w-[8rem] max-h-60 overflow-y-auto rounded-xl border border-gray-100 bg-white p-1 text-gray-800 shadow-lg ring-1 ring-black/5 animate-in fade-in-80",
            contentClassName
          )}
        >
          {options.map((opt) => {
            const itemValue = opt.value === "" ? "__all__" : opt.value;
            return (
              <SelectItem
                key={itemValue}
                value={itemValue}
                className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium text-gray-700 hover:bg-amber-50 hover:text-[#E28611] focus:bg-amber-50 focus:text-[#E28611] cursor-pointer transition-colors"
              >
                {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                <span className="truncate">{opt.label}</span>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default AppSelect;

