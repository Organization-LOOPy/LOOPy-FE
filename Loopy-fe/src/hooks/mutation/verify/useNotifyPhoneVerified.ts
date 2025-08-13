import { useMutation } from "@tanstack/react-query";
import { postVerifyPhone } from "../../../apis/auth/verifyPhone/api";
import type { VerifyPhoneRequest, VerifyPhoneResponse } from "../../../apis/auth/verifyPhone/type";

export const useNotifyPhoneVerified = (
  onSuccess?: (data: VerifyPhoneResponse) => void,
  onError?: (e: unknown) => void
) => {
  return useMutation({
    mutationKey: ["auth", "verify-phone"],
    mutationFn: (body: VerifyPhoneRequest) => postVerifyPhone(body),
    onSuccess: (data) => onSuccess?.(data),
    onError: (e) => onError?.(e),
  });
};
