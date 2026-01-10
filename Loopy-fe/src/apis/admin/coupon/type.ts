export type DiscountType = 'DISCOUNT' | 'FREE_ITEM' | 'SIZE_UP';

export interface CreateOwnerCouponRequest {
  discountType: DiscountType;     
  discountValue: number;           
  applicableMenuId?: number | null;  
  usageCondition?: string | null;   
  startDate: string | null;
  endDate: string | null;                    
  name?: string;                    
}

export interface CreatedCoupon {
  id: number;
  cafeId: number;
  name: string;
  discountType: DiscountType;
  discountValue: number;
  applicableMenuId?: number | null;
  validDays?: number | null;
  isActive: boolean;
  expiredAt: string | null;     
  createdAt: string; 
  startDate: string | null;
  endDate: string | null;
}

export interface CreateOwnerCouponResponse {
  message: string;
  data: CreatedCoupon;
}

export interface OwnerCouponListItem {
  id: number;
  name: string;
  status: string;      
  usedCount: number;
  startDate: string | null;
  endDate: string | null;       
  discountType: DiscountType;
}

export interface GetOwnerCouponsResponse {
  data: OwnerCouponListItem[];
}

export const toYmd = (iso?: string | null) => {
  if (!iso) return '기한 없음';
  return iso.slice(0, 10);
};

export interface TerminateOwnerCouponPathParams {
  cafeId: number;
  couponId: number;
}

export interface TerminateOwnerCouponResponse {
  message: string;
  data: CreatedCoupon;
}

export interface ApiErrorEnvelope {
  errorCode: string;
  reason: string;
  data: null;
}
