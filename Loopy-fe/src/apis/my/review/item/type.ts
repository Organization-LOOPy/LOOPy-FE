export interface UpdateReviewRequest {
  title: string;
  content: string;
}

export interface ReviewItem {
  id: number;
  userId: number;
  cafeId: number;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  cafe: {
    id: number;
    name: string;
  };
}

export interface UpdateReviewResponse {
  resultType: "SUCCESS";
  error: null;
  success: {
    message: string;
    review: ReviewItem;
  };
}

export interface DeleteReviewResponse {
  resultType: "SUCCESS";
  error: null;
  success: {
    message: string;
  };
}
