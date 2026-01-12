import { motion } from 'framer-motion';
import { 
  Laptop, Smartphone, Tablet, Bot, Globe, Clock,
  MapPin, Link2, Activity, Users, TrendingUp, Monitor
} from 'lucide-react';

interface AnalyticsData {
  summary?: {
    totalClicks: number;
    uniqueVisitors: number;
    mobileVsDesktop?: {
      desktop: number;
      mobile: number;
      tablet: number;
      bot: number;
    };
    browsers?: Record<string, number>;
    operatingSystems?: Record<string, number>;
    referrers?: Record<string, number>;
    topCountries?: Record<string, number>;
    topCities?: Record<string, number>;
    clicksByHour?: number[];
    clicksByDayOfWeek?: number[];
    peakHour?: number;
    peakDay?: string;
    avgClicksPerDay?: number;
    returningVisitors?: number;
    newVisitors?: number;
    uniqueLocations?: number;
  };
  recentClicks?: Array<{
    id: string;
    ipAddress?: string;
    location?: string;
    device?: string;
    browser?: string;
    operatingSystem?: string;
    referrer?: string;
    clickedAt: string;
    isUnique?: boolean;
  }>;
}

interface EnhancedAnalyticsProps {
  analytics: AnalyticsData | null;
  loading?: boolean;
}

