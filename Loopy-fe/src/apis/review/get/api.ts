import axiosInstance from '../../axios';
import { cafeReviewMock } from '../../../mock/cafeReviewMock';
import type { ReviewPage } from './type';

export const getCafeReviews = async (
    cafeId: string, 
    cursor?: number, 
    token?: string
): Promise<ReviewPage> => {
    try {
        const res = await axiosInstance.get(`/api/v1/cafes/${cafeId}/review`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: cursor ? { cursor } : {},
        });

        return res.data.success;
    } catch (err) {
        console.error("리뷰 API 실패 → mock 데이터 사용:", err);
        return cafeReviewMock;
    }
};
