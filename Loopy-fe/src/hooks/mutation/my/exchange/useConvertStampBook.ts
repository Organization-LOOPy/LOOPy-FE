import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postConvertStampBook } from "../../../../apis/my/exchange/api";
import type {
  ApiResponse,
  ConvertStampBookResponse,
} from "../../../../apis/my/exchange/type";
import type { StampBookItem } from "../../../../apis/my/myStampbook/type";

export const useConvertStampBook = (
  onSuccess?: (data: ApiResponse<ConvertStampBookResponse>) => void,
  onError?: (error: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["convertStampBook"],
    mutationFn: (stampBookId: number) => postConvertStampBook(stampBookId),

    onSuccess: (data, stampBookId) => {
      queryClient.setQueryData<StampBookItem[]>(["myStampBooks"], (old) =>
        old ? old.filter((book) => book.id !== stampBookId) : []
      );

      queryClient.invalidateQueries({ queryKey: ["myStampBooks"] });

      onSuccess?.(data);
    },

    onError,
  });
};