export function EnhancedAnalytics({ analytics, loading }: EnhancedAnalyticsProps) {
  if (loading || !analytics) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-48 bg-gray-200 rounded-xl" />
        <div className="h-48 bg-gray-200 rounded-xl" />
      </div>
    );
  }

  const summary = analytics.summary;
  const mobileVsDesktop = summary?.mobileVsDesktop || { desktop: 0, mobile: 0, tablet: 0, bot: 0 };
  const totalDeviceClicks = Object.values(mobileVsDesktop).reduce((a, b) => a + b, 0);

  const deviceData = [
    { name: 'Desktop', value: mobileVsDesktop.desktop, icon: Laptop, color: 'bg-blue-500' },
    { name: 'Mobile', value: mobileVsDesktop.mobile, icon: Smartphone, color: 'bg-green-500' },
    { name: 'Tablet', value: mobileVsDesktop.tablet, icon: Tablet, color: 'bg-purple-500' },
    { name: 'Bots', value: mobileVsDesktop.bot, icon: Bot, color: 'bg-gray-500' },
  ];

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const clicksByDay = summary?.clicksByDayOfWeek || Array(7).fill(0);
  const maxDayClicks = Math.max(...clicksByDay, 1);

  const clicksByHour = summary?.clicksByHour || Array(24).fill(0);
  const maxHourClicks = Math.max(...clicksByHour, 1);

  // Get top referrers
  const referrers = summary?.referrers || {};
  const topReferrers = Object.entries(referrers)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Get top operating systems
  const operatingSystems = summary?.operatingSystems || {};
  const topOS = Object.entries(operatingSystems)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  // Get top locations
  const topCountries = summary?.topCountries || {};
  const countries = Object.entries(topCountries)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Device Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-amber-500" />
          Device Distribution
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {deviceData.map((device) => {
            const percentage = totalDeviceClicks > 0 
              ? ((device.value / totalDeviceClicks) * 100).toFixed(1) 
              : '0.0';
            const Icon = device.icon;
            
            return (
              <div 
                key={device.name}
                className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${device.color} rounded-full mb-3`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{device.value}</p>
                <p className="text-sm text-gray-600">{device.name}</p>
                <p className="text-xs text-gray-400">{percentage}%</p>
              </div>
            );
          })}
        </div>

        {/* Progress bars */}
        <div className="space-y-3">
          {deviceData.filter(d => d.value > 0).map((device, index) => {
            const percentage = totalDeviceClicks > 0 
              ? (device.value / totalDeviceClicks) * 100 
              : 0;
            
            return (
              <div key={device.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{device.name}</span>
                  <span className="text-gray-500">{device.value} clicks</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    className={`${device.color} h-2 rounded-full`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Clicks by Day of Week */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2 text-amber-500" />
          Clicks by Day of Week
        </h3>
        
        <div className="grid grid-cols-7 gap-2">
          {dayNames.map((day, index) => {
            const clicks = clicksByDay[index] || 0;
            const heightPercentage = (clicks / maxDayClicks) * 100;
            
            return (
              <div key={day} className="flex flex-col items-center">
                <div className="h-32 w-full flex items-end justify-center mb-2">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(heightPercentage, 5)}%` }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
                    className="w-full bg-gradient-to-t from-amber-500 to-orange-400 rounded-t-lg relative group cursor-pointer"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {clicks} clicks
                    </div>
                  </motion.div>
                </div>
                <p className="text-xs text-gray-600 font-medium">{day.substring(0, 3)}</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Clicks by Hour */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-amber-500" />
          Clicks by Hour of Day
          {summary?.peakHour !== undefined && (
            <span className="ml-auto text-sm text-gray-500">
              Peak: {summary.peakHour}:00
            </span>
          )}
        </h3>
        
        <div className="flex items-end justify-between h-24 gap-1">
          {clicksByHour.map((clicks, hour) => {
            const heightPercentage = (clicks / maxHourClicks) * 100;
            
            return (
              <div key={hour} className="flex-1 group relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(heightPercentage, 2)}%` }}
                  transition={{ delay: 0.5 + hour * 0.02, duration: 0.3 }}
                  className={`w-full rounded-t ${
                    summary?.peakHour === hour 
                      ? 'bg-gradient-to-t from-amber-500 to-orange-400' 
                      : 'bg-gradient-to-t from-gray-300 to-gray-200'
                  } cursor-pointer hover:from-amber-400 hover:to-orange-300 transition-colors`}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {hour}:00 - {clicks} clicks
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-400">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
      </motion.div>

      {/* Grid of smaller analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Referrers */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Link2 className="w-5 h-5 mr-2 text-amber-500" />
            Traffic Sources
          </h3>
          
          {topReferrers.length > 0 ? (
            <div className="space-y-3">
              {topReferrers.map(([referrer, count], index) => {
                const total = Object.values(referrers).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? (count / total) * 100 : 0;
                
                return (
                  <div key={referrer}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 truncate max-w-[200px]" title={referrer}>
                        {referrer === 'direct' || referrer === 'unknown' ? 'Direct / Unknown' : referrer}
                      </span>
                      <span className="text-gray-500 ml-2">{count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No referrer data available</p>
          )}
        </motion.div>

        {/* Operating Systems */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Laptop className="w-5 h-5 mr-2 text-amber-500" />
            Operating Systems
          </h3>
          
          {topOS.length > 0 ? (
            <div className="space-y-3">
              {topOS.map(([os, count], index) => {
                const total = Object.values(operatingSystems).reduce((a, b) => a + b, 0);
                const percentage = total > 0 ? (count / total) * 100 : 0;
                
                return (
                  <div key={os}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{os || 'Unknown'}</span>
                      <span className="text-gray-500">{count} ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No OS data available</p>
          )}
        </motion.div>
      </div>

      {/* Geographic Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-md p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-amber-500" />
          Geographic Distribution
          {summary?.uniqueLocations !== undefined && summary.uniqueLocations > 0 && (
            <span className="ml-auto text-sm text-gray-500">
              {summary.uniqueLocations} unique locations
            </span>
          )}
        </h3>
        
        {countries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map(([country, count], index) => (
              <motion.div
                key={country}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="font-medium text-gray-900">{country}</span>
                </div>
                <span className="text-amber-600 font-semibold">{count}</span>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No geographic data available yet</p>
        )}
      </motion.div>

      {/* Visitor Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-md p-6 text-white"
      >
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-amber-400" />
          Visitor Insights
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-amber-400" />
            <p className="text-3xl font-bold">{summary?.avgClicksPerDay?.toFixed(1) || '0'}</p>
            <p className="text-sm text-gray-400">Avg Clicks/Day</p>
          </div>
          
          <div className="text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-400" />
            <p className="text-3xl font-bold">{summary?.uniqueVisitors || 0}</p>
            <p className="text-sm text-gray-400">Unique Visitors</p>
          </div>
          
          <div className="text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
            <p className="text-3xl font-bold">{summary?.newVisitors || 0}</p>
            <p className="text-sm text-gray-400">New Visitors</p>
          </div>
          
          <div className="text-center">
            <Globe className="w-8 h-8 mx-auto mb-2 text-purple-400" />
            <p className="text-3xl font-bold">{summary?.returningVisitors || 0}</p>
            <p className="text-sm text-gray-400">Returning</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
