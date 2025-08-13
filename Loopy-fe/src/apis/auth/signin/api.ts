import axiosInstance from "../../axios";
import type { SignupRequest, SignupResponse } from "./type";

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  try {
    const response = await axiosInstance.post<SignupResponse>("/api/v1/auth/signup", data);
    return response.data;
  } catch (error) {
    console.warn("서버 미응답. mock 응답 반환:", data);

    return {
      message: "임시 회원가입: 회원가입 성공 (서버 없음)",
      token: "mocked-token-123456",
      user: {
        id: "999",
        email: data.email,
        nickname: data.nickname,
        currentRole: data.role,
      },
    };
  }
};
