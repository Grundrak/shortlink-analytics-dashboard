import { useState, useEffect } from 'react';
import { Link2, BarChart2, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { analyticsApi } from '../../api/analyticsApi';
import { toast } from 'sonner';

export function DashboardStats() {
  const [stats, setStats] = useState([
    { name: 'Total Links', value: '0', icon: Link2, change: '+0%' },
    { name: 'Total Clicks', value: '0', icon: BarChart2, change: '+0%' },
    { name: 'Active Links', value: '0', icon: Globe, change: '+0%' },
    { name: 'Unique Visitors', value: '0', icon: Users, change: '+0%' },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await analyticsApi.getUserAnalyticsSummary();
        const data = response.data;
        
        // Extract comprehensive stats from the new API response
        const overview = data.overview;
        
        setStats([
          { 
            name: 'Total Links', 
            value: overview.totalUrls.toString(), 
            icon: Link2, 
            change: '+0%' // Could calculate growth if historical data available
          },
          { 
            name: 'Total Clicks', 
            value: overview.totalClicks.toLocaleString(), 
            icon: BarChart2, 
            change: overview.clicksGrowth || '+0%'
          },
          { 
            name: 'Active Links', 
            value: overview.activeUrls.toString(), 
            icon: Globe, 
            change: '+0%'
          },
          { 
            name: 'Unique Visitors', 
            value: overview.uniqueVisitors.toLocaleString(), 
            icon: Users, 
            change: '+0%'
          },
        ]);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        toast.error('Failed to load dashboard statistics');
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-5">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <motion.div
      className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {stats.map((stat) => (
        <motion.div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-xl transition-shadow duration-300 p-5 flex items-center"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            <stat.icon className="h-6 w-6 text-indigo-600" />
          </div>
          {/* Content */}
          <div className="ml-4 flex-1">
            <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <div
                className={clsx(
                  'ml-2 flex items-baseline text-sm font-semibold',
                  stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                )}
              >
                {stat.change}
              </div>
            </dd>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}