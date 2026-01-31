import axiosInstance from "../../../axios";
import type { UpdateReviewResponse, DeleteReviewResponse } from "./type";

export const updateReview = (reviewId: number, formData: FormData) => {
  return axiosInstance.patch<UpdateReviewResponse>(
    `/api/v1/reviews/${reviewId}`,
    formData
  );
};

export const deleteReview = (reviewId: number) => {
  return axiosInstance.delete<DeleteReviewResponse>(
    `/api/v1/reviews/${reviewId}`
  );
};
