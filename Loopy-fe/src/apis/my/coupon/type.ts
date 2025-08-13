export type UserCouponStatus = 'usable' | 'past';

export interface CouponTemplate {
  name: string;
  discountType: 'DISCOUNT' | 'SIZE_UP' | 'FREE_DRINK';
  discountValue: number;
  applicableMenuId: number;
  startDate: string; 
  endDate: string;   
}

export interface UserCoupon {
  id: number;
  status: string; 
  expiredAt: string;
  usedAt: string | null; 
  cafeId: number;
  cafeName: string;
  cafeImage: string;
  usageCondition: string;
  couponTemplate: CouponTemplate;
}

export interface GetUserCouponsResponse {
  resultType: 'SUCCESS' | 'FAIL';
  data: UserCoupon[];
}
