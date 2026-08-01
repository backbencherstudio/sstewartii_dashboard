"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, Pencil } from "lucide-react";
import useSettings from "@/hooks/useSettings";
import { toast } from "sonner";


export default function AdminInformationPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { changePassword } = useSettings();

    // Reset form when canceling or saving
    const resetForm = () => {
        setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        // Validation
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("New password and confirm password do not match!");
            return;
        }

        if (!formData.currentPassword || !formData.newPassword) {
            toast.error("Please fill all required fields");
            return;
        }

        if (formData.newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);

        try {
            const response = await changePassword({
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword,
                confirmNewPassword: formData.confirmPassword,
            });

            // Assuming the API returns a success message
            toast.success(response.message || "Password changed successfully!");
            
            setIsEditing(false);
            resetForm();
        } catch (error: any) {
            // Handle API error response
            const errorMessage = error?.response?.data?.message || 
                               error?.message || 
                               "Failed to change password. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        resetForm();
    };

    const togglePassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Clear form when not editing
    useEffect(() => {
        if (!isEditing) {
            resetForm();
        }
    }, [isEditing]);

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
                            disabled={isLoading}
                            className="h-14 px-6 py-4 rounded-2xl border border-[#70747C] text-[#585D63] font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="h-14 px-6 py-4 rounded-2xl bg-gradient-to-r from-[#FFBB1C] to-[#E28611] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Saving...
                                </span>
                            ) : (
                                "Save Changes"
                            )}
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
                        disabled={!isEditing || isLoading}
                        showPassword={showPassword.currentPassword}
                        onToggle={() => togglePassword("currentPassword")}
                    />

                    <InputField
                        placeholder="Enter your new password"
                        label="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing || isLoading}
                        showPassword={showPassword.newPassword}
                        onToggle={() => togglePassword("newPassword")}
                    />

                    <InputField
                        placeholder="Enter your confirm password"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        disabled={!isEditing || isLoading}
                        showPassword={showPassword.confirmPassword}
                        onToggle={() => togglePassword("confirmPassword")}
                    />

                    {/* Optional: Password requirements hint */}
                    {isEditing && (
                        <div className="mt-2 text-sm text-gray-500">
                            <p className="font-medium text-gray-600">Password requirements:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                                <li>At least 6 characters long</li>
                                <li>Must contain at least one uppercase letter</li>
                                <li>Must contain at least one lowercase letter</li>
                                <li>Must contain at least one number</li>
                            </ul>
                        </div>
                    )}
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
                    className="h-[54px] w-full rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 pr-12 text-sm text-[#161618] outline-none focus:border-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    disabled={disabled}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>
    );
}