"use client";

import React from "react";
import CustomModal from "./reusable/CustomModal";
import { LogOut } from "lucide-react"; // Import a log-out icon

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function LogoutModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <CustomModal size="xsm" open={isOpen} onOpenChange={onClose}>
      <div className="p-6 flex flex-col items-center text-center">
        {/* Circular Icon and Decoration */}
        <div className="relative mb-6">
          {/* Main Icon */}
          <div className="flex h-[100px] w-[100px] items-center justify-center rounded-full [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))]">
            <LogOut className="h-[44px] w-[44px] text-white" strokeWidth={1.5} />
          </div>
          
          {/* Small decorative dots */}
          <div className="absolute top-[20px] left-[5px] w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
          <div className="absolute top-[28px] left-[20px] w-1.5 h-1.5 bg-orange-300 rounded-full"></div>
          <div className="absolute bottom-[20px] right-[5px] w-1 h-1 bg-orange-300 rounded-full"></div>
          <div className="absolute top-1/2 -right-8 w-1.5 h-1.5 bg-orange-300 rounded-full transform -translate-y-1/2"></div>
        </div>

        {/* Content */}
        <h2 className="text-[#070707] font-lora text-2xl font-bold mb-3">Sign Out</h2>
        <p className="text-[#697586] font-inter text-base font-normal leading-[160%] mb-10 max-w-[300px]">
          Are you sure you want to sign out?
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className="flex-1 h-14 justify-center items-center rounded-2xl bg-[#DFE1E7] text-[#585D63] font-inter text-base font-medium"
          >
            Cancel          
          </button>
          

          <button
            onClick={onConfirm}
            className="flex-1 h-14 justify-center items-center rounded-2xl [background:var(--Primary-Linear,linear-gradient(136deg,#FFBB1C_0%,#E28611_100%))] text-white font-inter text-base font-semibold"
          >
            Sign out
          </button>
        </div>
      </div>
    </CustomModal>
  );
}