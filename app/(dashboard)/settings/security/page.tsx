"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Pencil } from "lucide-react";

export default function AdminInformationPage() {
    const [isEditing, setIsEditing] = useState(false);

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [formData, setFormData] = useState({
        currentPassword: "12345678",
        newPassword: "123456",
        confirmPassword: "123456",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (formData.newPassword !== formData.confirmPassword) {
            alert("New password and confirm password do not match!");
            return;
        }

        if (!formData.currentPassword || !formData.newPassword) {
            alert("Please fill all required fields");
            return;
        }

        console.log("Saving data:", formData);

        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="space-y-6 max-w-7xl">
            {/* Header */}
            <div className="flex justify-between items-center py-4 border-b border-[#E6E6E6]">
                <h3 className="text-[#2A3542] font-lora text-2xl font-bold">
                    Admin Information
                </h3>

                {!isEditing ? (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 text-[#E28611] font-medium"
                    >
                        <Pencil size={18} /> Edit
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <button
                            onClick={handleCancel}
                            className="h-14 px-6 py-4 rounded-2xl border border-[#70747C] text-[#585D63] font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="h-14 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FFBB1C] to-[#E28611] text-white font-semibold"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>

            {/* Form */}
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 space-y-6">
                    <InputField
                    placeholder="Enter your current password"
                        label="Current Password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        showPassword={showPassword.currentPassword}
                        onToggle={() => togglePassword("currentPassword")}
                    />

                    <InputField
                        placeholder="Enter your new password"
                        label="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        showPassword={showPassword.newPassword}
                        onToggle={() => togglePassword("newPassword")}
                    />

                    <InputField
                        placeholder="Enter your confirm password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        showPassword={showPassword.confirmPassword}
                        onToggle={() => togglePassword("confirmPassword")}
                    />
                </div>
            </div>
        </div>
    );
}

function InputField({
    label,
    name,
    value,
    onChange,
    disabled,
    showPassword,
    onToggle,
    placeholder,
}: {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    showPassword: boolean;
    onToggle: () => void;
    placeholder: string;
}) {
    return (
        <div>
            <label className="mb-2 block text-[#697586] font-bold font-lora">
                {label}
            </label>

            <div className="relative">
                <input
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className="h-[54px] w-full rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 pr-12 text-sm text-[#161618] outline-none focus:border-[#F59E0B] disabled:cursor-not-allowed"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}