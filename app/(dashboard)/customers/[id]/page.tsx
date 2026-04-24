"use client"

import { useParams } from "next/navigation";
import CustomerProfileDetails from "./_components/CustomerProfileDetails";

const fakeCustomer = {
    name: "David John",
    id: "99283",
    avatarUrl: "https://i.pravatar.cc/150?u=21332", // Using a placeholder service
    totalOrders: 1278,
    totalSpent: 4889.00,
    info: {
      fullName: "David John",
      email: "david@gmail.com",
      dob: "2 September, 2000",
      city: "Celina, Jakarta",
      phone: "+001 444 555 666"
    },
    orderInfo: {
      lastOrdered: "12-04-2026",
      completed: 3124,
      cancelled: 7,
      incomplete: 1,
      reports: 1
    }
  };
  
  // Usage in your page:
  // <CustomerProfileCard customer={fakeCustomer} />
export default function page() {
    const params = useParams();
    const id = params.id as string;
    return (
        <section className="space-y-6 md:space-y-8">


            {/* name and id */}
            <div>
                <h3 className="text-[#1A1C1E] [font-family:Lora] text-2xl font-bold leading-[130%] tracking-[0.48px]">David John</h3>
                <p className="self-stretch text-[color:var(--Stroke,#2A3542)] [font-family:Manrope] text-base font-normal leading-6 mt-1">Joined on Oct 24, 2023 • ID: #{id}</p>
            </div>

            {/* full details */}
            <CustomerProfileDetails customer={fakeCustomer} />


            {/* order table */} 

        </section>
    )
}
