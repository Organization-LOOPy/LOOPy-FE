export interface ServerReview {
  reviewId: number;
  cafeId: number;
  cafeName: string;
  content: string;
  images: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface ReviewListPagination {
  nextCursor: number | null;
  hasNextPage: boolean;
}

export interface ReviewListSuccess {
  message: string;
  data: ServerReview[];
  pagination: ReviewListPagination;
}

export interface ReviewListResponse {
  resultType: "SUCCESS" | "FAILURE";
  error: any;
  success: ReviewListSuccess;
}
