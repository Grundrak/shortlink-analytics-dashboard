
import { Users, Globe, Clock, ArrowUpRight } from 'lucide-react';

interface Props {
  linkId: string | undefined;
}

const stats = [
  { name: 'Total Clicks', value: '12,345', icon: ArrowUpRight, change: '+12%' },
  { name: 'Unique Visitors', value: '8,901', icon: Users, change: '+8%' },
  { name: 'Countries', value: '45', icon: Globe, change: '+3' },
  { name: 'Avg. Click Time', value: '2.3s', icon: Clock, change: '-0.5s' },
];

export function AnalyticsSummary({ linkId }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                    <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}