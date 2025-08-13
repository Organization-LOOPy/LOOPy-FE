import { useMutation } from "@tanstack/react-query";
import {
  patchUserInactive,
  patchUserActivate,
} from "../../../apis/auth/active/api";

export const usePatchUserInactive = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: patchUserInactive,
    onSuccess: () => {
      onSuccess?.();
    },
    onError,
  });
};

export const usePatchUserActivate = (
  onSuccess?: () => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationFn: patchUserActivate,
    onSuccess: () => {
      onSuccess?.();
    },
    onError,
  });
};