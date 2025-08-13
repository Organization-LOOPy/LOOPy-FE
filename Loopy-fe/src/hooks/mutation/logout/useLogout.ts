import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../../apis/auth/logout/api";

export const useLogout = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({   
    mutationFn: postLogout,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      onSuccess?.();
    },
    onError,
  });
};