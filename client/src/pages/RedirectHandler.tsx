import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_CONFIG } from '../config/api.config';
import { Loader2 } from 'lucide-react';

export const RedirectHandler = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shortCode) return;

    // Use window.location for hard redirect to the backend/proxy
    // This allows the server to handle the analytic tracking (click count)
    // and the 301/302 redirect.
    // In dev: localhost:5173/abc -> localhost:4521/abc
    // In prod: domain.com/abc -> domain.com/api/url/abc (or proxied)
    
    // Construct the backend redirect URL
    const backendRedirectUrl = `${API_CONFIG.BASE_URL.replace('/api', '')}/${shortCode}`;
    
    // Redirect
    window.location.href = backendRedirectUrl;

  }, [shortCode, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Redirecting...</h2>
        <p className="text-gray-500">Please wait while we take you to your destination.</p>
      </div>
    </div>
  );
};
