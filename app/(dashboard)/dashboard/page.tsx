import { DashboardStats, DashboardGraph } from "./_components";

export default function DashboardPage() {
    return (
        <div>
            <h1>Dashboard</h1>
            <DashboardStats />
            <DashboardGraph />
        </div>
    );
}