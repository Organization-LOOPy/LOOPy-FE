import type { FormData } from "../types/form";
import type { SignupRequest } from "../apis/auth/signin/type";

export const mapFormDataToSignupRequest = (formData: FormData): SignupRequest => {
  return {
    email: formData.email,
    password: formData.password,
    nickname: formData.nickname,
    phoneNumber: formData.phoneNumber,
    role: formData.role,
    allowKakaoAlert: formData.allowKakaoAlert,
    agreements: {
      termsAgreed: formData.agreeTerms,
      privacyPolicyAgreed: formData.agreePrivacy,
      marketingAgreed: formData.agreemarketing,    
      locationPermission: formData.agreelocation,  
    },
  };
};
