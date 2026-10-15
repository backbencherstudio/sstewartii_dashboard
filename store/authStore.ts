"use client";

import { User } from "@/types/auth.types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  // State
  user: User | null;
  isHydrated: boolean;

  // Actions — state only
  setUser: (user: User | null) => void;
  setHydrated: (hydrated: boolean) => void;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial State
      user: null,
      isHydrated: false,

      // Base Actions
      setUser: (user) => set({ user }),
      setHydrated: (isHydrated) => set({ isHydrated }),
      clear: () => set({ user: null }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
