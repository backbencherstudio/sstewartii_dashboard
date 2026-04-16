import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


export default function SuccessPage() {
  return (
    <div className="flex min-w-[380px] flex-col items-center gap-[60px] rounded-3xl [background:var(--Opacity-Dark-05,rgba(8,14,30,0.05))] p-5 md:min-w-[600px] md:p-10">

      <div className="flex w-full max-w-[440px] flex-col items-center gap-[40px]">'
        <div className="w-[265px] h-[140px]">
          <Image src="/images/success-icon.png" alt="success" width={265} height={140} />
        </div>

        <h1 className="self-stretch text-[color:var(--Stroke,#2A3542)] text-center [font-family:Lora] text-[40px] font-bold leading-[130%] tracking-[1.6px] mb-3">You’ve successfully reset your password!</h1>
        <p className="self-stretch text-[color:var(--Secondary-Text,#697586)] text-center [font-family:Inter] text-sm font-normal leading-[160%]">Password updated! You’re all set to continue</p>




        <Link className="w-full" href="/login">

          <button className="btn-primary w-full">Go to Login</button>

        </Link>

      </div>
    </div>
  )
}



