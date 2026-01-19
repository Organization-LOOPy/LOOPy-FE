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