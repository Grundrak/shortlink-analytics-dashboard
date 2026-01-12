import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { analyticsApi } from '../../api/analyticsApi';
import { toast } from 'sonner';

// Updated color palette usage
const colors = {
  primary: '#4F46E5',    // Indigo
  secondary: '#10B981',  // Emerald Green
  accent: '#F59E0B',     // Amber
  dark: '#1F2937',       // Slate Gray
  light: '#F3F4F6',      // Light Gray
};

interface ClickTrendData {
  date: string;
  clicks: number;
}

interface AnalyticsUrl {
  analytics?: {
    totalClicks?: number;
  };
}

export function ClicksChart() {
  const [data, setData] = useState<ClickTrendData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClickTrends = async () => {
      try {
        const response = await analyticsApi.getUserAnalyticsSummary();
        
        // Process the data to create trend data
        // This is a simplified version - you might want to enhance this based on your analytics data structure
        const trendData: ClickTrendData[] = [];
        const last30Days = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();

        // Initialize with 0 clicks for each day
        last30Days.forEach(date => {
          trendData.push({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            clicks: 0
          });
        });

        // If you have detailed analytics data, you would aggregate clicks by date here
        // For now, we'll show total clicks distributed across the period
        if (response.data && response.data.length > 0) {
          const totalClicks = response.data.reduce((sum: number, url: AnalyticsUrl) => sum + (url.analytics?.totalClicks || 0), 0);
          // Distribute clicks randomly across days for demo purposes
          // In a real implementation, you'd use actual daily analytics data
          trendData.forEach((day) => {
            day.clicks = Math.floor(Math.random() * (totalClicks / 10)) + 10;
          });
        }

        setData(trendData);
      } catch (err) {
        console.error('Error fetching click trends:', err);
        toast.error('Failed to load click trends');
        // Use fallback data
        setData([
          { date: 'Jan 1', clicks: 100 },
          { date: 'Jan 2', clicks: 150 },
          { date: 'Jan 3', clicks: 120 },
          { date: 'Jan 4', clicks: 200 },
          { date: 'Jan 5', clicks: 180 },
          { date: 'Jan 6', clicks: 250 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClickTrends();
  }, []);

  if (loading) {
    return (
      <motion.div
        className="bg-white rounded-lg shadow p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-lg font-medium text-gray-900 mb-4">Click Trends</h2>
        <div className="h-80 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-lg font-medium text-gray-900 mb-4">Click Trends</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.light} />
            <XAxis 
              dataKey="date" 
              stroke={colors.dark} 
              tick={{ fontSize: 12 }}
              axisLine={false}
            />
            <YAxis 
              stroke={colors.dark} 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: colors.light, border: `1px solid ${colors.primary}` }}
              itemStyle={{ color: colors.primary }}
              labelStyle={{ color: colors.primary }}
            />
            <Area 
              type="monotone" 
              dataKey="clicks" 
              stroke={colors.primary} 
              fill="url(#colorClicks)" 
              fillOpacity={1} 
              activeDot={{ r: 8 }}
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}