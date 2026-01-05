import axiosInstance from "../../axios";
import type { EmailVerificationRequest, EmailVerificationVerifyRequest, VerificationResponse } from "./type";

export const requestEmailVerification = async (
  data: EmailVerificationRequest
): Promise<VerificationResponse> => {
  const res = await axiosInstance.post(
    "/api/verification/email/request",
    data
  );
  return res.data;
};

export const verifyEmailCode = async (
  data: EmailVerificationVerifyRequest
): Promise<VerificationResponse> => {
  const res = await axiosInstance.post(
    "/api/verification/email/verify",
    data
  );
  return res.data;
};
