import axiosInstance from "./axiosInstance";
import { handleApiError, ApiRequestError } from "../utils/apiError";

export interface AnalyticsTimeRangeParams {
  startDate: string;
  endDate: string;
}

export const analyticsApi = {  // Get comprehensive analytics for a specific URL
  getUrlAnalytics: async (urlId: string) => {
    try {
      const response = await axiosInstance.get(`/analytics/url/${urlId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics for a specific time range
  getAnalyticsByTimeRange: async (urlId: string, { startDate, endDate }: AnalyticsTimeRangeParams) => {
    try {
      const response = await axiosInstance.get(
        `/analytics/url/${urlId}/timerange?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get overall summary for all links
  getOverallSummary: async () => {
    try {
      const response = await axiosInstance.get('/analytics/summary');
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get comprehensive user analytics summary with time range support
  getUserAnalyticsSummary: async (timeRange: string = '30d') => {
    try {
      const response = await axiosInstance.get(`/analytics/summary?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get real-time analytics for a specific URL
  getRealTimeAnalytics: async (urlId: string, timeWindow: number = 5) => {
    try {
      const response = await axiosInstance.get(`/analytics/url/${urlId}/realtime?timeWindow=${timeWindow}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get top performing URLs
  getTopPerformingUrls: async (limit = 10) => {
    try {
      const response = await axiosInstance.get(`/analytics/top-urls?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Export analytics data
  exportAnalytics: async (urlId: string, format = "json") => {
    try {
      const response = await axiosInstance.get(
        `/analytics/url/${urlId}/export?format=${format}`,
        { responseType: format === 'csv' ? 'blob' : 'json' }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get live dashboard data (for real-time updates)
  getLiveDashboard: async () => {
    try {
      const response = await axiosInstance.get('/analytics/live/dashboard');
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics by device type
  getDeviceAnalytics: async (timeRange: string = '30d') => {
    try {
      const response = await axiosInstance.get(`/analytics/devices?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics by location
  getLocationAnalytics: async (timeRange: string = '30d') => {
    try {
      const response = await axiosInstance.get(`/analytics/locations?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics by referrer
  getReferrerAnalytics: async (timeRange: string = '30d') => {
    try {
      const response = await axiosInstance.get(`/analytics/referrers?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get click trends over time
  getClickTrends: async (timeRange: string = '30d', granularity: 'hour' | 'day' | 'week' | 'month' = 'day') => {
    try {
      const response = await axiosInstance.get(`/analytics/trends?timeRange=${timeRange}&granularity=${granularity}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics for specific short code
  getShortCodeAnalytics: async (shortCode: string) => {
    try {
      const response = await axiosInstance.get(`/analytics/shortcode/${shortCode}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get visitor flow analytics
  getVisitorFlow: async (urlId: string, timeRange: string = '30d') => {
    try {
      const response = await axiosInstance.get(`/analytics/url/${urlId}/visitor-flow?timeRange=${timeRange}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  }
};