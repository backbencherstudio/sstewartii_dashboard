"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import SettingsIcon from "@/components/icons/SettingsIcon";

const links = [
    { label: "Admin Information", href: "/settings/admin-information", Icon: SettingsIcon.Info },
    { label: "Notifications", href: "/settings/notifications", Icon: SettingsIcon.Notification },
    { label: "Security", href: "/settings/security", Icon: SettingsIcon.Security },
];

export default function SettingsSidebar() {
    const pathname = usePathname();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Cleaned up class names
    const baseCls = "flex items-center gap-3 w-full px-5 py-3 rounded-xl transition-all font-inter text-sm leading-[160%]";
    const inactiveCls = "text-[#697586] font-normal";
    const activeCls = "bg-gradient-to-r from-[#FFBB1C] to-[#E28611] text-[#070707] font-medium";

    if (isMobile) {
        return (
            <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1 scrollbar-hide">
                {links.map(({ label, href, Icon }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                baseCls,
                                isActive ? activeCls : inactiveCls
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            <span>{label}</span>
                        </Link>
                    );
                })}
            </div>
        );
    }

    return (
        <nav className="flex min-h-[calc(100vh-220px)] h-full w-[300px] flex-col gap-2 rounded-l-xl border-r border-[#E6E6E6] bg-[#F6F8FA] p-4 md:p-6 ">
            {links.map(({ label, href, Icon }) => {
                const isActive = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={cn(baseCls, isActive ? activeCls : inactiveCls)}
                    >
                        <Icon className="w-5 h-5" />
                        <span>{label}</span>
                    </Link>
                );
            })}
        </nav>
    );
}