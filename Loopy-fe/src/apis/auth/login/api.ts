import axiosInstance from "../../axios";
import type { LoginRequest, LoginResponse } from "./type";

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/api/v1/auth/login",
    data
  );
  return response.data;
};
