
import { useState, useEffect } from 'react';
import { Users, Globe, Clock, ArrowUpRight } from 'lucide-react';
import { analyticsApi } from '../../api/analyticsApi';
import { toast } from 'sonner';

interface Props {
  linkId: string | undefined;
}

interface AnalyticsStats {
  totalClicks: number;
  uniqueVisitors: number;
  countries: number;
  avgClickTime: string;
}

export function AnalyticsSummary({ linkId }: Props) {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!linkId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await analyticsApi.getUrlAnalytics(linkId);
        
        // Extract analytics data
        const analyticsData = response.data;
        const summary = analyticsData.summary || {};
        
        setStats({
          totalClicks: summary.totalClicks || 0,
          uniqueVisitors: summary.uniqueVisitors || 0,
          countries: summary.countries?.length || 0,
          avgClickTime: '2.3s' // This would need to be calculated from actual data
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
        toast.error('Failed to load analytics data');
        
        // Fallback data
        setStats({
          totalClicks: 0,
          uniqueVisitors: 0,
          countries: 0,
          avgClickTime: '0s'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [linkId]);

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="animate-pulse">
                <div className="flex items-center">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                  <div className="ml-5 w-0 flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="mt-8 text-center py-8">
        <p className="text-gray-500">No analytics data available</p>
      </div>
    );
  }

  const statItems = [
    { 
      name: 'Total Clicks', 
      value: stats.totalClicks.toLocaleString(), 
      icon: ArrowUpRight, 
      change: '+12%' 
    },
    { 
      name: 'Unique Visitors', 
      value: stats.uniqueVisitors.toLocaleString(), 
      icon: Users, 
      change: '+8%' 
    },
    { 
      name: 'Countries', 
      value: stats.countries.toString(), 
      icon: Globe, 
      change: '+3' 
    },
    { 
      name: 'Avg. Click Time', 
      value: stats.avgClickTime, 
      icon: Clock, 
      change: '-0.5s' 
    },
  ];
  return (
    <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((stat) => (
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