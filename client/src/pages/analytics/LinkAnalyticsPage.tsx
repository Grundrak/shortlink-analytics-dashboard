
import { useState, useEffect } from 'react';
import { analyticsApi } from '../../api/analyticsApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, Users, MousePointer, Globe } from 'lucide-react';

export function LinkAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetchGlobalAnalytics();
  }, []);

  const fetchGlobalAnalytics = async () => {
    try {
      setLoading(true);
      const response = await analyticsApi.getOverallSummary();
      setData(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Global Analytics Overview</h1>
        <p className="text-gray-500 mt-1">Performance metrics across all your shortened links</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clicks</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {data?.summary?.totalClicks?.toLocaleString() || 0}
                </h3>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <MousePointer className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Unique Visitors</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {data?.summary?.uniqueVisitors?.toLocaleString() || 0}
                </h3>
              </div>
              <div className="p-3 bg-purple-50 rounded-full">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Top Country</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1 truncate max-w-[120px]" title={data?.topLocations?.[0]?.country || 'N/A'}>
                  {data?.topLocations?.[0]?.country || 'N/A'}
                </h3>
              </div>
              <div className="p-3 bg-green-50 rounded-full">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Click Rate</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">
                  {((data?.summary?.totalClicks / (data?.summary?.totalLinks || 1)) || 0).toFixed(1)}
                </h3>
              </div>
              <div className="p-3 bg-orange-50 rounded-full">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performing Links */}
        <div className="bg-white rounded-lg border shadow-sm col-span-1">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Links</h3>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.topUrls?.slice(0, 5) || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="shortCode" type="category" width={100} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="clicks" fill="#F59E0B" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Device Distribution */}
        <div className="bg-white rounded-lg border shadow-sm col-span-1">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Device Distribution</h3>
          </div>
          <div className="p-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.deviceStats || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="device" />
                  <YAxis />
                  <Tooltip 
                     cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}