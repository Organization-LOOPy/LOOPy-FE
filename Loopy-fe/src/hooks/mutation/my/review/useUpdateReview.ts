import { useMutation } from "@tanstack/react-query";
import { updateReview } from "../../../../apis/my/review/item/api";

interface UpdateReviewSuccess {
  message: string;
  review: any;
}

export const useUpdateReview = () => {
  return useMutation<
    UpdateReviewSuccess,
    unknown,
    { reviewId: number; data: FormData } 
  >({
    mutationFn: async ({ reviewId, data }) => {
      const res = await updateReview(reviewId, data);
      return res.data.success;
    },
  });
};
