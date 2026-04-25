import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center'>


      <Image src="/not-available.svg" alt="event-bg" width={1000} height={1000} />

      <div className='max-w-[760px] mx-auto'>
        <h2 className='self-stretch text-[#2A3542] text-center [font-family:Lora] text-[40px] font-bold leading-[130%] tracking-[1.6px]'>This feature will be available in the beta version.</h2>
        <p className='mt-1 self-stretch text-[#697586] text-center  text-lg font-medium leading-[160%]'>Stay tuned for advanced event curation and logistical management tools designed for high-stakes environments. Beta version is underway, and access will be available soon.</p>
      </div>
    </div>
  )
}
