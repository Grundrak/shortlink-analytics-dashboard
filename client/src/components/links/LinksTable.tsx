import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BarChart2, Trash2, Copy, Check, Edit, MousePointerClick } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { toast } from 'sonner';
import { ShortLink } from '../../types';
import { getShortUrl } from '../../utils/baseUrl';
import { motion } from 'framer-motion';

interface LinksTableProps {
  links: ShortLink[];
  onDelete: (shortCode: string) => Promise<void>;
}

export function LinksTable({ links, onDelete }: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Link copied to clipboard');
  };

  const handleDelete = async (shortCode: string, id: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      setDeletingId(id);
      await onDelete(shortCode);
      setDeletingId(null);
    }
  };

  // Desktop table view
  const DesktopTable = () => (
    <div className="hidden md:block bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Short Link
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {links.map((link, index) => (
              <motion.tr 
                key={link.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`hover:bg-amber-50/50 transition-colors ${deletingId === link.id ? 'opacity-50' : ''}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 max-w-xs">
                  <a 
                    href={link.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-amber-600 flex items-center group truncate"
                  >
                    <span className="truncate max-w-[200px]">{link.originalUrl}</span>
                    <ExternalLink className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <span className="font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                      {link.customAlias || link.shortCode}
                    </span>
                    <button
                      className="ml-2 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                      onClick={() => copyToClipboard(getShortUrl(link.shortCode), link.id)}
                    >
                      {copiedId === link.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <Link 
                    to={`/analytics/${link.id}`} 
                    className="inline-flex items-center px-2.5 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
                  >
                    <MousePointerClick className="h-4 w-4 mr-1.5" />
                    {link.clicks.toLocaleString()}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(link.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-1">
                    <Link
                      to={`/analytics/${link.id}`}
                      className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      title="View Analytics"
                    >
                      <BarChart2 className="h-4 w-4" />
                    </Link>
                    <Link
                      to={`/links/edit/${link.shortCode}`}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Link"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button 
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => handleDelete(link.shortCode, link.id)}
                      title="Delete Link"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Mobile card view
  const MobileCards = () => (
    <div className="md:hidden space-y-4">
      {links.map((link, index) => (
        <motion.div
          key={link.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 ${deletingId === link.id ? 'opacity-50' : ''}`}
        >
          {/* Short Link Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">
              {link.customAlias || link.shortCode}
            </span>
            <div className="flex items-center space-x-1">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => copyToClipboard(getShortUrl(link.shortCode), link.id)}
              >
                {copiedId === link.id ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          {/* Original URL */}
          <a 
            href={link.originalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-amber-600 flex items-center mb-4 truncate"
          >
            <span className="truncate">{link.originalUrl}</span>
            <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
          </a>
          
          {/* Stats Row */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <Link 
                to={`/analytics/${link.id}`}
                className="inline-flex items-center text-sm text-blue-600"
              >
                <MousePointerClick className="h-4 w-4 mr-1" />
                {link.clicks.toLocaleString()} clicks
              </Link>
              <span className="text-xs text-gray-400">{formatDate(link.createdAt)}</span>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-1">
              <Link
                to={`/analytics/${link.id}`}
                className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              >
                <BarChart2 className="h-4 w-4" />
              </Link>
              <Link
                to={`/links/edit/${link.shortCode}`}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit className="h-4 w-4" />
              </Link>
              <button 
                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => handleDelete(link.shortCode, link.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <DesktopTable />
      <MobileCards />
    </>
  );
}