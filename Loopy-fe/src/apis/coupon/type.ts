export interface IssueCouponParams {
  cafeId: string;
  body: {
    id: number;
    createdAt: string;
    expiredAt: string;
  };
}

export interface IssueCouponResponse {
  resultType: 'SUCCESS' | 'FAILURE';
  error: null | {
    errorCode: string;
    message: string;
  };
  success: {
    id: number;
    expiredAt: string | null;
    acquisitionType: string;
    couponTemplate: {
      id: number;
      name: string;
      discountType: 'DISCOUNT' | 'SIZE_UP' | 'FREE_ITEM';
      discountValue: number | null;
      applicableMenu: {
        id: number;
        cafeId: number;
        name: string;
        description: string;
        price: number;
        isSoldOut: boolean;
        photoUrl: string | null;
        createdAt: string;
        updatedAt: string | null;
        isRepresentative: boolean;
      } | null;
      expiredAt: string | null;
    };
    couponTemplateId: number;
    createdAt: string;
    updatedAt: string | null;
  };
}
