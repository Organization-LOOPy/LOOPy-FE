import type { ApiResponse } from "../types/ApiResponse";

export interface PatchNicknameRequest {
  nickname: string;
}

export interface PatchNicknameResponse {
  message: string;
  user: {
    id: string;
    nickname: string;
    updatedAt: string;
  };
}

export interface MyInfoResponse {
  user: {
    id: string;
    email: string;
    phoneNumber: string;
    nickname: string;
    role: "CUSTOMER" | "OWNER" | string;
    status: string;
    allowKakaoAlert: boolean;
    profileImageUrl: string | null;
    fcmToken: string | null;
    createdAt: string;
    updatedAt: string;
    inactivedAt: string | null;
  };
}

export type MyInfoApiResponse = ApiResponse<MyInfoResponse>;
