import { AxiosError } from "axios";

// Typed Axios Error
export type ApiRequestError = AxiosError<{
  message?: string;
  error?: string;
  statusCode?: number;
}>;

// Custom API error class
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Error handler function
export const handleApiError = (error: ApiRequestError): never => {
  // Log the full error for debugging
  console.error("API Request Error:", error);
  
  // Return a simplified error message for now
  const errorMessage = "Server connection failed. Please make sure the server is running.";
  
  // Just use a simple error for now
  throw new Error(errorMessage);
};

/* Usage example (don't include this in the actual file):
import axiosInstance from "./axiosInstance";

export const someApiService = {
  fetchData: async () => {
    try {
      const response = await axiosInstance.get("/some-endpoint");
      return response.data;
    } catch (error) {
      throw handleApiError(error as ApiRequestError);
    }
  },
};
*/