export interface ServerReview {
  reviewId: number;
  userId: number;
  cafeId: number;
  cafeName: string;
  title: string;
  content: string;
  images: string[];
  createdAt: string;
}

export interface ReviewPagination {
  page: number;
  limit: number;
  total: number;
}

export interface ReviewListSuccess {
  message: string;
  data: ServerReview[];
  pagination: ReviewPagination;
}

export interface ReviewListResponse {
  resultType: "SUCCESS" | "FAILURE";
  error: any;
  success: ReviewListSuccess;
}
