import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ExternalLink, Copy, TrendingUp, Users, Globe, 
  Monitor, Smartphone, MousePointerClick, Calendar, Clock,
  BarChart3, PieChart, Activity, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { linkApi } from '../../api/linkApi';
import { analyticsApi } from '../../api/analyticsApi';
import { getShortUrl } from '../../utils/baseUrl';
import { formatDate } from '../../utils/date';
import { EnhancedAnalytics } from '../../components/analytics/EnhancedAnalytics';

interface LinkStats {
  totalClicks: number;
  uniqueVisitors: number;
  avgClicksPerDay: number;
  conversionRate: number;
}

interface DeviceBreakdown {
  desktop: number;
  mobile: number;
  tablet: number;
}

interface BrowserStats {
  name: string;
  count: number;
  percentage: number;
}

interface LocationData {
  country: string;
  clicks: number;
  percentage: number;
}

export function LinkDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [link, setLink] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);
  const [stats, setStats] = useState<LinkStats>({
    totalClicks: 0,
    uniqueVisitors: 0,
    avgClicksPerDay: 0,
    conversionRate: 0
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    fetchLinkDetails();
  }, [id, timeRange]);

  const fetchLinkDetails = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const [linkResponse, analyticsResponse] = await Promise.all([
        linkApi.getLinkByShortCode(id),
        analyticsApi.getUrlAnalytics(id)
      ]);

      setLink(linkResponse.data);
      setAnalytics(analyticsResponse.data);

      // Calculate stats
      const totalClicks = linkResponse.data.clicks || 0;
      const uniqueVisitors = analyticsResponse.data.summary?.uniqueVisitors || 0;
      const daysSinceCreation = Math.max(1, Math.ceil(
        (new Date().getTime() - new Date(linkResponse.data.createdAt).getTime()) / (1000 * 60 * 60 * 24)
      ));

      setStats({
        totalClicks,
        uniqueVisitors,
        avgClicksPerDay: parseFloat((totalClicks / daysSinceCreation).toFixed(2)),
        conversionRate: totalClicks > 0 ? parseFloat(((uniqueVisitors / totalClicks) * 100).toFixed(2)) : 0
      });
    } catch (error) {
      toast.error('Failed to fetch link details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (link) {
      const shortUrl = getShortUrl(link.customAlias || link.shortCode);
      navigator.clipboard.writeText(shortUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Link not found</h2>
          <button
            onClick={() => navigate('/links')}
            className="mt-4 text-primary hover:underline"
          >
            Back to Links
          </button>
        </div>
      </div>
    );
  }

  const deviceData: DeviceBreakdown = analytics?.summary?.deviceBreakdown || {
    desktop: 0,
    mobile: 0,
    tablet: 0
  };

  const browserStats: BrowserStats[] = analytics?.summary?.topBrowsers || [];
  const locationData: LocationData[] = analytics?.geographicData || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/links')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Links
        </button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Link Analytics</h1>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">Original URL:</span>
                  <a
                    href={link.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 text-primary hover:underline flex items-center"
                  >
                    {link.originalUrl}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center text-gray-600">
                  <MousePointerClick className="h-4 w-4 mr-2" />
                  <span className="text-sm">Short URL:</span>
                  <code className="ml-2 px-2 py-1 bg-gray-100 rounded text-primary font-mono text-sm">
                    {getShortUrl(link.customAlias || link.shortCode)}
                  </code>
                  <button
                    onClick={handleCopyLink}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Created: {formatDate(link.createdAt)}
                </div>
              </div>
            </div>

            {/* Time Range Selector */}
            <div className="ml-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <MousePointerClick className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5 opacity-60" />
          </div>
          <p className="text-sm opacity-90">Total Clicks</p>
          <p className="text-3xl font-bold mt-2">{stats.totalClicks.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 opacity-80" />
            <Activity className="h-5 w-5 opacity-60" />
          </div>
          <p className="text-sm opacity-90">Unique Visitors</p>
          <p className="text-3xl font-bold mt-2">{stats.uniqueVisitors.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 opacity-80" />
            <Clock className="h-5 w-5 opacity-60" />
          </div>
          <p className="text-sm opacity-90">Avg. Clicks/Day</p>
          <p className="text-3xl font-bold mt-2">{stats.avgClicksPerDay}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <PieChart className="h-8 w-8 opacity-80" />
            <TrendingUp className="h-5 w-5 opacity-60" />
          </div>
          <p className="text-sm opacity-90">Conversion Rate</p>
          <p className="text-3xl font-bold mt-2">{stats.conversionRate}%</p>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Monitor className="h-5 w-5 mr-2 text-primary" />
            Device Breakdown
          </h3>
          <div className="space-y-4">
            {Object.entries(deviceData).map(([device, count], index) => {
              const total = Object.values(deviceData).reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((count / total) * 100).toFixed(1) : 0;
              const icons = {
                desktop: Monitor,
                mobile: Smartphone,
                tablet: Smartphone
              };
              const Icon = icons[device as keyof typeof icons];

              return (
                <div key={device}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center">
                      <Icon className="h-4 w-4 mr-2 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700 capitalize">{device}</span>
                    </div>
                    <span className="text-sm text-gray-600">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                      className={`h-2 rounded-full ${
                        device === 'desktop' ? 'bg-blue-500' :
                        device === 'mobile' ? 'bg-green-500' : 'bg-purple-500'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Top Browsers */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2 text-primary" />
            Top Browsers
          </h3>
          <div className="space-y-3">
            {browserStats.slice(0, 5).map((browser, index) => (
              <div key={browser.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{browser.name}</span>
                  <span className="text-sm text-gray-600">{browser.count} ({browser.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${browser.percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                    className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Geographic Data */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="h-5 w-5 mr-2 text-primary" />
          Top Locations
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Country
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visual
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locationData.slice(0, 10).map((location, index) => (
                <motion.tr
                  key={location.country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {location.country}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {location.percentage}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${location.percentage}%` }}
                      />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Recent Clicks Timeline */}
      {analytics?.recentClicks && analytics.recentClicks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-white rounded-lg shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {analytics.recentClicks.slice(0, 10).map((click: any, index: number) => (
              <motion.div
                key={click.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    click.device === 'Mobile' ? 'bg-green-100' : 'bg-blue-100'
                  }`}>
                    {click.device === 'Mobile' ? (
                      <Smartphone className="h-4 w-4 text-green-600" />
                    ) : (
                      <Monitor className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{click.location || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{click.browser} · {click.operatingSystem}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{formatDate(click.clickedAt)}</p>
                  {click.isUnique && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      New
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Enhanced Analytics Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Eye className="w-6 h-6 mr-2 text-amber-500" />
          Detailed Analytics
        </h2>
        <EnhancedAnalytics analytics={analytics} loading={loading} />
      </div>
    </div>
  );
}
