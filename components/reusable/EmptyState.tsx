import Image from "next/image";
import React from "react";

interface EmptyStateProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  containerHeight?: string;
  variant?: "sm" | "lg"; // 👈 mode switch
}

export default function EmptyState({
  imageSrc = "/images/empty-data/platform-revenue.png",
  title = "No data available",
  description = "Please try again later",
  containerHeight = "h-full",
  variant = "sm", // 👈 default mode
}: EmptyStateProps) {
  const isLarge = variant === "lg";

  return (
    <div
      className={`flex items-center justify-center flex-col ${
        isLarge ? "gap-8" : "md:gap-6 gap-4"
      } ${containerHeight} w-full py-10`}
    >
      {/* Image */}
      <div
        className={`relative ${
          isLarge ? "w-[400px] h-80" : "w-[155px] h-[150px]"
        }`}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text */}
      <div
        className={`flex flex-col items-center justify-center gap-3.5 ${
          isLarge ? "max-w-[1200px]" : "max-w-[408px]"
        }`}
      >
        <h3
          className={
            isLarge
              ? "self-stretch text-[color:var(--Stroke,#2A3542)] text-center [font-family:Lora] text-[40px] font-bold leading-[130%] tracking-[1.6px]"
              : "text-[#2A3542] text-center font-serif text-lg font-bold leading-[130%]"
          }
        >
          {title}
        </h3>

        <p
          className={
            isLarge
              ? "self-stretch text-[color:var(--Secondary-Text,#697586)] text-center [font-family:Inter] text-lg font-medium leading-[160%]"
              : "text-[#697586] text-center font-sans text-base font-normal leading-[160%]"
          }
        >
          {description}
        </p>
      </div>
    </div>
  );
}