export interface ConvertStampBookResponse {
  stampBookId: number;
  cafeId: number;
  cafeName: string;
  stampCount: number;
  pointPerStamp: number;
  pointAmount: number;
  remainingStampCount: number;
  convertedAt: string;
}

export interface ApiResponse<T> {
  status: "SUCCESS" | "FAIL";
  code: number;
  message: string;
  data: T;
}
