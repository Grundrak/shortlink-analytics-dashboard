import axiosInstance from "./axiosInstance";
import { ShortLink } from "../types";
import { API_CONFIG } from "../config/api.config";
import { handleApiError, ApiRequestError } from "../utils/apiError";

export interface CreateLinkRequest {
  originalUrl: string;
  customAlias?: string;
  expiresAt?: string; // Optional expiration date
}

export interface UpdateLinkRequest {
  originalUrl?: string;
  customAlias?: string | null;
  expiresAt?: string | null;
  isActive?: boolean;
}

export interface CreateLinkResponse {
  success: boolean;
  data: {
    shortCode: string;
    originalUrl: string;
    shortUrl: string;
    customAlias?: string;
  };
}

export const linkApi = {
  // Create a new short link
  createLink: async (data: CreateLinkRequest): Promise<CreateLinkResponse> => {
    try {
      const response = await axiosInstance.post<CreateLinkResponse>(
        API_CONFIG.ENDPOINTS.LINKS.CREATE,
        data
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get all links for the authenticated user
  getAllLinks: async (): Promise<{ success: boolean; data: ShortLink[] }> => {
    try {
      const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.LINKS.LIST);
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Get a single link by its shortCode
  getLinkByShortCode: async (shortCode: string): Promise<{ success: boolean; data: ShortLink }> => {
    try {
      const response = await axiosInstance.get(API_CONFIG.ENDPOINTS.LINKS.GET(shortCode));
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Update a link by its shortCode
  updateLink: async (shortCode: string, data: UpdateLinkRequest): Promise<{ success: boolean; data: ShortLink }> => {
    try {
      const response = await axiosInstance.put(
        API_CONFIG.ENDPOINTS.LINKS.UPDATE(shortCode),
        data
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },

  // Delete a link by its shortCode
  deleteLink: async (shortCode: string): Promise<void> => {
    try {
      await axiosInstance.delete(API_CONFIG.ENDPOINTS.LINKS.DELETE(shortCode));
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  }
};