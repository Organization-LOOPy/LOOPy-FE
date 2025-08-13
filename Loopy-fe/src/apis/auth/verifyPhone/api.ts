import axiosInstance from "../../axios";
import type { VerifyPhoneRequest, VerifyPhoneResponse } from "./type";

export const postVerifyPhone = async (body: VerifyPhoneRequest) => {
  const { data } = await axiosInstance.post<VerifyPhoneResponse>(
    "/api/v1/users/me/verify-phone",
    body
  );
  return data;
};
