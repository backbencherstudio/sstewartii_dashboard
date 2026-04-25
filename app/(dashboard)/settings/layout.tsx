
import { ReactNode } from "react";
import SettingsSidebar from "./_components/SettingSidebar";
import PageTitle from "@/components/reusable/PageTitle";

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 md:space-y-5 border bg-white p-4 md:p-6 rounded-2xl border-[#EAECF0]">
      
      <PageTitle title="Settings" description="Manage platform configuration and preferences" />
      <section className="flex flex-col lg:flex-row gap-0.5">
        
        {/* Sidebar - becomes tabs on mobile */}
        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
          <SettingsSidebar />
        </div>

        {/* Content */}
        <div className="flex-1 w-full bg-[#F6F8FA] rounded-r-xl p-4 md:p-6 ">
          {children}
        </div>

      </section>
    </div>
  );
}