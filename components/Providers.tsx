"use client";

import { AuthProvider } from "@/components/layout/Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SidebarProvider } from "./ui/sidebar";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </SidebarProvider>
    </QueryClientProvider>);
}
