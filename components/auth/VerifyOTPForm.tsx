

"use client";

import { useFormContext, Controller } from "react-hook-form";
import {
    REGEXP_ONLY_DIGITS,
} from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

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



import { z } from "zod";
import { Form } from "@/components/form/Form";
import Image from "next/image";
import { useRouter } from "next/navigation";

const otpSchema = z.object({
    code: z.string().length(6, "OTP must be 6 digits"),
});

export default function VerifyOTPForm() {

    const router = useRouter();
    const handleVerify = (data: { code: string }) => {
        router.push("/set-password");
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

                        <button type="submit" className="btn-primary mt-10">
                            Verify Account
                        </button>
                    </Form>
                </div>

            </div>
        </div>
    );
}