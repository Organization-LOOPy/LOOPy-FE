export type DiscountType = 'DISCOUNT' | 'FREE_DRINK' | 'SIZE_UP';

export interface CreateOwnerCouponRequest {
  discountType: DiscountType;     
  discountValue: number;           
  applicableMenuId?: number | null;  
  usageCondition?: string | null;   
  startDate?: string;                 
  endDate?: string;                    
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
  expiredAt?: string | null;     
  createdAt: string; 
  startDate?: string;   
  endDate?: string;
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
  startDate: string;    
  endDate: string;         
  discountType: DiscountType;
}

export interface GetOwnerCouponsResponse {
  data: OwnerCouponListItem[];
}

export const toYmd = (iso: string) => {
  try {
    return new Date(iso).toISOString().slice(0, 10);
  } catch {
    return iso?.slice(0, 10) ?? '';
  }
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
