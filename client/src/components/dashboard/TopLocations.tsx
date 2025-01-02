
import { Globe } from 'lucide-react';

const locations = [
  { country: 'United States', clicks: 12453, percentage: 35 },
  { country: 'United Kingdom', clicks: 8234, percentage: 25 },
  { country: 'Germany', clicks: 6543, percentage: 20 },
  { country: 'France', clicks: 4321, percentage: 15 },
  { country: 'Japan', clicks: 2134, percentage: 5 },
];

export function TopLocations() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Top Locations</h2>
      <div className="space-y-4">
        {locations.map((location) => (
          <div key={location.country} className="flex items-center">
            <Globe className="h-5 w-5 text-gray-400 mr-3" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{location.country}</span>
                <span className="text-sm text-gray-500">{location.clicks.toLocaleString()} clicks</span>
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