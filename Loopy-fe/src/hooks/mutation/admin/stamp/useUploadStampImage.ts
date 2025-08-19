import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadStampImage } from "../../../../apis/admin/stamp/api";
import type { StampImage } from "../../../../apis/cafeDetail/type";

export function useUploadStampImage() {
  const queryClient = useQueryClient();

  return useMutation<StampImage, Error, File>({
    mutationFn: uploadStampImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stampImages"] });
    },
  });
}
