"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

interface MemberAvatarProps {
  avatar?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function getInitials(name?: string | null): string {
  if (!name || typeof name !== "string") return "TM";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2 && parts[0] && parts[1]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase() || "TM";
}

export default function MemberAvatar({
  avatar,
  name,
  size = "md",
  className = "",
}: MemberAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const fullImageUrl = getImageUrl(avatar);
  const initials = getInitials(name);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-9 h-9 text-xs",
    lg: "w-11 h-11 text-sm font-bold",
  };

  // If there's an image URL and it hasn't errored, try rendering image
  if (fullImageUrl && !imageError) {
    return (
      <div
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden shrink-0 border border-gray-200 bg-gray-50 shadow-2xs ${className}`}
      >
        <Image
          src={fullImageUrl}
          alt={name || "Member Avatar"}
          fill
          sizes="(max-width: 768px) 44px, 44px"
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Fallback to stylized amber/gold gradient with initials
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-tr from-[#FFBB1C] to-[#E28611] text-[#070707] font-semibold flex items-center justify-center shadow-xs shrink-0 select-none ${className}`}
      title={name || "Team Member"}
    >
      {initials}
    </div>
  );
}

