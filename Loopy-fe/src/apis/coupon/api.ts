import axiosInstance from "../axios";

interface IssueCouponRequest {
    cafeId: string;
    id: number;
    createdAt: string;
    expiredAt: string;
}

export const issueCoupon = async ({ cafeId, id, createdAt, expiredAt }: IssueCouponRequest) => {
    const response = await axiosInstance.post(`/api/v1/cafes/${cafeId}/coupon`, {
        id,
        createdAt,
        expiredAt,
    });
    return response.data;
};
