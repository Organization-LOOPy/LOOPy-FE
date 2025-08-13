import type { ApiResponse } from "../types/ApiResponse";

export interface PatchAgreementRequest {
  termsAgreed: boolean;
  privacyPolicyAgreed: boolean;
  marketingAgreed: boolean;
  locationPermission: boolean;
}

export interface PatchResponse {
  message: string;
  agreement: {
    id: number;
    userId: string;
    termsAgreed: boolean;
    privacyPolicyAgreed: boolean;
    marketingAgreed: boolean;
    locationPermission: boolean;
    agreedAt: string;
  };
}

export type PatchAgreementResponse = ApiResponse<PatchResponse>;