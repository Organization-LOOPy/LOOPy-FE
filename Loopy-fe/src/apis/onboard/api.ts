import axiosInstance from "../axios";
import type {
  PreferredAreaRequest,
  PreferredAreaResponse,
  PreferredKeywordsRequest,
  PreferredKeywordsResponse,
} from "./type";

// 목데이터 응답
const mockPreferredAreaResponse: PreferredAreaResponse = {
  message: "mock: 선호 지역이 저장되었습니다.",
  preferredArea: "서울시 강남구",
};

const mockPreferredKeywordsResponse: PreferredKeywordsResponse = {
  message: "mock: 선호 키워드가 저장되었습니다.",
  preferredKeywords: ["노트북", "디카페인"],
};

// 선호 지역 PATCH
export const patchPreferredArea = async (
  data: PreferredAreaRequest
): Promise<PreferredAreaResponse> => {
  try {
    const res = await axiosInstance.patch<PreferredAreaResponse>(
      "/api/v1/users/me/preferred-area",
      data
    );
    console.log("patchPreferredArea response:", res.data);
    return res.data;
  } catch (error) {
    console.error("patchPreferredArea failed, returning mock data:", error);
    return mockPreferredAreaResponse;
  }
};

// 선호 키워드 PATCH
export const patchPreferredKeywords = async (
  data: PreferredKeywordsRequest
): Promise<PreferredKeywordsResponse> => {
  try {
    const res = await axiosInstance.patch<PreferredKeywordsResponse>(
      "/api/v1/users/me/preferences",
      data
    );
    console.log("patchPreferredKeywords response:", res.data);
    return res.data;
  } catch (error) {
    console.error("patchPreferredKeywords failed, returning mock data:", error);
    return mockPreferredKeywordsResponse;
  }
};
