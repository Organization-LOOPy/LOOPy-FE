import { useMutation } from "@tanstack/react-query";
import { patchFcmToken } from "../../../apis/fcm/api";
import type { FcmTokenRequest, FcmTokenResponse } from "../../../apis/fcm/type";

export const usePatchFcmToken = () => {
  return useMutation<FcmTokenResponse, Error, FcmTokenRequest>({
    mutationFn: patchFcmToken,
    onSuccess: (data) => {
      console.log("토큰 패치 성공:", data);
    },
  });
};


