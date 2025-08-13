import { useMutation } from "@tanstack/react-query";
import { postReview } from "../../../apis/review/post/api";
import type { ReviewPostResponse } from "../../../apis/review/post/type";
import { reviewPostMock } from "../../../mock/reviewPostMock";

export const usePostReview = () => {
  return useMutation<ReviewPostResponse, unknown, { cafeId: string; formData: FormData }>({
    mutationFn: async ({ cafeId, formData }) => {
      try {
        return await postReview({ cafeId, formData });
      } catch (error) {
        console.error("리뷰 작성 실패. 목데이터로 대체합니다.");
        return reviewPostMock;
      }
    },
  });
};