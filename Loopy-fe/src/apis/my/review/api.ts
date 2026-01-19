import axiosInstance from '../../axios';
import type { ReviewListResponse, ReviewListSuccess } from './type';

export interface FetchMyReviewsParams {
  cursor?: number | null;
  size?: number;
}

export const fetchMyReviews = async ({
  cursor = null,
  size = 10,
}: FetchMyReviewsParams = {}): Promise<ReviewListSuccess> => {
  try {
    const res = await axiosInstance.get<ReviewListResponse>('/api/v1/users/me/reviews', {
      params: { cursor, size },
    });

    if (res.data.resultType === 'SUCCESS') {
      return res.data.success;
    }

    throw new Error(res.data.error ?? '리뷰 조회 실패');
  } catch {
    return {
      message: '목데이터',
      data: [
        {
          reviewId: 1,
          cafeId: 101,
          cafeName: '더미 카페',
          content: '서버 오류로 불러온 목데이터입니다.',
          images: [],
          createdAt: '2025-08-13T08:00:00.000Z',
        },
      ],
      pagination: { nextCursor: null, hasNextPage: false },
    };
  }
};
