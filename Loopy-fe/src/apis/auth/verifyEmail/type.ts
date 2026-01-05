export interface EmailVerificationRequest {
  email: string;
}

export interface EmailVerificationVerifyRequest {
  email: string;
  code: string;
}

export interface VerificationResponse {
  success: boolean;
  message: string;
}
