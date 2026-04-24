"use client";

import { AuthProvider } from "@/components/layout/Provider/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SidebarProvider } from "./ui/sidebar";
import { TooltipProvider } from "./ui/tooltip";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AuthProvider>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </AuthProvider>
      </SidebarProvider>
    </QueryClientProvider>);
}
