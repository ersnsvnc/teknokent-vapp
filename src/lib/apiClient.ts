import { handleApiError } from './handleError';
import { ApiError, NetworkError } from './errors/apiError';
import type { ApiResponse } from '@/types/api/common';
import { redirect } from 'next/navigation';

type FetchOptions = Omit<RequestInit, 'method' | 'body'> & {
  parseAs?: 'json' | 'text';
  isFormData?: boolean;
  isFileDownload?: boolean;
};

/**
 * Gets cookie on environment (client or server)
 */
const getCookie = async (key: string): Promise<string | undefined> => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith(key + '='));
    return tokenCookie ? tokenCookie.split('=')[1].trim() : undefined;
  } else {
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = await cookies();
      return cookieStore.get(key)?.value;
    } catch (error) {
      console.error('Error accessing server cookies:', error);
      return undefined;
    }
  }
};
/**
 * Extracts error message from failed response body
 */
const extractErrorMessage = async (res: Response): Promise<string> => {
  try {
    const json = await res.json();
    return json?.error.message || 'Request failed';
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
    const token = await getCookie('token');
    const acceptLanguage = (await getCookie('NEXT_LOCALE')) == 'tr' ? 'tr-TR' : 'en-EN';
    const {
      parseAs = 'json',
      isFormData = false,
      isFileDownload = false,
      headers,
      ...rest
    } = options || {};
    const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_API_V}`;

    const resolvedHeaders: HeadersInit = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(headers || {}),
    };

    if (!isFormData) {
      (resolvedHeaders as Record<string, string>)['Content-Type'] = 'application/json';
    }

    (resolvedHeaders as Record<string, string>)['Accept-Language'] = acceptLanguage;

    const res = await fetch(`${BASE_URL}${url}`, {
      method,
      credentials: 'include',
      headers: resolvedHeaders,
      ...(body !== undefined
        ? { body: isFormData ? (body as BodyInit) : JSON.stringify(body) }
        : {}),
      ...rest,
    });

    if (!res.ok && method !== 'GET') {
      const message = await extractErrorMessage(res);
      throw new ApiError(res.status, message);
    }

    if (isFileDownload) {
      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: { message: 'File download failed' },
        } as ApiResponse<T>;
      }
      const blob = await res.blob();
      return { data: { file: blob }, success: true, status: res.status } as ApiResponse<T>;
    }

    const rawData = parseAs === 'json' ? await res.json() : await res.text();
    const {
      data,
      error,
      message,
      hasPrevious,
      hasNext,
      totalItems,
      currentPage,
      pageSize,
      totalPages,
    } = rawData;

    return {
      success: res.ok,
      status: res.status,
      data,
      error,
      pagination: { hasPrevious, hasNext, totalItems, currentPage, pageSize, totalPages },
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
