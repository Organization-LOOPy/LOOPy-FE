import { useMutation } from "@tanstack/react-query";
import { login } from "../../../apis/auth/login/api";
import type { LoginRequest, LoginResponse } from "../../../apis/auth/login/type";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: login,

    onSuccess: (data) => {
      console.log("로그인 성공:", data.message);
    },

    onError: (error) => {
      console.error("로그인 실패 (네트워크 오류):", error);
    },

    onSettled: () => {
      console.log("로그인 요청 완료됨");
    },
  });
};
