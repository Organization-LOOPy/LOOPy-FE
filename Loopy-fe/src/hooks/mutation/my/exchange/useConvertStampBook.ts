import { useMutation } from "@tanstack/react-query";
import { postConvertStampBook } from "../../../../apis/my/exchange/api";
import type { ApiResponse, ConvertStampBookResponse } from "../../../../apis/my/exchange/type";

export const useConvertStampBook = (
  onSuccess?: (data: ApiResponse<ConvertStampBookResponse>) => void,
  onError?: (error: unknown) => void
) => {
  return useMutation({
    mutationKey: ["convertStampBook"],
    mutationFn: (stampBookId: number) => postConvertStampBook(stampBookId),
    onSuccess: (data) => onSuccess?.(data),
    onError,
  });
};
