import Image from 'next/image';
import React from 'react';

interface EmptyStateProps {
  imageSrc?: string;
  title?: string;
  description?: string;
  containerHeight?: string;
}

export default function EmptyState({
  imageSrc = "/images/empty-data/platform-revenue.png",
  title = "No data available",
  description = "Please try again later",
  containerHeight = "h-full"
}: EmptyStateProps) {
  return (
    <div className={`flex items-center justify-center flex-col md:gap-6 ${containerHeight} w-full py-10`}>
      
      {/* Image Container */}
      <div className='w-[155px] h-[150px] relative'>
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className='object-contain' 
          priority
        />
      </div>

      {/* Text Content */}
      <div className='flex flex-col items-center justify-center gap-3.5'>
        <h3 className='text-[#2A3542] text-center font-serif text-lg font-bold leading-[130%]'>
          {title}
        </h3>
        <p className='max-w-[408px] text-[#697586] text-center font-sans text-base font-normal leading-[160%]'>
          {description}
        </p>
      </div>
    </div>
  );
}