import axiosInstance from "../axios"; 
import type { MyInfoApiResponse, PatchNicknameRequest, PatchNicknameResponse } from "./type";

export const patchNickname = async (
  data: PatchNicknameRequest
): Promise<PatchNicknameResponse> => {
  try {
    const res = await axiosInstance.patch("/api/v1/users/me/nickname", data);
    return res.data;
  } catch (error) {
    console.error("서버 연결 실패, mock 데이터 반환");

    return {
      message: "닉네임이 성공적으로 변경되었습니다.",
      user: {
        id: "mock-id",
        nickname: data.nickname,
        updatedAt: new Date().toISOString(),
      },
    };
  }
};

export const getMyInfo = async (): Promise<NonNullable<MyInfoApiResponse["success"]>["user"]> => {
  const res = await axiosInstance.get<MyInfoApiResponse>("/api/v1/users/me");

  if (!res.data.success || !res.data.success.user) {
    throw new Error("사용자 정보가 없습니다.");
  }

  return res.data.success.user;
};




