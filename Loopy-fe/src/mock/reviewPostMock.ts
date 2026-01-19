import type { ReviewPostResponse } from "../apis/review/post/type";

export const reviewPostMock: ReviewPostResponse = {
  resultType: "SUCCESS",
  error: null,
  success: {
    message: "목데이터: 리뷰가 등록되었습니다.",
    review: {
      reviewId: 0,
      cafeId: 0,
      createdAt: new Date().toISOString(),
    },
  },
};
