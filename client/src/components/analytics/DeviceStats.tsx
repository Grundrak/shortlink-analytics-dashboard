
import { useState, useEffect } from 'react';
import { Smartphone, Laptop, Tablet, Bot, Monitor, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { analyticsApi } from '../../api/analyticsApi';
import { toast } from 'sonner';

interface Props {
  linkId: string | undefined;
  timeRange?: string;
}

interface DeviceData {
  name: string;
  value: number;
  percentage: number;
  icon: LucideIcon;
  color: string;
}

const deviceIcons: { [key: string]: LucideIcon } = {
  mobile: Smartphone,
  desktop: Laptop,
  tablet: Tablet,
  bot: Bot,
  unknown: Monitor
};

const deviceColors: { [key: string]: string } = {
  mobile: 'bg-blue-500',
  desktop: 'bg-green-500',
  tablet: 'bg-purple-500',
  bot: 'bg-orange-500',
  unknown: 'bg-gray-500'
};

export function DeviceStats({ linkId, timeRange = '30d' }: Props) {
  const [devices, setDevices] = useState<DeviceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalClicks, setTotalClicks] = useState(0);

  useEffect(() => {
    const fetchDeviceStats = async () => {
      if (!linkId) {
        // Fetch user-wide device stats
        try {
          const response = await analyticsApi.getUserAnalyticsSummary(timeRange);
          const data = response.data;
          
          // Aggregate device data from all URLs
          const deviceCounts: { [key: string]: number } = {};
          let total = 0;
          
          data.urls?.forEach((url: { analytics?: { mobileVsDesktop?: Record<string, number> } }) => {
            const analytics = url.analytics;
            if (analytics && analytics.mobileVsDesktop) {
              Object.entries(analytics.mobileVsDesktop).forEach(([device, count]) => {
                deviceCounts[device] = (deviceCounts[device] || 0) + count;
                total += count;
              });
            }
          });
          
          setTotalClicks(total);
          processDeviceData(deviceCounts, total);
        } catch (error) {
          console.error('Error fetching user device stats:', error);
          toast.error('Failed to load device statistics');
        }
      } else {
        // Fetch device stats for specific URL
        try {
          const response = await analyticsApi.getUrlAnalytics(linkId);
          const analytics = response.data.summary;
          
          if (analytics && analytics.mobileVsDesktop) {
            const total = Object.values(analytics.mobileVsDesktop).reduce((sum: number, count) => sum + (count as number), 0);
            setTotalClicks(total);
            processDeviceData(analytics.mobileVsDesktop, total);
          }
        } catch (error) {
          console.error('Error fetching URL device stats:', error);
          toast.error('Failed to load device statistics');
        }
      }
      setLoading(false);
    };

    fetchDeviceStats();
  }, [linkId, timeRange]);

  const processDeviceData = (deviceCounts: { [key: string]: number }, total: number) => {
    const deviceData: DeviceData[] = Object.entries(deviceCounts)
      .map(([deviceType, count]) => {
        const percentage = total > 0 ? (count / total * 100) : 0;
        const normalizedType = deviceType.toLowerCase();
        
        return {
          name: deviceType.charAt(0).toUpperCase() + deviceType.slice(1),
          value: count,
          percentage: Math.round(percentage * 10) / 10,
          icon: deviceIcons[normalizedType as keyof typeof deviceIcons] || deviceIcons.unknown,
          color: deviceColors[normalizedType as keyof typeof deviceColors] || deviceColors.unknown
        };
      })
      .filter(device => device.value > 0)
      .sort((a, b) => b.value - a.value);
    
    setDevices(deviceData);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Device Distribution</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center">
              <div className="h-5 w-5 bg-gray-200 rounded mr-3"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-2 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Device Distribution</h2>
        <div className="text-center py-8">
          <Monitor className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No device data available</p>
          <p className="text-sm text-gray-400 mt-1">Start getting clicks to see device analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Device Distribution</h2>
        <span className="text-sm text-gray-500">{totalClicks.toLocaleString()} total clicks</span>
      </div>
      
      <div className="space-y-4">
        {devices.map((device, index) => (
          <motion.div
            key={device.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center"
          >
            <div className="flex items-center mr-3">
              <device.icon className="h-5 w-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{device.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{device.value.toLocaleString()}</span>
                  <span className="text-sm font-medium text-gray-700">{device.percentage}%</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${device.percentage}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`${device.color} h-2 rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {devices.find(d => d.name.toLowerCase().includes('mobile'))?.percentage || 0}%
            </p>
            <p className="text-sm text-gray-500">Mobile Traffic</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {devices.find(d => d.name.toLowerCase().includes('desktop'))?.percentage || 0}%
            </p>
            <p className="text-sm text-gray-500">Desktop Traffic</p>
          </div>
        </div>
      </div>
    </div>
  );
}