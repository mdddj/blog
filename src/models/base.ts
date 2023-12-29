export interface ApiResponse<T> {
  status: number;
  message: string;
  success: boolean;
  data: T;
}
