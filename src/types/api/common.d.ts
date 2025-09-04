export interface ApiResponse<T = unknown> {
  data?: T;
  pagination?: PaginationResponse;
  success: boolean;
  status?: number;
  error?: {
    message?: string;
    status?: number;
  };
}
export interface PaginationResponse {
  hasPrevious: boolean;
  hasNext: boolean;
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}
