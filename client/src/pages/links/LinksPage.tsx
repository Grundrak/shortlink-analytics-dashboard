import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Link as LinkIcon, RefreshCw } from 'lucide-react';
import { LinksTable } from '../../components/links/LinksTable';
import { linkApi } from '../../api/linkApi';
import { ShortLink } from '../../types';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

export function LinksPage() {
  const [links, setLinks] = useState<ShortLink[]>([]);
  const [filteredLinks, setFilteredLinks] = useState<ShortLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLinks(links);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredLinks(
        links.filter(
          (link) =>
            link.originalUrl.toLowerCase().includes(query) ||
            link.shortCode.toLowerCase().includes(query) ||
            link.customAlias?.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, links]);

  const fetchLinks = async () => {
    try {
      setIsLoading(true);
      const response = await linkApi.getAllLinks();
      setLinks(response.data);
      setFilteredLinks(response.data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load links');
      toast.error('Failed to load links');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLink = async (shortCode: string) => {
    try {
      await linkApi.deleteLink(shortCode);
      toast.success('Link deleted successfully');
      setLinks((prevLinks) => prevLinks.filter((link) => link.shortCode !== shortCode));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete link');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Links</h1>
            <p className="mt-1 text-gray-500">
              {links.length} {links.length === 1 ? 'link' : 'links'} total
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={fetchLinks}
              disabled={isLoading}
              className="inline-flex items-center px-3 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <Link
              to="/links/create"
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Link
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search links by URL, short code, or alias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading your links...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-red-50 rounded-xl border border-red-100">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchLinks}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : filteredLinks.length === 0 && searchQuery ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No links match your search</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-amber-600 hover:text-amber-700 font-medium"
            >
              Clear search
            </button>
          </div>
        ) : links.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No links yet</h3>
            <p className="text-gray-500 mb-6">Create your first shortened link to get started</p>
            <Link
              to="/links/create"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-sm"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Link
            </Link>
          </div>
        ) : (
          <LinksTable links={filteredLinks} onDelete={handleDeleteLink} />
        )}
      </motion.div>
    </div>
  );
}