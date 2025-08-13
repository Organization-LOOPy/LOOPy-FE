import { useMutation } from "@tanstack/react-query";
import { issueCoupon } from "../../../apis/coupon/api";
import { couponIssueMock } from "../../../mock/couponIssueMock";

interface IssueCouponParams {
    cafeId: string;
    id: number;
    createdAt: string;
    expiredAt: string;
}

export const useIssueCoupon = () => {
    return useMutation({
        mutationFn: async (params: IssueCouponParams) => {
            try {
                return await issueCoupon(params);
            } catch (error) {
                console.error("쿠폰 발급 실패. 목데이터로 대체합니다.");
                return couponIssueMock;
            }
        },
    });
};
