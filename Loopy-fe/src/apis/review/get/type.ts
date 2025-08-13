export interface ReviewItem {
    id: number;
    title: string;
    content: string;
    nickname: string;
    createdAt: string;
    images: string[];
}

export interface ReviewResponse {
    resultType: 'SUCCESS' | 'FAILURE';
    error: any;
    success: {
        reviews: ReviewItem[];
        nextCursor: number | null;
        hasNextPage: boolean;
    };
}

export type ReviewPage = ReviewResponse['success'];