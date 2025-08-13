export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  role: "CUSTOMER" | "OWNER";
  allowKakaoAlert: boolean;
  agreements: {
    termsAgreed: boolean;
    privacyPolicyAgreed: boolean;
    marketingAgreed: boolean;
    locationPermission: boolean;
  };
}

export interface SignupResponse {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    nickname: string;   
    currentRole: "CUSTOMER" | "OWNER";  
  };
}

