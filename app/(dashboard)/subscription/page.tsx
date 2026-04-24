import PageTitle from "@/components/reusable/PageTitle";
import AnalyticStats from "../analytics/_components/AnalyticStats";

export default function subscriptionPage() {
  return (

    <div className='space-y-6'>
      <PageTitle title="Subscription Management" description="Configure and manage platform membership tiers." />

      <AnalyticStats />
    </div>);
}
 