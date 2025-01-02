import { Link } from 'react-router-dom';
import { ExternalLink, BarChart2, Copy, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const colors = {
  primary: '#4F46E5',    // Indigo
  secondary: '#10B981',  // Emerald Green
  accent: '#F59E0B',     // Amber
  dark: '#1F2937',       // Slate Gray
  light: '#F3F4F6',      // Light Gray
};

// Sample recent links data
const recentLinks = [
  {
    id: '1',
    originalUrl: 'https://example.com/very/long/url/that/needs/shortening',
    shortCode: 'abc123',
    clicks: 1234,
    createdAt: '2024-03-10T12:00:00Z',
    status: 'Active',
  },
  {
    id: '2',
    originalUrl: 'https://another-example.com/blog/post/1',
    shortCode: 'xyz789',
    clicks: 567,
    createdAt: '2024-03-09T15:30:00Z',
    status: 'Disabled',
  },
];

export function RecentLinks() {
  return (
    <motion.div
      className="mt-8 bg-white shadow rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="px-4 py-5 sm:px-6 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Links</h3>
        <Link
          to="/links"
          className="text-sm font-medium text-accent hover:text-amber-600 flex items-center"
        >
          View all <ExternalLink className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      {/* Links List */}
      <div className="max-h-80 overflow-y-auto">
        {recentLinks.map((link) => (
          <div key={link.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex justify-between items-center">
            {/* Original URL and Short Link */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{link.originalUrl}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <span className="truncate">shortlink.io/{link.shortCode}</span>
                <button
                  className="ml-2 text-gray-400 hover:text-gray-600"
                  onClick={() => navigator.clipboard.writeText(`shortlink.io/${link.shortCode}`)}
                  aria-label="Copy Short Link"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Stats and Actions */}
            <div className="flex items-center space-x-4">
              {/* Clicks */}
              <div className="flex items-center text-sm text-gray-500">
                <BarChart2 className="h-4 w-4 mr-1" />
                {link.clicks} clicks
              </div>
              
              {/* Status Badge */}
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${link.status === 'Active' ? 'secondary' : 'gray-300'} text-white`}>
                {link.status}
              </span>
              
              {/* Delete Button */}
              <button
                onClick={() => {/* Implement delete functionality */}}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete Link"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}