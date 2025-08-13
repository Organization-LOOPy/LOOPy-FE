import { useMutation } from "@tanstack/react-query";
import { updateReview } from "../../../../apis/my/review/item/api";
import type { UpdateReviewRequest } from "../../../../apis/my/review/item/type";

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: ({ reviewId, data }: { reviewId: number; data: UpdateReviewRequest }) =>
      updateReview(reviewId, data),
  });
};