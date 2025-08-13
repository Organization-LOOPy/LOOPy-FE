export interface ApiResponse<T> {
  resultType: "SUCCESS" | "FAILURE";
  error: string | null;
  success?: T;
}
