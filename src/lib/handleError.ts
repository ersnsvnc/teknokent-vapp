import { ApiError, NetworkError, UnexpectedError } from './errors/apiError';
import type { ApiResponse } from '@/types/api/common';

export function handleApiError<T>(err: unknown): ApiResponse<T> {
  if (err instanceof ApiError) return handleApiErrorResponse(err);
  if (err instanceof NetworkError) return handleNetworkError(err);

  return handleUnexpectedError(err);
}

function handleApiErrorResponse<T>(err: ApiError): ApiResponse<T> {
  logGlobalError(err.status, err.message);
  return {
    success: false,
    error: { message: err.message, status: err.status },
  };
}

function handleNetworkError<T>(err: NetworkError): ApiResponse<T> {
  logGlobalError(0, err.message);
  return {
    success: false,
    error: { message: err.message, status: 0 },
  };
}

function handleUnexpectedError<T>(err: unknown): ApiResponse<T> {
  logGlobalError(500, 'Unexpected error occurred');
  return {
    success: false,
    error: { message: 'Unexpected error occurred', status: 500 },
  };
}

const logGlobalError = (status: number, message: string) => {
  // TODO: replace with toast or modal in future
  console.log(`[API Error ${status}]: ${message}`);
};
