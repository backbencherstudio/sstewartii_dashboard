import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import { Providers } from "@/components/Providers";
import { Toaster } from "sonner";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Toaster position="top-center" richColors />
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  );
}