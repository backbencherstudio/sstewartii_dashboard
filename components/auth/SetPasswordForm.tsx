"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import AuthIcons from "../icons/AuthIcons";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { Form } from "@/components/form/Form";
import { useRouter } from "next/navigation";


const setPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

type SetPasswordFormValues = z.infer<typeof setPasswordSchema>;

function SetPasswordFormFields({
    isLoading,
    submitError,
}: {
    isLoading: boolean;
    submitError: string;
}) {
    const [showPassword, setShowPassword] = useState(false);
    // Get form state from context
    const {
        register,
        formState: { errors },
    } = useFormContext<SetPasswordFormValues>();

    return (
        <>
            <div>
                <p className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px]">Set New Password</p>
                <p className="self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-base font-normal leading-[160%]">Must be at least 8 characters..</p>
            </div>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter new password"
                    className="auth-input pl-12"
                    {...register("password")}
                />
                <AuthIcons.PasswordIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900" />

                {
                    showPassword ? (
                        <EyeIcon onClick={() => setShowPassword(false)} className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-800 cursor-pointer" />
                    ) : (
                        <EyeOffIcon onClick={() => setShowPassword(true)} className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-800 cursor-pointer" />
                    )
                }

            </div>
            {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Confirm new password"
                    className="auth-input pl-12"
                    {...register("confirmPassword")}
                />
                <AuthIcons.PasswordIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900" />

                {
                    showPassword ? (
                        <EyeIcon onClick={() => setShowPassword(false)} className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-800 cursor-pointer" />
                    ) : (
                        <EyeOffIcon onClick={() => setShowPassword(true)} className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-800 cursor-pointer" />
                    )
                }

            </div>
            {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
            )}


            

            {submitError && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3">
                    <p className="text-center text-sm text-red-600">{submitError}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <div className="flex items-center gap-2 text-gray-800">
                        <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" />
                        Resetting...
                    </div>
                ) : (
                    "Reset Password"
                )}
            </button>
        </>
    );
}

export default function SetPasswordForm() {
    // const { setPassword, isLoading } = useAuth();
    const {  isLoading } = useAuth();
    const [submitError, setSubmitError] = useState("");
    const router = useRouter();
    const onSubmit = async (data: SetPasswordFormValues) => {
        setSubmitError("");
        try {
            // await setPassword(data);
            router.push("/success");
            console.log("Password set successfully");
        } catch (err) {
            console.log(err);
            setSubmitError(err instanceof Error ? err.message : "Password reset failed");
        }
    };

    return (
        <div className="">
            <div className="flex min-w-[380px] flex-col items-center gap-[60px] rounded-3xl [background:var(--Opacity-Dark-05,rgba(8,14,30,0.05))] p-5 md:min-w-[600px] md:p-10">
                <div className="flex w-full max-w-[440px] flex-col items-center gap-[40px]">
                    <div className="mx-auto w-full max-w-[100px] md:max-w-[150px]">
                        <Image
                            src="/images/atliss-logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                            className="mx-auto"
                        />
                    </div>

                    <Form<SetPasswordFormValues>
                        schema={setPasswordSchema}
                        defaultValues={{ password: "", confirmPassword: "" }}
                        onSubmit={onSubmit}
                        className="w-full space-y-4"
                    >
                        <SetPasswordFormFields isLoading={isLoading} submitError={submitError} />
                    </Form>
                </div>

            </div>
        </div>
    );
}
