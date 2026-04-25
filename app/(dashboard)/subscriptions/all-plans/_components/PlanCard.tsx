import React from "react";

type Plan = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="relative h-[720px] w-full min-w-[350px] overflow-hidden rounded-3xl bg-white shadow-[6px_6px_54px_0_rgba(0,0,0,0.05)]">
      <img
        src="/images/plan-bg2.png"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div className="relative z-10 flex h-full flex-col px-8 py-9">
        <div className="text-center">
          <h3 className="font-[Lora] text-2xl font-bold leading-[130%] tracking-[0.48px] text-[#697586]">
            {plan.name}
          </h3>

          <p className="m-0 text-base font-normal leading-[160%] text-[#697586]">
            Monthly Charge
          </p>

          <h2 className="font-[Lora] text-[40px] font-bold leading-[130%] tracking-[1.6px] text-[#2A3542]">
            {plan.price}
          </h2>
        </div>

        <p className="mt-7 min-h-[54px] text-sm font-normal leading-[160%] text-[#697586]">
          {plan.description}
        </p>

        <hr className="my-7 border-[#EAECF0]" />

        <div className="space-y-4 overflow-hidden">
          {plan.features.map((feature) => (
            <div key={feature} className="flex items-start gap-3">
              <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full border border-[#3AC2C2]" />

              <p className="m-0 text-sm font-normal leading-[160%] text-[#585D63]">
                {feature}
              </p>
            </div>
          ))}
        </div>

        <hr className="my-7 border-[#EAECF0]" />

        <button className="btn-primary">Edit Plan</button>
      </div>
    </div>
  );
}