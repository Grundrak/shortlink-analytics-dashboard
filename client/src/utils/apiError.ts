interface ApiResponseError {
  status: number;
  message: string;
  data?: unknown;
}

interface ApiRequestError {
  response?: ApiResponseError;
  request?: unknown;
  message?: string;
}

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

export const handleApiError = (error: ApiRequestError): never => {
  if (error.response) {
    throw new ApiError(
      error.response.status,
      error.response.message || "An error occurred",
      error.response.data
    );
  } else if (error.request) {
    throw new ApiError(500, "No response received from server");
  } else {
    throw new ApiError(
      500,
      error.message || "An error occurred while setting up the request"
    );
  }
};
