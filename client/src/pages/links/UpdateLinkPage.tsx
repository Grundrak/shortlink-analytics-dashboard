import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Calendar, ExternalLink } from 'lucide-react';
import { linkApi } from '../../api/linkApi';
import { toast } from 'sonner';
import { ShortLink } from '../../types';
import { SHORT_LINK_BASE_URL, getShortUrl } from '../../utils/baseUrl';

interface FormData {
  originalUrl: string;
  customAlias: string;
  expiresAt: string;
}

interface FormErrors {
  originalUrl?: string;
  customAlias?: string;
  expiresAt?: string;
}

export function UpdateLinkPage() {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [link, setLink] = useState<ShortLink | null>(null);
  const [formData, setFormData] = useState<FormData>({
    originalUrl: '',
    customAlias: '',
    expiresAt: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const fetchLink = async () => {
      if (!shortCode) {
        toast.error('Invalid link identifier');
        navigate('/links');
        return;
      }

      try {
        setIsLoading(true);
        const response = await linkApi.getLinkByShortCode(shortCode);
        const linkData = response.data;
        
        setLink(linkData);
        setFormData({
          originalUrl: linkData.originalUrl,
          customAlias: linkData.customAlias || '',
          expiresAt: linkData.expiresAt ? 
            new Date(linkData.expiresAt).toISOString().slice(0, 16) : '',
        });
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load link');
        navigate('/links');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLink();
  }, [shortCode, navigate]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validate original URL
    if (!formData.originalUrl.trim()) {
      newErrors.originalUrl = 'URL is required';
    } else {
      try {
        new URL(formData.originalUrl);
      } catch {
        newErrors.originalUrl = 'Please enter a valid URL';
      }
    }

    // Validate custom alias
    if (formData.customAlias.trim()) {
      const aliasRegex = /^[a-zA-Z0-9_-]+$/;
      if (!aliasRegex.test(formData.customAlias)) {
        newErrors.customAlias = 'Custom alias can only contain letters, numbers, underscores, and hyphens';
      } else if (formData.customAlias.length < 3 || formData.customAlias.length > 30) {
        newErrors.customAlias = 'Custom alias must be between 3 and 30 characters';
      }
    }

    // Validate expiration date
    if (formData.expiresAt.trim()) {
      const expirationDate = new Date(formData.expiresAt);
      const now = new Date();
      if (expirationDate <= now) {
        newErrors.expiresAt = 'Expiration date must be in the future';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !shortCode) {
      return;
    }

    setIsSaving(true);
    try {      const payload: {
        originalUrl: string;
        customAlias?: string | null;
        expiresAt?: string | null;
      } = {
        originalUrl: formData.originalUrl.trim(),
      };

      // Only include customAlias if it's different from current or being cleared
      if (formData.customAlias.trim() !== (link?.customAlias || '')) {
        payload.customAlias = formData.customAlias.trim() || null;
      }

      // Only include expiresAt if it's different from current
      const currentExpiry = link?.expiresAt ? 
        new Date(link.expiresAt).toISOString().slice(0, 16) : '';
      if (formData.expiresAt !== currentExpiry) {
        payload.expiresAt = formData.expiresAt || null;
      }

      await linkApi.updateLink(shortCode, payload);
      toast.success('Link updated successfully!');
      navigate('/links');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update link');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading link details...</p>
        </div>
      </div>
    );
  }

  if (!link) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <p className="text-red-500">Link not found</p>
          <button
            onClick={() => navigate('/links')}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Back to Links
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/links')}
          className="inline-flex items-center text-primary hover:text-primary-dark"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Links
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Link</h1>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <ExternalLink className="h-4 w-4 mr-2" />
              <span className="font-medium">Current Short URL:</span>
            </div>
            <p className="text-primary font-mono">
              {getShortUrl(link.customAlias || link.shortCode)}
            </p>
            <div className="mt-2 text-xs text-gray-500">
              <span>Clicks: {link.clicks.toLocaleString()}</span>
              {link.expiresAt && (
                <span className="ml-4">
                  Expires: {new Date(link.expiresAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Original URL */}
          <div>
            <label htmlFor="originalUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Original URL *
            </label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                <Globe className="h-5 w-5" />
              </div>
              <input
                type="url"
                id="originalUrl"
                value={formData.originalUrl}
                onChange={(e) => handleInputChange('originalUrl', e.target.value)}
                placeholder="https://example.com/very-long-url"
                className={`flex-1 block w-full border rounded-r-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.originalUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSaving}
              />
            </div>
            {errors.originalUrl && (
              <p className="mt-1 text-sm text-red-600">{errors.originalUrl}</p>
            )}
          </div>

          {/* Custom Alias */}
          <div>
            <label htmlFor="customAlias" className="block text-sm font-medium text-gray-700 mb-2">
              Custom Alias (Optional)
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                {SHORT_LINK_BASE_URL}/
              </span>
              <input
                type="text"
                id="customAlias"
                value={formData.customAlias}
                onChange={(e) => handleInputChange('customAlias', e.target.value)}
                placeholder="my-custom-alias"
                className={`flex-1 px-3 py-2 border rounded-r-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.customAlias ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSaving}
              />
            </div>
            {errors.customAlias && (
              <p className="mt-1 text-sm text-red-600">{errors.customAlias}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Leave empty to use the generated short code: {link.shortCode}
            </p>
          </div>

          {/* Expiration Date */}
          <div>
            <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Date (Optional)
            </label>
            <div className="flex">
              <div className="flex-shrink-0 inline-flex items-center px-3 bg-gray-50 text-gray-500 border border-r-0 border-gray-300 rounded-l-md">
                <Calendar className="h-5 w-5" />
              </div>
              <input
                type="datetime-local"
                id="expiresAt"
                value={formData.expiresAt}
                onChange={(e) => handleInputChange('expiresAt', e.target.value)}
                className={`flex-1 block w-full border rounded-r-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary ${
                  errors.expiresAt ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isSaving}
              />
            </div>
            {errors.expiresAt && (
              <p className="mt-1 text-sm text-red-600">{errors.expiresAt}</p>
            )}
            <p className="mt-1 text-sm text-gray-500">
              Leave empty for permanent link
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Updating...
                </div>
              ) : (
                'Update Link'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/links')}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}