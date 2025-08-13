export interface CurrentPointResponse {
  resultType: string;
  error: null;
  success: {
    message: string;
    currentPoint: number;
  };
}

export interface PointTransactionResponse {
  resultType: string;
  error: null;
  success: string[]; 
}
