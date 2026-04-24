import PageTitle from "@/components/reusable/PageTitle";
import CustomerStats from "./_components/CustomerStats";
import CustomerManagementTable from "./_components/CustomerManagementTable";
import Link from "next/link";

export default function customersPage() {
  return (
    <div>
      <div className='space-y-6'>
        <div className="flex justify-between items-center">
          <PageTitle title="Customer Management" description="Monitor and manage the global customer base" />


          <Link href="/customers/report">
            <button className="btn-primary w-fit">Reported Customer Queue</button>
          </Link>
        </div>

        <CustomerStats />
        <CustomerManagementTable />

      </div>
    </div>
  )
}
