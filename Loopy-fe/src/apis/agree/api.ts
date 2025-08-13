import axiosInstance from "../axios";
import type { PatchAgreementRequest, PatchAgreementResponse } from "./type";

export const patchAgreements = async (
  data: PatchAgreementRequest
): Promise<PatchAgreementResponse> => {
  try {
    const res = await axiosInstance.post<PatchAgreementResponse>(
      "/api/v1/users/me/agreements",
      data
    );
    return res.data;
  } catch (error) {
    console.warn("약관 동의 저장 실패, mock 응답 반환:", error);

    const mockResponse: PatchAgreementResponse = {
      resultType: "SUCCESS",
      error: null,
      success: {
        message: "약관 동의 저장 (목)",
        agreement: {
          id: 0,
          userId: "mock-user",
          termsAgreed: data.termsAgreed,
          privacyPolicyAgreed: data.privacyPolicyAgreed,
          marketingAgreed: data.marketingAgreed,
          locationPermission: data.locationPermission,
          agreedAt: new Date().toISOString(),
        },
      },
    };

    return mockResponse;
  }
};
