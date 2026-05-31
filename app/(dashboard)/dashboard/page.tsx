"use client";

import HeaderNotifyIcons from "@/components/icons/HeaderNotifyIcons";
import { ReusableSelect } from "@/components/form/CustomSelect";
import { useState } from "react";
import { RefreshCcwIcon } from "lucide-react";
import { PendingVendorVerifications, VendorsByStatus, TopVendors, PlatformRevenueChart, DashboardStats, DashboardGraph } from "./_components";
import PageTitle from "@/components/reusable/PageTitle";
import { useDashboardOverview } from "@/hooks/useDashboardOverview";
import type { DashboardAlerts } from "@/types/dashboard.types";


export default function DashboardPage() {

    const [selectedOption, setSelectedOption] = useState("this-month");

    const { data: dashboardOverview } = useDashboardOverview();
  
    return (
        <div className="md:space-y-6 space-y-4">
            {/* Header Section */}
            <div className="flex md:flex-row flex-col md:items-center md:justify-between gap-6">
                {/* Left Side - Welcome Text */}
                <PageTitle title="Welcome, Sedric Stewart 👋" description="Manage your platform data, operational health and vendor ecosystem status." />

                {/* Right Side - Action Buttons */}
                <div className="flex items-center gap-4">
                    <ReusableSelect
                        variant="outline"
                        // placeholder="Select an option"
                        // className="bg-white"
                        value={selectedOption}
                        options={[{ label: "This Month", value: "this-month" }, { label: "this-week", value: "this-week" }]}
                        onValueChange={(value) => {
                            setSelectedOption(value);
                        }}
                    />

                    <button className="btn-primary flex items-center gap-2">
                        <span className="text-nowrap">Today's Sync</span>

                        <RefreshCcwIcon className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Notification Cards Grid */}
            <DashboardAlerts alerts={dashboardOverview?.alerts} />

            <DashboardStats summary={dashboardOverview?.summary} />

            <section className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="w-full  flex-1">
                    <PlatformRevenueChart />
                </div>
                <VendorsByStatus vendorsByStatus={dashboardOverview?.vendorsByStatus} />
            </section>


            {/* Pending         rifications */}
            <section className="flex flex-col md:flex-row  justify-between gap-4">

                <div className="w-full  flex-1">
                    <PendingVendorVerifications />
                </div>
                <div className="w-full  flex-1">
                    <TopVendors />
                </div>

            </section>
        </div>
    );
}

interface HeaderNotifyCardProps {
    icon: React.ReactNode;
    title: string;
    color: string;
}

const HeaderNotifyCard = ({ icon, title, color }: HeaderNotifyCardProps) => {
    return (
        <div
            className="flex items-center gap-2 flex-[1_0_0] px-4 py-3 rounded-lg"
            style={{ backgroundColor: color }}
        >
            {icon}
            <p className="text-[#2A3542] font-inter text-base font-medium leading-[160%]">
                {title}
            </p>
        </div>
    );
};

const DashboardAlerts = ({ alerts }: { alerts: DashboardAlerts | undefined }) => {
    console.log("alerts", alerts);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border border-solid  bg-white shadow-[0_2px_20px_0_rgba(0,0,0,0.10)] p-4 rounded-2xl">
            <HeaderNotifyCard icon={<HeaderNotifyIcons.Issue />} title={`${alerts?.issuesNeedAttention || 0} Issue needs attention`} color="#F9DD8E" />
            <HeaderNotifyCard icon={<HeaderNotifyIcons.Onboarding />} title={`${alerts?.pendingOnboarding || 0} Onboarding pending`} color="#FCEFC9" />
            <HeaderNotifyCard icon={<HeaderNotifyIcons.Inactive />} title={`${alerts?.inactiveVendors || 0} Inactive vendor`} color="#FEFAEC" />
            <HeaderNotifyCard icon={<HeaderNotifyIcons.Revenue />} title={`${alerts?.todayRevenue || 0} Revenue updated: ${alerts?.currency || ''}`} color="#ECEFF3" />
        </div>
    );
};