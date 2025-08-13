import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { uploadCafePhotos } from "../../../../apis/admin/photo/api";
import type { CafePhoto } from "../../../../apis/admin/photo/type";

export function useUploadCafePhotos(
  options?: UseMutationOptions<CafePhoto[], Error, File[]>
) {
  return useMutation<CafePhoto[], Error, File[]>({
    mutationFn: uploadCafePhotos,
    ...options,
  });
}
