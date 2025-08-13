import axiosInstance from "../../axios";
import type { LoginRequest, LoginResponse } from "./type";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/api/v1/auth/login", data);
    return response.data;
  } catch (e) {
    console.error("서버 미응답. mock 응답 반환:", data);

    return {
      message: "임시 로그인: 로그인 성공",
      token: "mock.jwt.token.value",
      user: {
        id: "999",
        email: data.email,
        nickname: "테스터",
        currentRole: data.role,
      },
    };
  }
};
