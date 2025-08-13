export interface VerifyPhoneRequest {
  phoneNumber: string;
}

export interface VerifyPhoneResponse {
  message: string;     
  phoneNumber: string;   
}
