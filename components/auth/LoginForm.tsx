"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import AuthIcons from "../icons/AuthIcons";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Checkbox from "../form/Checkbox";
import { Form } from "@/components/form/Form";
import Link from "next/link";
import { cookie } from "@/lib/cookie";
import { useRouter } from "next/navigation";



const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address.").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),

});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginFormFields({
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
  } = useFormContext<LoginFormValues>();

  return (
    <>
      <p className="self-stretch text-lg font-bold leading-[130%] text-(--Stroke,#2A3542) opacity-70 font-[Lora]">
        Log in as a Admin
      </p>

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

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          placeholder="Password"
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

      <Link href="/forgot-password" className="mb-2 text-right text-sm font-normal leading-[120%] text-[#697586] [font:Inter] block">
        Forgot password?
      </Link>

      <div className="flex items-center gap-2">
        <Checkbox />
        <p className="text-base font-medium leading-[160%] text-[#697586] opacity-70 [font:Inter]">
          Remember me
        </p>
      </div>

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
          "Sign In"
        )}
      </button>
    </>
  );
}

export default function LoginForm() {
  const { login, isLoading } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    setSubmitError("");
    try {
      // await login(data);
      cookie.set("access-token", "1234567890");
      router.push("/dashboard");
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

          <Form<LoginFormValues>
            schema={loginSchema}
            defaultValues={{ email: "", password: "" }}
            onSubmit={onSubmit}
            className="w-full space-y-4"
          >
            <LoginFormFields isLoading={isLoading} submitError={submitError} />
          </Form>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className="text-right text-base font-normal leading-[160%] text-[#697586] [font:Inter]">
            Privacy Policy
          </p>
          <p className="text-right text-base font-normal leading-[160%] text-[#697586] [font:Inter]">
            Copyright 2026
          </p>
        </div>
      </div>
    </div>
  );
}
