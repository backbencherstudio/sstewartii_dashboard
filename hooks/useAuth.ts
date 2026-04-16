'use client';

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuthStore } from "@/store/authStore";

const useAuth = () => {
  const router = useRouter();

  // Grab state and methods from the store
  const {
    login: storeLogin,
    logout: storeLogout,
    fetchMe: storeFetchMe,
    user,
    isLoading,
    isHydrated
  } = useAuthStore();

  const login = useCallback(async (credentials: { email: string; password: string }) => {
    await storeLogin(credentials);
    router.push('/dashboard');
  }, [storeLogin, router]);

  const logout = useCallback(async () => {
    await storeLogout();
    router.push('/login');
  }, [storeLogout, router]);

  const fetchMe = useCallback(async () => {
    await storeFetchMe();
  }, [storeFetchMe]);


  const forgotPassword = useCallback(async (data: { email: string }) => {
    // await storeForgotPassword(email);
    (async () => {
      // await storeForgotPassword(data);
    })();
  }, []);

  return {
    user,
    isLoading,
    isHydrated,
    login,
    logout,
    fetchMe,
    forgotPassword
  };
};

export default useAuth;