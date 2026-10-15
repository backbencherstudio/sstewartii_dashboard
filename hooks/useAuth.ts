"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/auth.service";
import {
  TWO_FACTOR_CHALLENGE_KEY,
  TWO_FACTOR_SETUP_KEY,
} from "@/lib/constants";

const clearLocalSessionTokens = async () => {
  sessionStorage.removeItem(TWO_FACTOR_CHALLENGE_KEY);
  sessionStorage.removeItem(TWO_FACTOR_SETUP_KEY);
};

const useAuth = () => {
  const router = useRouter();

  // Store is state-only — all API calls live in this hook
  const { setUser, clear, user, isHydrated } = useAuthStore();

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

        if (res.data?.requiresTwoFactorSetup) {
          if (res.data.setupToken) {
            sessionStorage.setItem(TWO_FACTOR_SETUP_KEY, res.data.setupToken);
          }
          router.push("/login/two-factor/setup");
          return;
        }

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
      await authService.logout();
      clear();
      router.push("/login");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Logout failed";
      setIsError(true);
      setErrMsg(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, [clear, router]);

  const verifyTwoFactor = useCallback(
    async (code: string) => {
      setIsLoading(true);
      setIsError(false);
      setErrMsg(null);
      try {
        // Fresh login stores the challenge token; a setup-first login stores
        // the setup token instead — the verify endpoint accepts either.
        const challengeToken =
          sessionStorage.getItem(TWO_FACTOR_CHALLENGE_KEY) ??
          sessionStorage.getItem(TWO_FACTOR_SETUP_KEY);
        if (!challengeToken) {
          throw new Error("Session expired. Please log in again.");
        }
        const verified = await authService.verifyTwoFactor(
          challengeToken,
          code,
        );

        clearLocalSessionTokens();
        // Tokens are set now, so load the full profile into the store.
        try {
          setUser(await authService.me());
        } catch {
          // Non-fatal: dashboard rehydrates via fetchMe().
        }
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
    [router, setUser],
  );

  const setupTwoFactor = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrMsg(null);
    try {
      const setupToken = sessionStorage.getItem(TWO_FACTOR_SETUP_KEY);
      if (!setupToken) {
        throw new Error("Session expired. Please log in again.");
      }
      return await authService.setupTwoFactor(setupToken);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Two-factor setup failed";
      setIsError(true);
      setErrMsg(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMe = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrMsg(null);
    try {
      setUser(await authService.me());
    } catch (err) {
      clear(); // Wipe store if token/session is invalid
      const message =
        err instanceof Error ? err.message : "Failed to load profile";
      setIsError(true);
      setErrMsg(message);
      // No rethrow: matches previous silent semantics —
      // AuthProvider calls this fire-and-forget on every dashboard visit.
    } finally {
      setIsLoading(false);
    }
  }, [setUser, clear]);

  // const forgotPassword = useCallback(async (data: { email: string }) => {
  //     await authService.forgotPassword(data.email);
  // },
  // []);

  return {
    user,
    isLoading,
    isError,
    errMsg,
    isHydrated,
    login,
    logout,
    fetchMe,
    verifyTwoFactor,
    setupTwoFactor,
    clearError,
    // forgotPassword
  };
};

export default useAuth;
