import { AxiosError } from "axios";

// Only keeping what's actually used in the file
export interface ApiRequestError extends AxiosError {
  response?: {
    data: {
      message?: string;
      error?: string;
      statusCode?: number;
    };
    status: number;
  };
  request?: unknown;
  message?: string;
}

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
  if (error.response) {
    // The request was made and the server responded with an error status
    const errorMessage =
      error.response.data?.message ||
      error.response.data?.error ||
      "An error occurred";

    throw new ApiError(
      error.response.status,
      errorMessage,
      error.response.data
    );
  } else if (error.request) {
    // The request was made but no response was received
    throw new ApiError(
      500,
      "No response received from server. Please check your internet connection."
    );
  } else {
    // Something happened in setting up the request
    throw new ApiError(
      500,
      error.message || "An error occurred while setting up the request"
    );
  }
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
