export interface Review {
  id: number;
  cafeName: string;
  content: string;
  date: string;
  images: string[];
}

export interface ReviewListResponse {
  message: string;
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
