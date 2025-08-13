import { couponIssueMock } from '../mock/couponIssueMock';
import { useIssueCoupon } from '../hooks/mutation/detail/useIssueCoupon';

interface Params {
    issueCoupon: ReturnType<typeof useIssueCoupon>['mutateAsync'];
    cafeId: string;
    couponTemplateId: number;
    createdAt: string;
    expiredAt: string;
    onSuccess?: (data: typeof couponIssueMock) => void;
    onAlreadyIssued?: () => void;
    onError?: (e: unknown) => void;
}

export const handleIssueCoupon = async ({
    issueCoupon,
    cafeId,
    couponTemplateId,
    createdAt,
    expiredAt,
    onSuccess,
    onAlreadyIssued,
    onError,
}: Params) => {
    try {
        const data = await issueCoupon({
            cafeId,
            id: couponTemplateId,
            createdAt,
            expiredAt,
        });

        if (data?.errorCode === 'C002') {
            onAlreadyIssued?.();
            return;
        }

        onSuccess?.(data);
    } catch (e) {
        onError?.(e);
    }
};
