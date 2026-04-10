// components/layout/AuthProvider.tsx
'use client';
import { useEffect } from 'react';

import useAuth from '@/hooks/useAuth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchMe, isHydrated } = useAuth();


  useEffect(() => {
    if (isHydrated) {
      void fetchMe();
    }
  }, [isHydrated, fetchMe]);

  if (!isHydrated) {
    // return null;
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  return <>{children}</>;}