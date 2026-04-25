import PageTitle from "@/components/reusable/PageTitle";
import PlanCard from "./_components/PlanCard";

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "$19.99",
    description:
      "Perfect for new vendors to get listed, manage their location, and be discovered.",
    features: [
      "List your truck on the map",
      "Manage your menu",
      "Real-time location updates",
      "Set availability at your preference",
      "Basic profile and map listing",
      "Location updates",
      "Menu display",
      "Customer discovery/search",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "$49.99",
    description:
      "Designed for growing vendors who want insights, better engagement, and visibility.",
    features: [
      "List your truck on the map",
      "Manage your menu",
      "Real-time location updates",
      "Set availability at your preference",
      "Basic profile and map listing",
      "Location updates",
      "Menu display",
      "Customer discovery/search",
      "Vendor analytics and performance dashboard",
      "Favorites and customer engagement insights",
      "Basic promotions/visibility tools",
    ],
  },
  {
    id: 3,
    name: "Elite",
    price: "$49.99",
    description:
      "Built for high-volume vendors ready to maximize performance with AI-powered tools.",
    features: [
      "List your truck on the map",
      "Manage your menu",
      "Real-time location updates",
      "Set availability at your preference",
      "Basic profile and map listing",
      "Location updates",
      "Menu display",
      "Customer discovery/search",
      "Vendor analytics and performance dashboard",
      "Favorites and customer engagement insights",
      "Basic promotions/visibility tools",
      "AI/predictive features and optimization",
      "Priority placement/featured listings",
      "Advanced analytics and reporting",
      "Early access to new features",
    ],
  },
];

export default function Page() {
  return (
    <div className="space-y-8">
      <PageTitle title="Your Plans" description="View all your plans" />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </section>
    </div>
  );
}