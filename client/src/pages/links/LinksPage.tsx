import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { LinksTable } from '../../components/links/LinksTable';
import { linkApi } from '../../api/linkApi';
import { toast } from 'sonner';

export function LinksPage() {
  const [links, setLinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const response = await linkApi.getAllLinks();
        setLinks(response.data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load links');
        toast.error('Failed to load links');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleDeleteLink = async (shortCode) => {
    try {
      await linkApi.deleteLink(shortCode);
      toast.success('Link deleted successfully');
      
      // Refresh the links list
      setLinks((prevLinks) => 
        prevLinks.filter(link => link.shortCode !== shortCode)
      );
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete link');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Your Links</h1>
        <Link
          to="/links/create"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Create Link
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading your links...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-red-50 rounded-lg">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      ) : (
        <LinksTable 
          links={links} 
          onDelete={handleDeleteLink} 
        />
      )}
    </div>
  );
}