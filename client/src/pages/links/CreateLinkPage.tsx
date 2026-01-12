import React, { useState } from 'react';
import { toast } from 'sonner';
import { Link as LinkIcon, Calendar, Globe, ArrowLeft, Sparkles, Copy, Check, ExternalLink } from 'lucide-react';
import { linkApi } from '../../api/linkApi';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function CreateLinkPage() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [createdLink, setCreatedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
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
      
      setCreatedLink(response.data.shortUrl);
      toast.success('Link created successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (createdLink) {
      navigator.clipboard.writeText(createdLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to clipboard!');
    }
  };

  const createAnother = () => {
    setUrl('');
    setCustomAlias('');
    setExpiresAt('');
    setCreatedLink(null);
    setCopied(false);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link 
          to="/links"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Links
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Create New Link</h1>
            <p className="text-gray-500">Shorten your URL and track its performance</p>
          </div>
        </div>
      </motion.div>
      
      {/* Success State */}
      {createdLink ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Link Created!</h2>
            <p className="text-gray-500 mb-6">Your short link is ready to share</p>
            
            {/* Short URL Display */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between">
                <a 
                  href={createdLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 font-medium hover:text-amber-700 flex items-center"
                >
                  {createdLink}
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
                <button
                  onClick={copyToClipboard}
                  className={`p-2 rounded-lg transition-colors ${
                    copied 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            {/* Original URL */}
            <p className="text-sm text-gray-400 mb-8 truncate">
              Original: {url}
            </p>
            
            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={createAnother}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Create Another
              </button>
              <button
                onClick={() => navigate('/links')}
                className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all font-medium shadow-sm"
              >
                View All Links
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Form State */
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8"
        >
          <form onSubmit={handleSubmit}>
            {/* URL Input */}
            <div className="mb-6">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
                URL to Shorten <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-lg">
                  <Globe className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/your-long-url"
                  required
                  className="block w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
            </div>
            
            {/* Custom Alias */}
            <div className="mb-6">
              <label htmlFor="alias" className="block text-sm font-medium text-gray-700 mb-2">
                Custom Alias <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-lg">
                  <LinkIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="alias"
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                  placeholder="your-custom-alias"
                  className="block w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Leave blank to get a randomly generated short code
              </p>
            </div>
            
            {/* Expiry Date */}
            <div className="mb-8">
              <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date <span className="text-gray-400 text-xs font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-gray-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="datetime-local"
                  id="expiresAt"
                  value={expiresAt}
                  onChange={(e) => setExpiresAt(e.target.value)}
                  className="block w-full pl-14 pr-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                />
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Set an expiration date for this link
              </p>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 hover:from-amber-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </span>
              ) : (
                'Create Short Link'
              )}
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}