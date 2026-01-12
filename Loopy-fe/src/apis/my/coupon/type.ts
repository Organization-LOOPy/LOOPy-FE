export type UserCouponStatus = 'usable' | 'past';

export interface CouponTemplateCafePhoto {
  photoUrl: string;
}

export interface CouponTemplateCafe {
  id: number;
  name: string;
  photos: CouponTemplateCafePhoto[];
}

export interface CouponTemplate {
  usageCondition: string | null;
  cafe: CouponTemplateCafe;
  name: string;
  discountType: 'DISCOUNT' | 'SIZE_UP' | 'FREE_DRINK';
  discountValue: number | null;
  applicableMenuId: number | null;
  applicableMenu: unknown | null;
  startDate: string | null;
  endDate: string | null;
}

export interface UserCoupon {
  id: number;
  userId: number;
  couponTemplateId: number;
  acquisitionType: 'stamp' | string;
  status: 'active' | 'used' | 'expired' | string;
  issuedAt: string;
  expiredAt: string;
  usedAt: string | null;
  createdAt: string;
  updatedAt: string;

  couponTemplate: CouponTemplate;

  cafeId: number;
  cafeName: string;
  cafeImage: string;
  usageCondition: string | null;
}

export interface GetUserCouponsResponse {
  resultType: 'SUCCESS' | 'FAIL';
  data: UserCoupon[];
}
