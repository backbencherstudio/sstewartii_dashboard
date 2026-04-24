import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import OtherIcons from "./icons/OtherIcons";

type ModalMode = "suspend" | "disable";

type VendorActionModalProps = {
  mode: ModalMode;
  onCancel?: () => void;
  onConfirm?: () => void;
};

const modalConfig = {
  suspend: {
    title: "Suspend Vendor Account?",
    question: "Are you sure you want to suspend this vendor?",
    impacts: [
      "Portal access for vendor representatives revoked",
    ],
    buttonText: "Suspend",
  },

  disable: {
    title: "Disable Vendor Account?",
    question: "Are you sure you want to disable this vendor?",
    impacts: [
      "Hidden from public and internal discovery maps",
      "No new purchase orders or contracts can be generated",
    ],
    buttonText: "Disable",
  },
};

export default function VendorActionModal({
  mode,
  onCancel,
  onConfirm,
}: VendorActionModalProps) {
  const config = modalConfig[mode];

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[rgba(186,26,26,0.10)]">
          <OtherIcons.SuspendUser className="h-5 w-5 text-[#FF3838]" />
        </span>

        <h2 className="font-[Lora] text-[30px] font-bold leading-[130%] tracking-[0.6px] text-[#070707]">
          {config.title}
        </h2>
      </div>

      {/* Warning Icon */}
      <div className="mb-6 flex justify-center">
        <OtherIcons.WarrningIcon />
      </div>

      {/* Question */}
      <h3 className="text-[color:var(--B,#070707)]  [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px] mb-4 ">
        {config.question}
      </h3>

      {/* Impact */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Info className="h-6 w-6 text-[#22C7D8]" />
          <p className="m-0 text-lg font-semibold leading-none text-[#667085]">
            System Impact
          </p>
        </div>

        {/* Multiple impacts */}
        <div className="space-y-2">
          {config.impacts.map((impact, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F2F4F7] ">
                {/* <OtherIcons.EyeSlash className="h-5 w-5 text-[#667085]" /> */}
              </span>

              <p className=" text-[#697586] text-sm  font-normal leading-6">
                {impact}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="h-[66px] rounded-[18px] border-[#667085] bg-white text-lg font-semibold text-[#4B5563] hover:bg-gray-50"
        >
          Cancel
        </Button>

        <Button
          type="button"
          onClick={onConfirm}
          className="h-[66px] rounded-[18px] bg-[#FF3838] text-lg font-semibold text-white hover:bg-[#F02F2F]"
        >
          {config.buttonText}
          <OtherIcons.SuspendUser className="ml-2 h-5 w-5 text-white" />
        </Button>
      </div>
    </div>
  );
}