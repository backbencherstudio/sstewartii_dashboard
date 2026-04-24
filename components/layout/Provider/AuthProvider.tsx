// components/layout/AuthProvider.tsx
'use client';
import { useEffect } from 'react';

import useAuth from '@/hooks/useAuth';
import { Loader } from 'lucide-react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchMe, isHydrated } = useAuth();


  useEffect(() => {
    if (isHydrated) {
      void fetchMe();
    }
  }, [isHydrated, fetchMe]);

  if (!isHydrated) {
    return <div className="flex min-h-screen w-full items-center justify-center bg-background text-muted-foreground text-sm">
         <Loader className="md:w-10 md:h-10 h-8 w-8  animate-spin" />
      </div>;
  }

  return <>{children}</>;}


