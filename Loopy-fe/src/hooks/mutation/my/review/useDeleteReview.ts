import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../../../apis/my/review/item/api";

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation<string, unknown, number>({
    mutationFn: async (reviewId) => {
      const res = await deleteReview(reviewId);
      return res.data.success.message;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myReviews"] });
    },
  });
};
