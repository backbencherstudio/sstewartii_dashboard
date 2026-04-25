"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReusableSelect } from "@/components/form/CustomSelect";

export default function CreateSubscriptionPlan() {
  return (
    <div className="w-full space-y-7">


      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Card */}
        <div className="rounded-xl border border-[#DFE1E7] bg-white px-6 py-6">
          <h3 className=" text-[#4A4C56] text-xl font-semibold leading-[116%] tracking-[0.1px] mb-6">
            Plan Informations
          </h3>

          <div className="space-y-6">
            <InputField label="Plan Name" placeholder="Enter plan name" />

            <TextareaField
              label="Descriptions"
              placeholder="Enter Descriptions"
              className="h-[104px]"
            />

            <InputField label="Price" placeholder="0" />



            <div>
              <label className="mb-2 block self-stretch text-[#697586] font-bold leading-[130%] font-lora">
                Currency
              </label>
              <ReusableSelect className="flex h-[54px] w-full items-center justify-between rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 text-sm text-[#A0AEC0]" placeholder="Select Currency" options={[{ value: "USD", label: "USD" }, { value: "EUR", label: "EUR" }, { value: "GBP", label: "GBP" }, { value: "JPY", label: "JPY" }, { value: "AUD", label: "AUD" }, { value: "CAD", label: "CAD" }, { value: "CHF", label: "CHF" }, { value: "CNY", label: "CNY" }, { value: "SEK", label: "SEK" }, { value: "NZD", label: "NZD" }]} onValueChange={() => { }} />
            </div>


            <div>
              <label className="mb-2 block self-stretch text-[#697586] font-bold leading-[130%] font-lora">
                Billing Period
              </label>
              <ReusableSelect className="flex h-[54px] w-full items-center justify-between rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 text-sm text-[#A0AEC0]" placeholder="Select Billing Period" options={[{ value: "Monthly", label: "Monthly" }, { value: "Yearly", label: "Yearly" }]} onValueChange={() => { }} />
            </div>


          </div>
        </div>

        {/* Right Card */}
        <PlanFeaturesCard />
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-end gap-5">
        <Button
          type="button"
          className="h-[54px] min-w-[220px] rounded-xl bg-[#D9D9D9] text-sm font-medium text-[#697586] hover:bg-[#D0D0D0]"
        >
          Cancel
        </Button>

        <Button
          type="button"
          className="h-[54px] min-w-[220px] rounded-xl bg-[#F59E0B] text-sm font-semibold text-[#161618] hover:bg-[#E8960A]"
        >
          Create Plan
        </Button>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block self-stretch text-[#697586] font-bold leading-[130%] font-lora">
        {label}
      </label>
      <input
        placeholder={placeholder}
        className="h-[54px] w-full rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 text-sm text-[#161618] outline-none placeholder:text-[#A0AEC0] focus:border-[#F59E0B]"
      />
    </div>
  );
}

function TextareaField({
  label,
  placeholder,
  className = "",
}: {
  label: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <div>
      <label className="mb-2 block self-stretch text-[#697586] font-bold leading-[130%] font-lora">
        {label}
      </label>
      <textarea
        placeholder={placeholder}
        className={`w-full resize-none rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 py-3 text-sm text-[#161618] outline-none placeholder:text-[#A0AEC0] focus:border-[#F59E0B] ${className}`}
      />
    </div>
  );
}

function SelectField({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#697586]">
        {label}
      </label>



      <button
        type="button"
        className="flex h-[54px] w-full items-center justify-between rounded-md border border-[#DFE1E7] bg-[#F8FAFC] px-4 text-sm text-[#A0AEC0]"
      >
        {placeholder}
        <ChevronDown className="h-4 w-4 text-[#697586]" />
      </button>
    </div>
  );
}





import { Edit2, Plus } from "lucide-react";


type Feature = {
  id: number;
  text: string;
  enabled: boolean;
};

