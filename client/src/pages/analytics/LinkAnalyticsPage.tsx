
import { useParams } from 'react-router-dom';
import { AnalyticsSummary } from '../../components/analytics/AnalyticsSummary';
import { ClicksOverTime } from '../../components/analytics/ClicksOverTime';
import { DeviceStats } from '../../components/analytics/DeviceStats';
import { ReferrerStats } from '../../components/analytics/ReferrerStats';
import { LocationMap } from '../../components/analytics/LocationMap';

export function LinkAnalyticsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold text-gray-900">Link Analytics</h1>
      <AnalyticsSummary linkId={id} />
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ClicksOverTime linkId={id} />
        <DeviceStats linkId={id} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ReferrerStats linkId={id} />
        <LocationMap linkId={id} />
      </div>
    </div>
  );
}