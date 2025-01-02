
import { Globe } from 'lucide-react';

interface Props {
  linkId: string | undefined;
}

const locations = [
  { country: 'United States', visits: 5678, percentage: 40 },
  { country: 'United Kingdom', visits: 3456, percentage: 25 },
  { country: 'Germany', visits: 2345, percentage: 20 },
  { country: 'France', visits: 1234, percentage: 15 },
];

export function LocationMap({ linkId }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Geographic Distribution</h2>
      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.country} className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{location.country}</span>
                <span className="text-sm text-gray-500">{location.visits.toLocaleString()} visits</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${location.percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}