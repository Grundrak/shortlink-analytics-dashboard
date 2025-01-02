
import { ExternalLink } from 'lucide-react';

interface Props {
  linkId: string | undefined;
}

const referrers = [
  { source: 'Google', visits: 3456, percentage: 45 },
  { source: 'Direct', visits: 2345, percentage: 30 },
  { source: 'Twitter', visits: 1234, percentage: 15 },
  { source: 'Facebook', visits: 789, percentage: 10 },
];

export function ReferrerStats({ linkId }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Top Referrers</h2>
      <div className="space-y-4">
        {referrers.map((referrer) => (
          <div key={referrer.source} className="flex items-center">
            <ExternalLink className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{referrer.source}</span>
                <span className="text-sm text-gray-500">{referrer.visits.toLocaleString()} visits</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${referrer.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}