import axiosInstance from "../../../axios";
import type { UpdateReviewRequest, ReviewResponse } from "./type";

export const updateReview = (reviewId: number, data: UpdateReviewRequest) => {
  return axiosInstance.patch<ReviewResponse>(`/api/v1/reviews/${reviewId}`, data);
};

export const deleteReview = (reviewId: number) => {
  return axiosInstance.delete<ReviewResponse>(`/api/v1/reviews/${reviewId}`);
};