import React from 'react'

export default function CustomButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className='btn-primary'>CustomButton</button>
  )
}
