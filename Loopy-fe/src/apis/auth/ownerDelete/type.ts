export interface OwnerWithdrawSuccessResponse {
  resultType: 'SUCCESS';
  message: string;
  data: {
    id: string;
    email: string;
  };
}

export interface OwnerWithdrawError {
  status?: number; 
  errorCode?: string;
  reason?: string;
  message?: string;
}
