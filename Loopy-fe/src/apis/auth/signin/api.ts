import axiosInstance from "../../axios";
import type { SignupRequest, SignupResponse } from "./type";

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await axiosInstance.post<SignupResponse>(
    "/api/v1/auth/signup",
    data
  );
  return response.data;
};
