'use client';
import React from 'react'
import useAuth from '@/hooks/useAuth';

export default function Topbar() {
  const { user } = useAuth();

  // console.log(user);

  return (
    <div className='bg-blue-500 p-4'>this topbar {user?.name}</div>
  )
}