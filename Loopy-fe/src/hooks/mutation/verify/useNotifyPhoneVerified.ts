import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postVerifyPhone } from "../../../apis/auth/verifyPhone/api";
import type { VerifyPhoneRequest, VerifyPhoneResponse } from "../../../apis/auth/verifyPhone/type";

export const useNotifyPhoneVerified = (
  onSuccess?: (data: VerifyPhoneResponse) => void,
  onError?: (e: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["auth", "verify-phone"],
    mutationFn: (body: VerifyPhoneRequest) => postVerifyPhone(body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["isDummyPhone"] });
      onSuccess?.(data);
    },
    onError: (e) => onError?.(e),
  });
};
