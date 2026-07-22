"use client"

import { useParams, useRouter } from "next/navigation";
import CustomerProfileDetails from "./_components/CustomerProfileDetails";
import { useGetCustomerById } from "@/hooks/useCustomers";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

// Transform API data to match the expected format
const transformCustomerData = (apiData: any) => {
    return {
        name: apiData.fullName || "N/A",
        id: apiData.id || "N/A",
        avatarUrl: apiData.avatar || "https://i.pravatar.cc/150?u=" + apiData.id,
        totalOrders: apiData.totalOrders || 0,
        totalSpent: apiData.totalSpent || 0,
        info: {
            fullName: apiData.fullName || "N/A",
            email: apiData.email || "N/A",
            dob: apiData.dateOfBirth ? format(new Date(apiData.dateOfBirth), "d MMMM, yyyy") : "Not provided",
            city: apiData.cityOfResidence || "Not provided",
            phone: apiData.phoneNumber || "Not provided"
        },
        orderInfo: {
            lastOrdered: apiData.lastOrderedAt ? format(new Date(apiData.lastOrderedAt), "dd-MM-yyyy") : "No orders yet",
            completed: apiData.completedOrders || 0,
            cancelled: apiData.cancelledOrders || 0,
            incomplete: apiData.incompleteOrders || 0,
            reports: apiData.reportsFiled || 0
        },
        orders: apiData.orders || []
    };
};

export default function CustomerProfilePage() {
    const params = useParams();
    const id = params.id as string;
    const { data: customerData, isLoading, error } = useGetCustomerById(id);
    const router = useRouter();

    const handleGoBack = () => {
        router.back();
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-[#697586]">Loading customer profile...</div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-red-500">Error loading customer: {error.message}</div>
            </div>
        );
    }

    // No data state
    if (!customerData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-[#697586]">Customer not found</div>
            </div>
        );
    }

    // Transform the API data
    const customer = transformCustomerData(customerData?.data);
    const joinedDate = customerData.joinedAt ? format(new Date(customerData.joinedAt), "MMM d, yyyy") : "N/A";

    console.log("Transformed customer:", customer);
    console.log("Orders:", customerData.orders);

    return (
        <section className="space-y-6 md:space-y-8">
            <div className="flex justify-between items-center">
                {/* Name and ID */}
                <div>
                    <h3 className="text-[#1A1C1E] font-Lora text-2xl font-bold leading-[130%] tracking-[0.48px]">
                        {customer.name}
                    </h3>
                    <p className="self-stretch text-[#2A3542] font-Manrope text-base font-normal leading-6 mt-1">
                        Joined on {joinedDate} • ID: #{customer.id}
                    </p>
                </div>

                {/* Status */}
                <div>
                    <Button className="bg-[#F09F16] text-white" onClick={handleGoBack}  > <ArrowLeftIcon className="w-4 h-4" /> Go Back</Button>
                </div>
            </div>

            {/* Full details */}
            <CustomerProfileDetails customer={customer} />

            {/* Order table - you can add this section here */}
            {/* 
            <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Order History</h4>
                <OrderTable orders={customer.orders} />
            </div>
            */}
        </section>
    );
}