import { useMutation } from "@tanstack/react-query";
import { signup } from "../../../apis/auth/signin/api.ts";
import type { SignupRequest, SignupResponse } from "../../../apis/auth/signin/type.ts";

export const useSignup = () => {
  return useMutation<SignupResponse, Error, SignupRequest>({
    mutationFn: signup,
  });
};
