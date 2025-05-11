import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, BarChart2, Trash2, Copy, Check } from 'lucide-react';
import { formatDate } from '../../utils/date';
import { toast } from 'sonner';

interface Link {
  id: string;
  shortCode: string;
  customAlias?: string;
  originalUrl: string;
  clicks: number;
  createdAt: string;
}

interface LinksTableProps {
  links: Link[];
  onDelete: (shortCode: string) => Promise<void>;
}

export function LinksTable({ links, onDelete }: LinksTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success('Link copied to clipboard');
  };

  const handleDelete = async (shortCode: string) => {
    if (window.confirm('Are you sure you want to delete this link?')) {
      await onDelete(shortCode);
    }
  };

  if (links.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 mb-4">You don't have any links yet</p>
        <Link
          to="/links/create"
          className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md"
        >
          Create your first link
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white shadow rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link) => (
              <tr key={link.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">
                  <a 
                    href={link.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-primary hover:underline flex items-center"
                  >
                    {link.originalUrl}
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <span className="text-primary">
                      {link.customAlias ? link.customAlias : link.shortCode}
                    </span>
                    <button
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onClick={() => copyToClipboard(`${window.location.origin}/${link.shortCode}`, link.id)}
                    >
                      {copiedId === link.id ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`/analytics/${link.id}`} className="flex items-center hover:text-primary">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    {link.clicks.toLocaleString()}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(link.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end">
                    <button 
                      className="text-red-600 hover:text-red-900 ml-4"
                      onClick={() => handleDelete(link.shortCode)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}