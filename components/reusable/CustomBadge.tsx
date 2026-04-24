import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   1. Badge Styles (only visual system)
───────────────────────────────────────────── */
const badgeVariants = cva(
  "inline-flex items-center justify-center px-2.5 py-0.5 text-xs font-medium capitalize whitespace-nowrap transition-colors",
  {
    variants: {
      variant: {
        solid: "rounded-md",
        outline: "rounded-md border",
        rounded: "rounded-full",
      },
      color: {
        blue: "",
        green: "",
        red: "",
        yellow: "",
        gray: "",
      },
    },
    compoundVariants: [
      // solid
      { variant: "solid", color: "blue",   class: "bg-blue-100 text-blue-700" },
      { variant: "solid", color: "green",  class: "bg-green-100 text-green-700" },
      { variant: "solid", color: "red",    class: "bg-red-100 text-red-700" },
      { variant: "solid", color: "yellow", class: "bg-yellow-100 text-yellow-700" },
      { variant: "solid", color: "gray",   class: "bg-gray-100 text-gray-700" },
      // outline
      { variant: "outline", color: "blue",   class: "border-blue-300 text-blue-700 bg-transparent" },
      { variant: "outline", color: "green",  class: "border-green-300 text-green-700 bg-transparent" },
      { variant: "outline", color: "red",    class: "border-red-300 text-red-700 bg-transparent" },
      { variant: "outline", color: "yellow", class: "border-yellow-300 text-yellow-700 bg-transparent" },
      { variant: "outline", color: "gray",   class: "border-gray-300 text-gray-700 bg-transparent" },
      // rounded
      { variant: "rounded", color: "blue",   class: "bg-blue-100 text-blue-700" },
      { variant: "rounded", color: "green",  class: "bg-green-100 text-green-700" },
      { variant: "rounded", color: "red",    class: "bg-red-100 text-red-700" },
      { variant: "rounded", color: "yellow", class: "bg-yellow-100 text-yellow-700" },
      { variant: "rounded", color: "gray",   class: "bg-gray-100 text-gray-700" },
    ],
  }
);

/* ─────────────────────────────────────────────
   2. SINGLE SOURCE OF TRUTH (EDIT ONLY HERE)
───────────────────────────────────────────── */
export const STATUS_CONFIG = {
  active: {
    color: "green",
    variant: "rounded",
    label: "Active",
  },
  suspended: {
    color: "red",
    variant: "solid",
    label: "Suspended",
  },
  pending: {
    color: "yellow",
    variant: "solid",
    label: "Pending",
  },
  archived: {
    color: "gray",
    variant: "outline",
    label: "Archived",
  },
  trial: {
    color: "blue",
    variant: "rounded",
    label: "Trial",
  },
  verified: {
    color: "blue",
    variant: "rounded",
    label: "Verified",
  },
} as const;

/* ─────────────────────────────────────────────
   3. AUTO TYPES (NO MANUAL EDITS EVER)
───────────────────────────────────────────── */
export type Status = keyof typeof STATUS_CONFIG;

/* ─────────────────────────────────────────────
   4. STATUS BADGE COMPONENT
───────────────────────────────────────────── */
interface StatusBadgeProps {
  status: string;
  variant?: "solid" | "outline" | "rounded";
  color?: "blue" | "green" | "red" | "yellow" | "gray";
  className?: string;
}

export function StatusBadge({ status, variant, color, className }: StatusBadgeProps) {
  const key = status?.toLowerCase() as Status;

  const config = STATUS_CONFIG[key] ?? {
    color: color ?? "gray",
    variant: variant ?? "outline",
    label: status,
  }; 

  return (
    <span
      className={cn(
        badgeVariants({
          color: config.color,
          variant: config.variant,
        }),
        className
      )}
    >
      {config.label}
    </span>
  );
}

/* ─────────────────────────────────────────────
   5. BASE BADGE (OPTIONAL REUSABLE UI)
───────────────────────────────────────────── */
interface BadgeProps {
  label: string;
  variant?: "solid" | "outline" | "rounded";
  color?: "blue" | "green" | "red" | "yellow" | "gray";
  className?: string;
}

export default function Badge({
  label,
  variant = "solid",
  color = "blue",
  className,
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, color }), className)}>
      {label}
    </span>
  );
}



