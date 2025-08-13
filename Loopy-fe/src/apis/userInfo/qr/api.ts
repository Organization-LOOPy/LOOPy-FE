import axiosInstance from "../../axios";
import type { UserQRCodeResponse } from "./type";

export const getUserQRCode = async (): Promise<UserQRCodeResponse> => {
  const res = await axiosInstance.get<UserQRCodeResponse>("/api/v1/users/me/qrcode");
  return res.data;
};
