import axiosInstance from "../../axios";
import type { ReviewListResponse, ReviewListSuccess } from "./type";

export interface FetchMyReviewsParams {
  page?: number;
  limit?: number;
}

export const fetchMyReviews = async ({
  page = 1,
  limit = 10,
}: FetchMyReviewsParams = {}): Promise<ReviewListSuccess> => {
  const res = await axiosInstance.get<ReviewListResponse>(
    "/api/v1/users/me/reviews",
    {
      params: { page, limit },
    }
  );

  if (res.data.resultType !== "SUCCESS") {
    throw new Error(res.data.error ?? "리뷰 조회 실패");
  }

  return res.data.success;
};
