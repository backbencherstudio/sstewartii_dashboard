"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Trash2, Pencil, Loader2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useUpdateUser } from "@/hooks/useSettings";


export default function AdminInformationPage() {
  const { user } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();

  // --- State Management ---
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // accountType: "ADMINISTRATOR",
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when auth user loads/changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        // accountType: user.role || "ADMINISTRATOR",
      });
    }
  }, [user]);

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // --- Handlers ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setImage(null);
    setImagePreview(null);
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        // accountType: user.role || "ADMINISTRATOR",
      });
    }
  };

  const handleSave = () => {
    updateUser(
      {
        name: formData.name,
        avatar: image || undefined,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          setImage(null);
        },
      }
    );
  };

  return (
    <div className="max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E6E6E6] py-4">
        <h3 className="text-2xl font-bold text-[#2A3542] font-lora">
          Admin Information
        </h3>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 font-medium text-[#E28611]"
          >
            <Pencil size={18} /> Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              disabled={isPending}
              className="h-14 rounded-2xl border border-[#70747C] px-6 py-4 font-medium text-[#585D63] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex h-14 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#FFBB1C] to-[#E28611] px-6 py-4 font-semibold text-white disabled:opacity-50"
            >
              {isPending && <Loader2 size={18} className="animate-spin" />}
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Left Side: Avatar Card */}
        <div className="flex w-full flex-col items-center rounded-2xl border border-[#DFE1E7] bg-[#F8FAFB] p-6 text-center md:w-1/3">
          <img
            src={imagePreview || user?.avatar || "/placeholder-avatar.png"}
            alt={formData.name || "Admin"}
            className="mb-4 h-32 w-32 rounded-lg object-cover"
          />
          <h4 className="text-base font-normal text-[#697586] font-inter">
            {formData.name || "Admin"}
          </h4>
          {/* <p className="mb-6 text-base font-bold text-[#313337] font-lora">
            {formData.accountType}
          </p> */}

          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <button
            onClick={() => {
              if (!isEditing) setIsEditing(true);
              fileInputRef.current?.click();
            }}
            className="mb-2 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#FFBB1C] to-[#E28611] p-2.5 text-white"
          >
            <Upload size={16} /> Upload Photo
          </button>
          
          {(imagePreview || user?.avatar) && (
            <button
              onClick={() => {
                setImage(null);
                setImagePreview(null);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-red-600"
            >
              <Trash2 size={16} /> Delete
            </button>
          )}
        </div>

        {/* Right Side: Form Fields */}
        <div className="flex-1 space-y-6">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing || isPending}
          />
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled={true}
          />
          <InputField
            label="Account Type"
            name="accountType"
            value={"ADMINISTRATOR"}
            onChange={handleInputChange}
            disabled={true}
          />
        </div>
      </div>
    </div>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function InputField({ label, name, value, onChange, disabled }: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block font-bold text-[#697586] font-lora">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="h-[54px] w-full rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 text-sm text-[#161618] outline-none focus:border-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-75"
      />
    </div>
  );
}