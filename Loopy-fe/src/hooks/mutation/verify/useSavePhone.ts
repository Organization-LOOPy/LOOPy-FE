import { useMutation } from "@tanstack/react-query";
import { patchSavePhone } from "../../../apis/auth/verifyPhone/patch/api";
import type { SavePhoneRequest, SavePhoneResponse } from "../../../apis/auth/verifyPhone/patch/type";

export const useSavePhone = (
  onSuccess?: (data: SavePhoneResponse) => void,
  onError?: (e: unknown) => void
) => {
  return useMutation({
    mutationKey: ["auth", "save-phone"],
    mutationFn: (body: SavePhoneRequest) => patchSavePhone(body),
    onSuccess: (data) => onSuccess?.(data),
    onError: (e) => onError?.(e),
  });
};
