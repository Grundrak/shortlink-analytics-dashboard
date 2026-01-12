
import { Link } from 'react-router-dom';
import { DashboardStats } from '../../components/dashboard/DashboardStats';
import { RecentLinks } from '../../components/dashboard/RecentLinks';
import { ClicksChart } from '../../components/dashboard/ClicksChart';
import { TopLocations } from '../../components/dashboard/TopLocations';
import { Plus, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">Monitor your link performance and analytics</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <Link
            to="/links/create"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Link
          </Link>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
      >
        <Link
          to="/links"
          className="group flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all"
        >
          <div className="p-3 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900">Manage Links</h3>
            <p className="text-sm text-gray-500">View, edit, and organize your links</p>
          </div>
        </Link>
        <Link
          to="/analytics"
          className="group flex items-center p-4 bg-white rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all"
        >
          <div className="p-3 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
          <div className="ml-4">
            <h3 className="font-semibold text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-500">Detailed insights and reports</p>
          </div>
        </Link>
      </motion.div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Charts Section */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ClicksChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TopLocations />
        </motion.div>
      </div>

      {/* Recent Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <RecentLinks />
      </motion.div>
    </div>
  );
}