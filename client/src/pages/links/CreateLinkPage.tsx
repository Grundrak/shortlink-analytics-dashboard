import React, { useState } from 'react';
import { toast } from 'sonner';
import { Link as LinkIcon, Calendar, Globe } from 'lucide-react';
import { linkApi } from '../../api/linkApi';
import { useNavigate } from 'react-router-dom';

export function CreateLinkPage() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await linkApi.createLink({
        originalUrl: url,
        customAlias: customAlias || undefined,
        expiresAt: expiresAt || undefined
      });
      
      toast.success('Link created successfully!');
      
      // Show success message with copy button for the new short URL
      toast.message(`Your short URL: ${response.data.shortUrl}`, {
        action: {
          label: 'Copy',
          onClick: () => {
            navigator.clipboard.writeText(response.data.shortUrl);
            toast.success('Copied to clipboard!');
          }
        }
      });
      
      // Redirect to links page after successful creation
      navigate('/links');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Create New Short Link</h1>
        <p className="text-gray-600 mt-2">Shorten your URL and track its performance</p>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          {/* URL Input */}
          <div className="mb-6">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL to Shorten*
            </label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                <Globe className="h-5 w-5" />
              </div>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/your-long-url"
                required
                className="flex-1 block w-full border border-gray-300 rounded-r-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
              />
            </div>
          </div>
          
          {/* Custom Alias */}
          <div className="mb-6">
            <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-1">
              Custom Alias (Optional)
            </label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                <LinkIcon className="h-5 w-5" />
              </div>
              <input
                type="text"
                id="alias"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
                placeholder="your-custom-alias"
                className="flex-1 block w-full border border-gray-300 rounded-r-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Leave blank to get a randomly generated short code
            </p>
          </div>
          
          {/* Expiry Date */}
          <div className="mb-6">
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date (Optional)
            </label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                type="datetime-local"
                id="expiresAt"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="flex-1 block w-full border border-gray-300 rounded-r-md shadow-sm py-2 px-3 focus:ring-primary focus:border-primary"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Set an expiration date for this link
            </p>
          </div>
          
          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating...' : 'Create Short Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}