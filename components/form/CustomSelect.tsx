"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// 1. Trigger Variants (The Button)
const selectTriggerVariants = cva(
  "flex items-center justify-between transition-all duration-200",
  {
    variants: {
      variant: {
        small: "w-full max-w-[120px] rounded-sm text-sm focus:bg-accent focus:text-accent-foreground rounded-lg",
        default: "min-w-[180px] h-10 rounded-md border border-input bg-background px-3 py-2 text-sm",
        outline: "min-w-[180px] h-10 md:h-14 justify-center gap-2 px-4 md:px-6 py-3 md:py-4 md:rounded-2xl rounded-xl text-[#070707] font-medium text-base",
        primary: "min-w-[180px] h-10 md:h-14 justify-center gap-2 px-4 md:px-6 py-3 md:py-4 md:rounded-2xl rounded-xl text-[#070707] font-medium text-base bg-[linear-gradient(136deg,#FFBB1C_0%,#E28611_100%)] hover:opacity-90 active:scale-[0.98] hover:shadow-lg hover:shadow-orange-500/20 border-none [&>svg]:text-[#070707]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// 2. Content Variants (The Dropdown Menu)
const selectContentVariants = cva("", {
  variants: {
    variant: {
        small: "w-full max-w-[200px] rounded-sm text-sm p-0",
      default: "rounded-md border bg-popover text-popover-foreground shadow-md",
      outline: "rounded-2xl border-2 border-[#FFBB1C] bg-white p-1 shadow-xl rounded-[14px] border-2 border-[#FFBB1C] p-2",
      // Match the primary theme: rounded corners and maybe a subtle orange border
      primary: "rounded-2xl border-2 border-[#FFBB1C] bg-white p-1 shadow-xl rounded-[14px] border-2 border-[#FFBB1C] p-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
// 3. Item Variants (The Individual Rows)
const selectItemVariants = cva(
    "relative flex w-full cursor-pointer select-none items-center py-3 px-4 outline-none transition-colors",
    {
      variants: {
        variant: {
            small: "rounded-sm text-xs focus:bg-accent focus:text-accent-foreground p-1",
          default: "rounded-sm text-sm focus:bg-accent focus:text-accent-foreground",
          // Items should NOT have borders, only rounded corners and hover backgrounds
          outline: "rounded-[12px] text-base font-medium text-[#070707] focus:bg-orange-50 focus:text-[#E28611]",
          primary: "rounded-[12px] text-base font-medium text-[#070707] focus:bg-orange-50 focus:text-[#E28611]",
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

interface ReusableSelectProps extends VariantProps<typeof selectTriggerVariants> {
  placeholder?: string;
  options: { value: string; label: string }[];
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function ReusableSelect({
  variant,
  placeholder,
  options,
  value,
  onValueChange,
  className,
}: ReusableSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      {/* Trigger uses the variant */}
      <SelectTrigger className={cn(selectTriggerVariants({ variant }), className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      
      {/* Content now ALSO uses the variant */}
      <SelectContent position="popper" align="end"  className={selectContentVariants({ variant })}>
        {options.map((opt) => (
          <SelectItem 
            key={opt.value} 
            value={opt.value}
            // Optional: style the items differently for primary variant
            className={cn(selectItemVariants({ variant }), "text-base font-medium text-[#070707] cursor-pointer")}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}