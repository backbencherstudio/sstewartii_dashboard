import React from 'react'

export default function PageTitle({ title, description }: { title: string, description: string }) {
  return (
    <div>
    <h1 className="self-stretch text-[#03070C] text-4xl font-bold leading-[129%] tracking-[-0.72px] font-lora">
        {title}
    </h1>
    <p className="self-stretch text-[#697586] text-base font-normal leading-[160%]">
        {description}
    </p>
</div>
  )
}