function PlanFeaturesCard() {
  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      text: "Priority placement/featured listings",
      enabled: false,
    },
    {
      id: 2,
      text: "Advanced analytics and reporting",
      enabled: false,
    },
    {
      id: 3,
      text: "Early access to new features",
      enabled: false,
    },
  ]);

  const [featureText, setFeatureText] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrUpdate = () => {
    if (!featureText.trim()) return;

    if (editingId) {
      setFeatures((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, text: featureText } : item
        )
      );
      setEditingId(null);
    } else {
      setFeatures((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: featureText,
          enabled: false,
        },
      ]);
    }

    setFeatureText("");
  };

  const handleEdit = (feature: Feature) => {
    setFeatureText(feature.text);
    setEditingId(feature.id);
  };

  const handleCancel = () => {
    setFeatureText("");
    setEditingId(null);
  };

  const handleToggle = (id: number) => {
    setFeatures((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, enabled: !item.enabled } : item
      )
    );
  };

  return (
    <div className="rounded-xl border border-[#DFE1E7] bg-white px-6 py-6">
      <h3 className="mb-6 text-xl font-semibold leading-[116%] tracking-[0.1px] text-[#4A4C56]">
        Plan Features
      </h3>

      <div className="rounded-xl bg-[#F6F8FA] px-7 py-7">
        <div className="flex justify-center">
          <Image
            src="/images/add-feature.svg"
            alt="Feature list"
            width={250}
            height={170}
            className="object-contain"
          />
        </div>

        <div className="mt-7">
          <label className="mb-2 block text-xs font-semibold text-[#697586]">
            Write Feature Description
          </label>

          <textarea
            value={featureText}
            onChange={(e) => setFeatureText(e.target.value)}
            placeholder="Write feature description..."
            className="h-[104px] w-full resize-none rounded-md border border-[#DFE1E7] bg-white px-4 py-3 text-sm text-[#161618] outline-none placeholder:text-[#A0AEC0] focus:border-[#F59E0B]"
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-5">
          <Button
            type="button"
            variant="ghost"
            onClick={handleCancel}
            className="h-10 rounded-lg text-xs font-medium text-[#697586] hover:bg-transparent"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleAddOrUpdate}
            className="h-10 rounded-lg bg-[#F59E0B] text-xs font-semibold text-[#161618] hover:bg-[#E8960A]"
          >
            {editingId ? "Update" : "Add"}
          </Button>
        </div>

        <div className="mt-6 space-y-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggle(feature.id)}
                  className={`flex h-4 w-8 items-center rounded-full p-[2px] transition ${feature.enabled ? "bg-[#F59E0B]" : "bg-[#DFE1E7]"
                    }`}
                >
                  <span
                    className={`h-3 w-3 rounded-full bg-white transition ${feature.enabled ? "translate-x-4" : "translate-x-0"
                      }`}
                  />
                </button>

                <p className="m-0 text-sm font-normal leading-[160%] text-[#4A4C56]">
                  {feature.text}
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleEdit(feature)}
                className="text-[#697586] hover:text-[#F59E0B]"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.8125 11.25V13.5C14.8125 15.3135 13.8135 16.3125 12 16.3125H4.5C2.6865 16.3125 1.6875 15.3135 1.6875 13.5V6C1.6875 4.1865 2.6865 3.1875 4.5 3.1875H6.75C7.0605 3.1875 7.3125 3.4395 7.3125 3.75C7.3125 4.0605 7.0605 4.3125 6.75 4.3125H4.5C3.31725 4.3125 2.8125 4.81725 2.8125 6V13.5C2.8125 14.6827 3.31725 15.1875 4.5 15.1875H12C13.1827 15.1875 13.6875 14.6827 13.6875 13.5V11.25C13.6875 10.9395 13.9395 10.6875 14.25 10.6875C14.5605 10.6875 14.8125 10.9395 14.8125 11.25ZM16.3125 4.542C16.3118 4.98225 16.14 5.3955 15.828 5.706L9.10574 12.3983C8.99999 12.5033 8.8575 12.5625 8.709 12.5625H6C5.6895 12.5625 5.4375 12.3105 5.4375 12V9.29176C5.4375 9.14326 5.496 8.99999 5.60175 8.89499L12.294 2.172C12.6038 1.86 13.0177 1.68825 13.458 1.6875C13.4587 1.6875 13.4595 1.6875 13.4603 1.6875C13.8998 1.6875 14.313 1.8585 14.6243 2.16975L15.831 3.37651C16.1415 3.68776 16.3132 4.10175 16.3125 4.542ZM13.2128 6.72226L11.2777 4.78725L6.5625 9.52425V11.4383H8.4765L13.2128 6.72226ZM15.1875 4.54049C15.1875 4.40099 15.1335 4.26976 15.0352 4.17151L13.8285 2.96475C13.7302 2.8665 13.599 2.8125 13.4603 2.8125H13.4595C13.32 2.8125 13.1895 2.86726 13.0913 2.96551L12.072 3.98925L14.0108 5.92799L15.0345 4.90876C15.1328 4.81126 15.1868 4.67999 15.1875 4.54049Z" fill="#4A4C56" />
                </svg>

              </button>
            </div>
          ))}
        </div>


      </div>
    </div>
  );
}