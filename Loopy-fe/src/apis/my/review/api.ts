import axiosInstance from "../../axios";
import type { ReviewListResponse } from "./type";

interface FetchMyReviewsParams {
  page?: number;
  limit?: number;
}

export const fetchMyReviews = async ({
  page = 1,
  limit = 10,
}: FetchMyReviewsParams): Promise<ReviewListResponse> => {
  const res = await axiosInstance.get("/api/v1/users/me/reviews", {
    params: { page, limit },
  });

  const { data, pagination, message } = res.data;

  if (!data || data.length === 0) {
    return {
      message: "리뷰가 없습니다.",
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
      },
    };
  }

  return { message, data, pagination };
};

