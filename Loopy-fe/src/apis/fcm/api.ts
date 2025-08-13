import axiosInstance from "../axios";
import type { FcmTokenRequest, FcmTokenResponse } from "./type";

export const patchFcmToken = async (
  data: FcmTokenRequest
): Promise<FcmTokenResponse> => {
  const res = await axiosInstance.patch<FcmTokenResponse>(
    "/api/v1/users/me/fcm-token",
    data
  );
  return res.data;
};
