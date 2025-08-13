import axiosInstance from "../../axios";
import type { LogoutResponse } from "./type";

export const postLogout = async (): Promise<LogoutResponse> => {
  const res = await axiosInstance.post<LogoutResponse>("/api/v1/auth/logout");
  return res.data;
};