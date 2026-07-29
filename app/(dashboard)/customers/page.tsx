'use client'

import PageTitle from "@/components/reusable/PageTitle";
import CustomerStats from "./_components/CustomerStats";
import CustomerManagementTable from "./_components/CustomerManagementTable";
import Link from "next/link";
import { useGetAllCustomers } from "@/hooks/useCustomers";
import { Cossette_Texte } from "next/font/google";


export default function customersPage() {

  const { data: customers, isLoading, error } = useGetAllCustomers();

  console.log(customers);

  // Show loading state
  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-64">
              <div className="text-[#697586]">Loading customers...</div>
          </div>
      );
  }

  // Show error state
  if (error) {
      return (
          <div className="flex justify-center items-center h-64">
              <div className="text-red-500">Error loading customers: {error.message}</div>
          </div>
      );
  }

  

  return (
    <div>
      <div className='space-y-6'>
        <div className="flex justify-between items-center">
          <PageTitle title="Customer Management" description="Monitor and manage the global customer base" />


          <Link href="/customers/report">
            <button className="btn-primary w-fit">Reported Customer Queue</button>
          </Link>
        </div>

        <CustomerStats data={customers?.data?.stats} />
        <CustomerManagementTable customers={customers?.data?.customers} />

      </div>
    </div>
  )
}
