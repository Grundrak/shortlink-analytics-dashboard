// DashboardStats.jsx
import { Link2, BarChart2, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const colors = {
  primary: '#4F46E5',    // Indigo
  secondary: '#10B981',  // Emerald Green
  accent: '#F59E0B',     // Amber
  dark: '#1F2937',       // Slate Gray
  light: '#F3F4F6',      // Light Gray
};

// Sample stats data
const stats = [
  { name: 'Total Links', value: '1,234', icon: Link2, change: '+12%' },
  { name: 'Total Clicks', value: '54.3k', icon: BarChart2, change: '+8%' },
  { name: 'Active Links', value: '856', icon: Globe, change: '+3%' },
  { name: 'Unique Visitors', value: '23.1k', icon: Users, change: '+15%' },
];

export function DashboardStats() {
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
            <stat.icon className={`h-6 w-6 text-primary`} />
          </div>
          {/* Content */}
          <div className="ml-4 flex-1">
            <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              <div
                className={clsx(
                  'ml-2 flex items-baseline text-sm font-semibold',
                  stat.change.startsWith('+') ? 'text-secondary' : 'text-red-600'
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