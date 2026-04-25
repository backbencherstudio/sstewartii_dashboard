import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

export default function page() {
  return (
    <div className='flex flex-col items-center justify-center h-[90vh] '  >


      <div className='w-[1000px] h-[578px] relative'>
        <Image src="/404.svg" alt="event-bg" fill className='object-contain' />
      </div>

      <div className='max-w-[760px] mx-auto mt-20'>
       <h2 className='self-stretch text-[color:var(--B,#070707)] text-center [font-family:Lora] text-[40px] font-bold leading-[130%] tracking-[1.6px]'>Ooops!</h2>
       <p className='text-[color:var(--Stroke,#2A3542)] text-center [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px] mt-5'>the page are looking for not found!</p>


        <Link href="/">
       <button className='btn-primary mt-10 flex'>
          Go to Home
       </button>
        </Link>
      </div>


    </div>
  )
}
