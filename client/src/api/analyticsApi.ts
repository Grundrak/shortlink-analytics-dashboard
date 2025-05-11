import axiosInstance from "./axiosInstance";
import { handleApiError, ApiRequestError } from "../utils/apiError";

export interface AnalyticsTimeRangeParams {
  startDate: string;
  endDate: string;
}

export const analyticsApi = {
  // Get analytics for a specific URL
  getUrlAnalytics: async (urlId: string) => {
    try {
      const response = await axiosInstance.get(`/api/analytics/url/${urlId}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics for a specific time range
  getAnalyticsByTimeRange: async (urlId: string, { startDate, endDate }: AnalyticsTimeRangeParams) => {
    try {
      const response = await axiosInstance.get(
        `/api/analytics/url/${urlId}/timerange?startDate=${startDate}&endDate=${endDate}`
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get analytics summary for all user URLs
  getUserAnalyticsSummary: async () => {
    try {
      const response = await axiosInstance.get("/api/analytics/summary");
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get real-time analytics (last 5 minutes)
  getRealTimeAnalytics: async (urlId: string) => {
    try {
      const response = await axiosInstance.get(`/api/analytics/url/${urlId}/realtime`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get top performing URLs
  getTopPerformingUrls: async (limit = 10) => {
    try {
      const response = await axiosInstance.get(`/api/analytics/top-urls?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Export analytics data
  exportAnalytics: async (urlId: string, format = "json") => {
    try {
      const response = await axiosInstance.get(
        `/api/analytics/url/${urlId}/export?format=${format}`,
        { responseType: format === 'csv' ? 'blob' : 'json' }
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  }
};