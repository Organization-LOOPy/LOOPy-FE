import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStampImage } from "../../../../apis/admin/stamp/api";

export function useDeleteStampImage() {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, number>({
    mutationFn: deleteStampImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stampImages"] });
    },
  });
}
