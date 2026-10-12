"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import { TWO_FACTOR_CHALLENGE_KEY } from "@/lib/constants";

const useAuth = () => {
  const router = useRouter();

  // Grab state and methods from the store
  const {
    logout: storeLogout,
    fetchMe: storeFetchMe,
    user,
    isLoading: storeIsLoading,
    isHydrated,
  } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState<null | string>(null);

  const clearError = useCallback(() => {
    setIsError(false);
    setErrMsg(null);
  }, []);

  const login = useCallback(
    async (credentials: { email: string; password: string }) => {
      setIsLoading(true);
      setIsError(false);
      setErrMsg(null);
      try {
        const res = await authService.login(credentials);

        if (res.data?.requiresTwoFactor) {
          if (res.data.challengeToken) {
            sessionStorage.setItem(
              TWO_FACTOR_CHALLENGE_KEY,
              res.data.challengeToken,
            );
          }
          router.push("/login/two-factor/app");
          return;
        }

        // await storeLogin(credentials);
        router.push("/dashboard");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        setIsError(true);
        setErrMsg(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrMsg(null);
    try {
      await storeLogout();
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setIsError(true);
      setErrMsg(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [storeLogout, router]);

  const verifyTwoFactor = useCallback(
    async (code: string) => {
      setIsLoading(true);
      setIsError(false);
      setErrMsg(null);
      try {
        const challengeToken = sessionStorage.getItem(TWO_FACTOR_CHALLENGE_KEY);
        if (!challengeToken) {
          throw new Error("Session expired. Please log in again.");
        }
        const verified = await authService.verifyTwoFactor(
          challengeToken,
          code,
        );
        sessionStorage.removeItem(TWO_FACTOR_CHALLENGE_KEY);
        router.push("/dashboard");
        return verified;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Verification failed";
        setIsError(true);
        setErrMsg(message);
        throw new Error(message);
      } finally {
        setIsLoading(false);
      }
    },
    [router],
  );

  const fetchMe = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrMsg(null);
    try {
      await storeFetchMe();
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load profile";
      setIsError(true);
      setErrMsg(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [storeFetchMe]);

  // const forgotPassword = useCallback(async (data: { email: string }) => {
  //     await authService.forgotPassword(data.email);
  // },
  // []);

  return {
    user,
    isLoading: isLoading || storeIsLoading,
    isError,
    errMsg,
    isHydrated,
    login,
    logout,
    fetchMe,
    verifyTwoFactor,
    clearError,
    // forgotPassword
  };
};

export default useAuth;
