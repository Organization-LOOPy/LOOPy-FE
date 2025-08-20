export interface SavePhoneRequest {
  phoneNumber: string;
}

export interface SavePhoneResponse {
  message: string; 
  userId: string;  
  phoneNumber: string; 
}

export interface ErrorResponse {
  errorCode: string;
  reason: string;
  data: unknown;
}
