import { useMutation } from "@tanstack/react-query";
import { deleteReview } from "../../../../apis/my/review/item/api";

export const useDeleteReview = () => {
  return useMutation({
    mutationFn: (reviewId: number) => deleteReview(reviewId),
  });
};
