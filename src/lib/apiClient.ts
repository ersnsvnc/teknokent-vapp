import { handleApiError } from './handleError';
import { ApiError, NetworkError } from './errors/apiError';
import type { ApiResponse } from '@/types/api/common';

type FetchOptions = Omit<RequestInit, 'method' | 'body'> & {
  parseAs?: 'json' | 'text';
};

/**
 * Extracts error message from failed response body
 */
const extractErrorMessage = async (res: Response): Promise<string> => {
  try {
    const json = await res.json();
    return json?.message || 'Request failed';
  } catch {
    return 'Request failed';
  }
};

/**
 * Core request handler used by all exported HTTP methods
 */
const request = async <T>(
  method: string,
  url: string,
  body?: unknown,
  options?: FetchOptions
): Promise<ApiResponse<T>> => {
  try {
    const { parseAs = 'json', headers, ...rest } = options || {};

    const res = await fetch(url, {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(headers || {}),
      },
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      ...rest,
    });

    if (!res.ok) {
      const message = await extractErrorMessage(res);
      throw new ApiError(res.status, message);
    }

    const data = parseAs === 'json' ? await res.json() : await res.text();

    return {
      success: true,
      status: res.status,
      data,
    };
  } catch (err: unknown) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      return handleApiError<T>(new NetworkError());
    }

    return handleApiError<T>(err);
  }
};

/**
 * Exported HTTP verbs
 */
export const get = <T>(url: string, options?: FetchOptions) =>
  request<T>('GET', url, undefined, options);

export const post = <T>(url: string, body?: unknown, options?: FetchOptions) =>
  request<T>('POST', url, body, options);

export const put = <T>(url: string, body?: unknown, options?: FetchOptions) =>
  request<T>('PUT', url, body, options);

export const patch = <T>(url: string, body?: unknown, options?: FetchOptions) =>
  request<T>('PATCH', url, body, options);

export const del = <T>(url: string, options?: FetchOptions) =>
  request<T>('DELETE', url, undefined, options);
