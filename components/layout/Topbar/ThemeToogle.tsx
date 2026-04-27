import React, { useState } from 'react';
import OtherIcons from '@/components/icons/OtherIcons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"; // Adjust path as per your project structure
import { Tooltip as TooltipPrimitive } from "radix-ui"
export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    return (
        <TooltipProvider>
            <Tooltip>
                {/* Wrap the disabled button in a span/div to capture interactions */}
                <TooltipTrigger asChild>
                    <span className="inline-block cursor-not-allowed">
                        <button
                            disabled={true}
                            className={`relative flex items-center w-20 h-10 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-[#ECEFF3]'
                                }`}
                        >
                            <div
                                className={`absolute flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md transform transition-transform duration-300 ${isDarkMode ? 'translate-x-10 bg-gray-700' : 'translate-x-0 bg-[#FFB300]'
                                    }`}
                            >
                                {isDarkMode ? (
                                    <OtherIcons.DarkMoonIcon className="w-5 h-5" />
                                ) : (
                                    <OtherIcons.LightSunIcon className="w-5 h-5" />
                                )}
                            </div>
                            <div className="flex justify-between w-full px-2">
                                <OtherIcons.LightSunIcon className="w-5 h-5 text-white" />
                                <OtherIcons.DarkMoonIcon className="w-5 h-5 text-black" />
                            </div>
                        </button>
                    </span>
                </TooltipTrigger>

                {/* The Tooltip content */}
                <TooltipContent>
                    <p>Coming soon in our beta version!</p>
                    <TooltipPrimitive.Arrow className="z-50 size-3 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-black text-white" />
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};