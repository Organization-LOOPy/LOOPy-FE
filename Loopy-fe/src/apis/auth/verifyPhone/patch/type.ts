export interface SavePhoneRequest {
  phoneNumber: string;
}

export interface SavePhoneResponse {
  message: string;
  merged: boolean;
  userId: string;
  phoneNumber: string;
  token?: string; 
}


export interface ErrorResponse {
  errorCode: string;
  reason: string;
  data: unknown;
}
