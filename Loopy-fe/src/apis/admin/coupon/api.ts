import axiosInstance from '../../axios';
import type {
  CreateOwnerCouponRequest,
  CreateOwnerCouponResponse,
  DiscountType,
} from './type';

const defaultName = (t: DiscountType, v: number) => {
  if (t === 'FREE_DRINK') return '무료 음료';
  if (t === 'SIZE_UP') return '사이즈업';
  return `${v}원 할인 쿠폰`;
};

export const createOwnerCoupon = async (
  cafeId: number,
  body: CreateOwnerCouponRequest
): Promise<CreateOwnerCouponResponse> => {
  try {
    const { data } = await axiosInstance.post<CreateOwnerCouponResponse>(
      `/api/v1/owner/cafes/${cafeId}/coupons`,
      body
    );
    return data;
  } catch (err) {
    console.error('쿠폰 생성 실패. mock 응답으로 대체합니다.', err);

    const nowIso = new Date().toISOString();
    const mock: CreateOwnerCouponResponse = {
      message: '모의 응답: 쿠폰이 성공적으로 생성되었습니다.',
      data: {
        id: Math.floor(Math.random() * 100000) + 1,
        cafeId,
        name: body.name ?? defaultName(body.discountType, body.discountValue),
        discountType: body.discountType,
        discountValue: body.discountValue,
        applicableMenuId: body.applicableMenuId ?? null,
        validDays: null,
        isActive: true,
        expiredAt: body.endDate ?? nowIso,
        createdAt: nowIso,
        startDate: body.startDate,
        endDate: body.endDate,
      },
    };

    return mock;
  }
};
