"use client";

import useAuth from "@/hooks/useAuth";
import type { TwoFactorSetupResponseBody } from "@/types/auth.types";
import { Check, Copy, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TwoFactorSetupForm() {
  const router = useRouter();
  const { setupTwoFactor, isLoading, isError, errMsg } = useAuth();
  const [setupData, setSetupData] = useState<
    TwoFactorSetupResponseBody["data"] | null
  >(null);
  const [isFetching, setIsFetching] = useState(true);
  const [copied, setCopied] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setupTwoFactor()
      .then((data) => setSetupData(data))
      .catch(() => {
        // Error is already stored in the hook (isError / errMsg)
      })
      .finally(() => setIsFetching(false));
  }, [setupTwoFactor]);

  const onCopyKey = async () => {
    if (!setupData) return;
    try {
      await navigator.clipboard.writeText(setupData.manualEntryKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — user can copy the key manually
    }
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
            Set up two-factor authentication
          </h1>
          <p className="self-stretch text-center font-[Inter] text-sm font-normal leading-[160%] text-[#697586]">
            Scan the QR code with your authenticator app, then continue to enter
            the 6-digit code and enable protection.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-4">
          {isFetching ? (
            <div className="flex h-[220px] w-[220px] items-center justify-center rounded-2xl bg-white">
              <Loader2 className="h-8 w-8 animate-spin text-[#E28611]" />
            </div>
          ) : setupData ? (
            <>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                {/* qrCodeDataUrl is a base64 data URL — plain img avoids next/image optimization issues */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={setupData.qrCodeDataUrl}
                  alt="Two-factor setup QR code"
                  width={200}
                  height={200}
                  className="h-[200px] w-[200px]"
                />
              </div>

              <div className="w-full rounded-xl border border-solid border-[#D9D9D9] bg-[#F3FAFD] p-4">
                <p className="mb-2 text-center font-[Inter] text-xs font-medium leading-[160%] text-[#697586]">
                  Can&apos;t scan? Enter this key manually
                </p>
                <div className="flex items-center justify-center gap-2">
                  <code className="break-all text-center font-mono text-base font-semibold tracking-[0.2em] text-[#2A3542]">
                    {setupData.manualEntryKey}
                  </code>
                  <button
                    type="button"
                    onClick={onCopyKey}
                    aria-label="Copy setup key"
                    className="shrink-0 rounded-lg p-2 text-[#697586] transition-colors hover:bg-white hover:text-[#2A3542]"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="w-full space-y-4">
          {isError && errMsg && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-center text-sm text-red-600">{errMsg}</p>
            </div>
          )}

          <button
            type="button"
            onClick={() => router.push("/login/two-factor/app")}
            disabled={isLoading || isFetching || !setupData}
            className="btn-primary disabled:cursor-not-allowed"
          >
            {isFetching ? (
              <span className="flex items-center gap-2 text-gray-800">
                <Loader2 className="h-4 w-4 animate-spin md:h-5 md:w-5" />
                Loading...
              </span>
            ) : (
              "I've scanned the code — Continue"
            )}
          </button>

          <Link
            href="/login"
            className="block text-center font-[Inter] text-sm font-normal leading-[120%] text-[#697586] hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
