import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BarChart2, Copy, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { linkApi } from '../../api/linkApi';
import { ShortLink } from '../../types';
import { toast } from 'sonner';
import { formatDistanceToNow } from '../../utils/date';
import { getShortUrl } from '../../utils/baseUrl';

export function RecentLinks() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await linkApi.getAllLinks();
        // Get last 5 links for recent links display
        setLinks(response.data.slice(0, 5));
      } catch (err) {
        toast.error('Failed to fetch recent links');
        console.error('Error fetching links:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleCopyLink = async (shortCode: string, customAlias?: string) => {
    const linkToCopy = getShortUrl(customAlias || shortCode);
    try {
      await navigator.clipboard.writeText(linkToCopy);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  };

  const handleDeleteLink = async (shortCode: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    
    try {
      await linkApi.deleteLink(shortCode);
      setLinks(links.filter(link => link.shortCode !== shortCode));
      toast.success('Link deleted successfully');
    } catch (err) {
      toast.error('Failed to delete link');
      console.error('Error deleting link:', err);
    }
  };

  if (loading) {
    return (
      <motion.div className="mt-8 bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
        <div className="px-4 py-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
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
        {links.length === 0 ? (
          <div className="px-4 py-8 text-center text-gray-500">
            <p>No links created yet.</p>
            <Link 
              to="/links/create" 
              className="text-accent hover:text-amber-600 font-medium"
            >
              Create your first link
            </Link>
          </div>
        ) : (
          links.map((link) => (
            <div key={link.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex justify-between items-center">
              {/* Original URL and Short Link */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{link.originalUrl}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <span className="truncate">
                    {getShortUrl(link.customAlias || link.shortCode)}
                  </span>
                  <button
                    className="ml-2 text-gray-400 hover:text-gray-600"
                    onClick={() => handleCopyLink(link.shortCode, link.customAlias)}
                    aria-label="Copy Short Link"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDistanceToNow(link.createdAt)}
                </p>
              </div>
              
              {/* Stats and Actions */}
              <div className="flex items-center space-x-4">
                {/* Clicks */}
                <div className="flex items-center text-sm text-gray-500">
                  <BarChart2 className="h-4 w-4 mr-1" />
                  {link.clicks} clicks
                </div>
                
                {/* Status Badge */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-white">
                  Active
                </span>
                
                {/* Delete Button */}
                <button
                  onClick={() => handleDeleteLink(link.shortCode)}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Delete Link"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}