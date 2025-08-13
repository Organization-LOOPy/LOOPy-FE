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
    success?: {
        id: number;
        expiredAt: string;
        acquisitionType: string;
        couponTemplate: {
        id: number;
        name: string;
        discountType: 'AMOUNT' | 'PERCENTAGE';
        discountValue: number;
        applicableMenu: {
            name: string;
            description: string;
            photoUrl: string;
        } | null;
        expiredAt: string;
        };
        couponTemplateId: number;
    };
}
