

"use client";

import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
    REGEXP_ONLY_DIGITS,
} from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { z } from "zod";
import { Form } from "@/components/form/Form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { Loader2 } from "lucide-react";

const RESET_EMAIL_STORAGE_KEY = "password-reset-email";
const RESET_TOKEN_STORAGE_KEY = "password-reset-token";

interface OTPFieldProps {
    name: string;
    maxLength?: number;
}

export function OTPField({ name, maxLength = 6 }: OTPFieldProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <div className="flex flex-col items-center gap-2">
                    <InputOTP
                        maxLength={maxLength}
                        pattern={REGEXP_ONLY_DIGITS}
                        {...field}
                    >
                        <InputOTPGroup className="gap-3 md:gap-5">
                            {Array.from({ length: maxLength }).map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    /* Customizing for your Underline Design:
                                       We remove the default border and add a bottom border.
                                    */
                                    className="
                    w-10 h-14 md:w-12 md:h-16 
                    text-3xl md:text-4xl font-semibold 
                    text-amber-500 border-b-2 border-t-0 border-x-0 border-l-0 border-r-0 border-b-amber-500 border-l-transparent border-r-transparent
                    rounded-none focus-visible:ring-0
                  "
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                    {fieldState.error && (
                        <p className="text-sm text-red-600">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    );
}

const otpSchema = z.object({
    code: z.string().length(6, "OTP must be 6 digits"),
});

export default function VerifyOTPForm() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const handleVerify = async (data: { code: string }) => {
        setSubmitError("");
        setIsLoading(true);

        try {
            const email = sessionStorage.getItem(RESET_EMAIL_STORAGE_KEY);
            if (!email) {
                setSubmitError("Please request a password reset code first.");
                return;
            }

            const resetToken = await authService.verifyOTP(email, data.code);
            sessionStorage.setItem(RESET_TOKEN_STORAGE_KEY, resetToken);
            router.push("/set-password");
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : "OTP verification failed"
            );
        } finally {
            setIsLoading(false);
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

                    <Form
                        schema={otpSchema}
                        onSubmit={handleVerify}
                        defaultValues={{ code: "" }}
                    >
                        <OTPField name="code" maxLength={6} />

                        {submitError && (
                            <div className="mt-6 rounded-md border border-red-200 bg-red-50 p-3">
                                <p className="text-center text-sm text-red-600">{submitError}</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="btn-primary mt-10 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2 text-gray-800">
                                    <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" />
                                    Verifying...
                                </div>
                            ) : (
                                "Verify Account"
                            )}
                        </button>
                    </Form>
                </div>

            </div>
        </div>
    );
}