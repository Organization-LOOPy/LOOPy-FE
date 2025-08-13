import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { deleteCafePhoto } from "../../../../apis/admin/photo/api";

export function useDeleteCafePhoto(
  options?: UseMutationOptions<boolean, Error, number>
) {
  return useMutation<boolean, Error, number>({
    mutationFn: deleteCafePhoto,
    ...options,
  });
}
