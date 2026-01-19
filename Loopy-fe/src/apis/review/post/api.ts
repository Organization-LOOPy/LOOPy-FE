import axiosInstance from "../../axios";

export const postReview = async ({
  cafeId,
  formData,
}: {
  cafeId: string;
  formData: FormData;
}) => {
  const response = await axiosInstance.post(
    `/api/v1/cafe/${cafeId}/review`,
    formData,
  );
  return response.data;
};

export interface ReviewPostItem {
  reviewId: number;
  cafeId: number;
  createdAt: string;
}

export interface ReviewPostResponse {
  resultType: 'SUCCESS' | 'FAILURE';
  error: any;
  success: {
    message: string;
    review: ReviewPostItem;
  };
}