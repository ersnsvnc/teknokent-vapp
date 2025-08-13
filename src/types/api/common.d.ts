export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  status: number;
  error?: {
    message: string;
    status: number;
  };
}
