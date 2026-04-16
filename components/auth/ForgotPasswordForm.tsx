"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import AuthIcons from "../icons/AuthIcons";
import { Loader2 } from "lucide-react";
import Checkbox from "../form/Checkbox";
import { Form } from "@/components/form/Form";
import { useRouter } from "next/navigation";



const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address.").min(1, "Email is required"),


});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPasswordFormFields({
    isLoading,
    submitError,
}: {
    isLoading: boolean;
    submitError: string;
}) {

    // Get form state from context
    const {
        register,
        formState: { errors },
    } = useFormContext<ForgotPasswordFormValues>();

    return (
        <>

            <div>
                <p className="text-[color:var(--Stroke,#2A3542)] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px]">Forgot Password?</p>
                <p className="self-stretch text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-base font-normal leading-[160%]">To reset your password, first enter your email. A verification code will be sent to ad****lis@gmail.com.</p>
            </div>

            <div className="relative">
                <input
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="auth-input pl-12"
                    {...register("email")}
                />
                <AuthIcons.EmailIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-900" />

            </div>

            {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
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
                        Logging in...
                    </div>
                ) : (
                    "Send Verification Code"
                )}
            </button>
        </>
    );
}

export default function ForgotPasswordForm() {
    const { forgotPassword, isLoading } = useAuth();
    const [submitError, setSubmitError] = useState("");
    const router = useRouter();
    const onSubmit = async (data: ForgotPasswordFormValues) => {
        setSubmitError("");
        try {
            await forgotPassword(data);
            router.push("/verify-otp");
        } catch (err) {
            console.log(err);
            setSubmitError(err instanceof Error ? err.message : "Login failed");
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

                    <Form<ForgotPasswordFormValues>
                        schema={forgotPasswordSchema}
                        defaultValues={{ email: "" }}
                        onSubmit={onSubmit}
                        className="w-full space-y-4"
                    >
                        <ForgotPasswordFormFields isLoading={isLoading} submitError={submitError} />
                    </Form>
                </div>

            </div>
        </div>
    );
}
