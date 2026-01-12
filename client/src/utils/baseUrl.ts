// Base URL for short links - use dedicated domain for security
// In production: use custom domain like https://short.link
// In development: proxy through same origin to avoid CORS
export const SHORT_LINK_BASE_URL = import.meta.env.VITE_SHORT_URL_BASE || window.location.origin;

// Helper function to generate full short URL
export const getShortUrl = (shortCode: string): string => {
  return `${SHORT_LINK_BASE_URL}/${shortCode}`;
};
