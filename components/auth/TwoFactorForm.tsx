"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Form } from "@/components/form/Form";
import useAuth from "@/hooks/useAuth";

export { TWO_FACTOR_CHALLENGE_KEY } from "@/lib/constants";

const twoFactorSchema = z.object({
  code: z
    .string()
    .length(6, "Code must be 6 digits")
    .regex(/^\d{6}$/, "Code must be 6 digits"),
});

type TwoFactorFormValues = z.infer<typeof twoFactorSchema>;

function TwoFactorCodeInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<TwoFactorFormValues>();

  return (
    <div className="w-full">
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        placeholder="XXXXXX"
        aria-label="Two-factor authentication code"
        className="auth-input text-center text-xl font-semibold tracking-[0.5em] placeholder:text-center placeholder:font-medium placeholder:tracking-[0.35em] md:text-2xl"
        {...register("code", {
          onChange: (e) => {
            // Keep digits only (GitHub-style single box, app theme)
            e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
          },
        })}
      />
      {errors.code && (
        <p className="mt-2 text-center text-sm text-red-600">
          {errors.code.message}
        </p>
      )}
    </div>
  );
}

export default function TwoFactorForm() {
  const { verifyTwoFactor, isLoading, isError, errMsg } = useAuth();

  const onSubmit = async (data: TwoFactorFormValues) => {
    await verifyTwoFactor(data.code).catch(() => {});
  };

  return (
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

        <div className="flex w-full flex-col items-center gap-3">
          <h1 className="self-stretch text-center font-[Lora] text-2xl font-bold leading-[130%] text-[#2A3542] md:text-[28px]">
            Two-factor authentication
          </h1>
          <p className="self-stretch text-center font-[Inter] text-sm font-normal leading-[160%] text-[#697586]">
            Enter the code from your two-factor authentication app or browser
            extension below.
          </p>
        </div>

        <Form<TwoFactorFormValues>
          schema={twoFactorSchema}
          defaultValues={{ code: "" }}
          onSubmit={onSubmit}
          className="w-full space-y-4"
        >
          <TwoFactorCodeInput />

          {isError && errMsg && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-center text-sm text-red-600">{errMsg}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center gap-2 text-gray-800">
                <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" />
                Verifying...
              </span>
            ) : (
              "Verify"
            )}
          </button>

          <Link
            href="/login"
            className="block text-center font-[Inter] text-sm font-normal leading-[120%] text-[#697586] hover:underline"
          >
            Back to login
          </Link>
        </Form>
      </div>
    </div>
  );
}
