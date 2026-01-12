export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:4521/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      REFRESH_TOKEN: '/auth/refresh-token',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
    },
    LINKS: {
      CREATE: '/urls',
      LIST: '/urls',
      GET: (id: string) => `/urls/details/${id}`, // Changed to /details/
      UPDATE: (id: string) => `/urls/${id}`, // Added UPDATE endpoint
      DELETE: (id: string) => `/urls/${id}`,
    },
    ANALYTICS: {
      URL: (id: string) => `/analytics/url/${id}`,
      TIME_RANGE: (id: string) => `/analytics/url/${id}/timerange`,
      SUMMARY: '/analytics/summary',
      REAL_TIME: (id: string) => `/analytics/url/${id}/realtime`,
      TOP_URLS: '/analytics/top-urls',
      EXPORT: (id: string) => `/analytics/url/${id}/export`,
    },
  },
};