
import { DashboardStats } from '../../components/dashboard/DashboardStats';
import { RecentLinks } from '../../components/dashboard/RecentLinks';
import { ClicksChart } from '../../components/dashboard/ClicksChart';
import { TopLocations } from '../../components/dashboard/TopLocations';

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <DashboardStats />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ClicksChart />
        <TopLocations />
      </div>
      <RecentLinks />
    </div>
  );
}