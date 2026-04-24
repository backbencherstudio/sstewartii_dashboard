"use client";
import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

interface TabItem {
    value: string;
    label: string;
}

interface ReusableTabsProps {
    tabs: TabItem[];
    defaultValue: string;
    onValueChange?: (value: string) => void;
    className?: string;
}

export function ReusableTabs({ tabs, defaultValue, onValueChange, className }: ReusableTabsProps) {
    return (
        <TabsPrimitive.Root
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            className={cn("w-full", className)}
        >
            <TabsPrimitive.List className="flex border-b border-[#B3B3B3]/50 ">
                {tabs.map((tab) => (
                    <TabsPrimitive.Trigger
                        key={tab.value}
                        value={tab.value}
                        className="group flex w-full max-w-[200px]  flex-col justify-end items-center gap-2 px-8 pb-2.5 text-sm font-semibold text-[#89A2C3] transition-all data-[state=active]:text-[#E28611]  relative outline-none "
                    >
                        <span className="font-inter text-base font-semibold leading-[160%] ">
                            {tab.label}
                        </span>
                        <span className="absolute bottom-0 left-0 right-0 h-1 self-stretch bg-linear-to-r from-[#FFBB1C] to-[#E28611] rounded-[10px_10px_0_0] scale-x-0 transition-transform group-data-[state=active]:scale-x-100 w-[calc(100%-20px)] mx-auto" />
                    </TabsPrimitive.Trigger>
                ))}
            </TabsPrimitive.List>
        </TabsPrimitive.Root>                     
    );
}


// bg-linear-to-r from-[#FFBB1C] to-[#E28611] bg-clip-text text-transparent