import DashboardLayout from "@/components/layout/DashboardLayout/DashboardLayout";
import { Providers } from "@/components/Providers";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <DashboardLayout>{children}</DashboardLayout>
    </Providers>
  );
}