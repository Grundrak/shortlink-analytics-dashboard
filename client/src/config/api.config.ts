
export const API_CONFIG = {
    BASE_URL: process.env.REACT_APP_API_URL,
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
        DELETE: (id: string) => `/urls/${id}`,
      },
      // Add other endpoints here
    },
  };