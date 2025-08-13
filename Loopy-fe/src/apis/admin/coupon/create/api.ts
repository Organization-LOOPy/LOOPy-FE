import axiosInstance from '../../../axios';
import type { DiscountType, GetOwnerCouponsResponse } from '../type';

export const getOwnerCoupons = async (
  cafeId: number,
  type?: DiscountType
): Promise<GetOwnerCouponsResponse> => {
  try {
    const { data } = await axiosInstance.get<GetOwnerCouponsResponse>(
      `/api/v1/owner/cafes/${cafeId}/coupons`,
      { params: type ? { type } : undefined }
    );
    return data;
  } catch (err) {
    console.error('쿠폰 목록 조회 실패. mock으로 대체합니다.', err);
    return {
      data: [
        {
          id: 12,
          name: '아메리카노 1000원 할인, 1만원 이상 구매 시',
          status: '발행 중',
          usedCount: 5,
          startDate: '2025-08-10',
          endDate: '2025-08-31',
          discountType: 'DISCOUNT',
        },
      ],
    };
  }
};
