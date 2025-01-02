import  { useState } from 'react';
import { LinksTable } from '../../components/links/LinksTable';
import { LinkFilters } from '../../components/links/LinkFilters';
import { motion } from 'framer-motion';

const allLinks = [
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
  // Add more links as needed...
];

export function LinksPage() {
  const [filteredLinks, setFilteredLinks] = useState(allLinks);

  const handleFilterChange = ({ search, dateRange, sort }) => {
    let filtered = [...allLinks];

    // Filter by search
    if (search) {
      filtered = filtered.filter(link =>
        link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
        link.shortCode.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by date range
    const now = new Date();
    filtered = filtered.filter(link => {
      const createdAt = new Date(link.createdAt);
      switch (dateRange) {
        case 'Last 7 days':
          return (now - createdAt) / (1000 * 60 * 60 * 24) <= 7;
        case 'Last 30 days':
          return (now - createdAt) / (1000 * 60 * 60 * 24) <= 30;
        case 'Last 3 months':
          return (now - createdAt) / (1000 * 60 * 60 * 24 * 30) <= 3;
        case 'All time':
        default:
          return true;
      }
    });

    // Sort
    switch (sort) {
      case 'Most clicks':
        filtered.sort((a, b) => b.clicks - a.clicks);
        break;
      case 'Newest first':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'Oldest first':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'Alphabetical':
        filtered.sort((a, b) => a.originalUrl.localeCompare(b.originalUrl));
        break;
      default:
        break;
    }

    setFilteredLinks(filtered);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Page Title */}
      <h1 className="text-2xl font-semibold text-gray-900">Your Links</h1>

      {/* Filters */}
      <LinkFilters onFilterChange={handleFilterChange} />

      {/* Links Table */}
      <LinksTable initialLinks={filteredLinks} />
    </motion.div>
  );
}