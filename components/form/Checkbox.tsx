"use client";

import { useState } from "react";

interface CheckboxProps {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Checkbox = ({
  defaultChecked = false,
  onChange,
  label,
  disabled = false,
}: CheckboxProps) => {
  const [checked, setChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    /* 1. Removed onClick from label to prevent double-triggering. 
      2. The htmlFor/id connection handles the toggle naturally.
    */
    <label
      className={`inline-flex items-center gap-3 select-none 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggle} // Only trigger logic here
        disabled={disabled}
        className="sr-only" // 'hidden' can sometimes break accessibility, sr-only is safer
      />

      <div
        className={`
          flex items-center justify-center
          w-[18px] h-[18px] rounded-sm  
          transition-all duration-200 active:scale-95
          ${checked
            ? "bg-gradient-to-br from-amber-400 to-amber-500 border-transparent shadow-sm shadow-amber-200"
            : "bg-transparent border-2 border-[#697586] hover:border-[#F9B01A]"
          }
        `}
      >
        {checked && (
          <svg
            viewBox="0 0 52 52"
            fill="none"
            className="w-4 h-4 md:w-5 md:h-5 animate-in zoom-in-50 duration-200"
          >
            <path
              d="M13 27L22 36L39 18"
              stroke="white"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      {label && (
        <span className="text-[color:var(--Secondary-Text,#697586)] [font-family:Inter] text-base font-medium leading-[160%] opacity-70">
          {label}
        </span>
      )}
    </label>
  );
};

export default Checkbox;