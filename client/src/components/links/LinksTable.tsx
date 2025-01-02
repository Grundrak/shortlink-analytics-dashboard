
import { Link } from 'react-router-dom';
import { ExternalLink, BarChart2, Trash2, Edit } from 'lucide-react';
import { formatDate } from '../../utils/date';

const links = [
  {
    id: '1',
    originalUrl: 'https://example.com/very/long/url/that/needs/shortening',
    shortCode: 'abc123',
    clicks: 1234,
    createdAt: '2024-03-10T12:00:00Z',
  },
  {
    id: '2',
    originalUrl: 'https://another-example.com/blog/post/1',
    shortCode: 'xyz789',
    clicks: 567,
    createdAt: '2024-03-09T15:30:00Z',
  },
];

export function LinksTable() {
  return (
    <div className="mt-4 bg-white shadow rounded-lg">
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate max-w-xs">
                  {link.originalUrl}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center text-indigo-600 hover:text-indigo-900">
                    <span>shortlink.io/{link.shortCode}</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`/analytics/${link.id}`} className="flex items-center hover:text-indigo-600">
                    <BarChart2 className="h-4 w-4 mr-1" />
                    {link.clicks.toLocaleString()}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(link.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="h-5 w-5" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
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