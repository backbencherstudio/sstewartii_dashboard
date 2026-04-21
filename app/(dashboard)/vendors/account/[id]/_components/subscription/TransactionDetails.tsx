import OtherIcons from '@/components/icons/OtherIcons';
import Image from 'next/image';
import React from 'react';

const TransactionDetails = () => {
  return (
   
      <div className="space-y-10 shrink-0 [background:var(--Background-White,#FFF)] pt-8 pb-10 px-10 rounded-3xl">
       
       

        {/* Success Icon Container */}
        <div className="flex justify-center items-center mb-6">
          <div className="w-[150px] h-[150px] bg-orange-50 rounded-full flex items-center justify-center relative">
             <Image src="/success-tick.svg" alt="Success"  className="w-full h-full object-contain" fill />
          </div>
        </div>

        {/* Amount and Plan */}
        <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center font-lora">$49.99</h2>
        <p className="text-gray-500 mb-8 text-center">Subscription Plan: <span className="font-semibold text-gray-700">Pro</span></p>

        {/* Details Box */}
        <div className="bg-gray-50 rounded-2xl p-6 text-sm">
          <div className="flex justify-between mb-5">
            <span className="text-gray-500  text-lg font-medium leading-[160%">Invoice ID:</span>
            <span className=" text-gray-800  [font-family:Lora] text-lg font-bold leading-[130%]">#834759</span>
          </div>
          <div className="flex justify-between mb-5">
            <span className="text-gray-500  text-lg font-medium leading-[160%">Date:</span>
            <span className=" text-gray-800  [font-family:Lora] text-lg font-bold leading-[130%]">Jan 22, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500  text-lg font-medium leading-[160%">Card:</span>
            <span className=" text-gray-800  font-lora text-lg font-bold leading-[130%] flex items-center gap-2">
              {/* Simple representation of card icon */}
              <OtherIcons.Card/>
              • • • •   6750
            </span>
          </div>
        </div>
      </div>
    
  );
};

export default TransactionDetails;