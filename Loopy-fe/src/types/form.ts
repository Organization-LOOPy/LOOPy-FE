export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  phone: string;
  verifyCode: string;
  allowKakaoAlert: boolean;
  agreeTerms: boolean; 
  agreePrivacy: boolean;
  agreemarketing: boolean,
  agreelocation: boolean,
  role: "CUSTOMER" | "OWNER"
}
