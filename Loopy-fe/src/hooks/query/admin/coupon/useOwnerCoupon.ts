import { useQuery } from '@tanstack/react-query';
import { getOwnerCoupons } from '../../../../apis/admin/coupon/create/api';
import type { DiscountType, GetOwnerCouponsResponse } from '../../../../apis/admin/coupon/type';

export const OWNER_COUPONS_QUERY_KEY = 'ownerCoupons';

export const useOwnerCoupons = (
  cafeId: number | undefined,
  type?: DiscountType
) => {
  return useQuery<GetOwnerCouponsResponse>({
    queryKey: [OWNER_COUPONS_QUERY_KEY, cafeId, type ?? 'ALL'],
    queryFn: () => getOwnerCoupons(cafeId as number, type),
    enabled: !!cafeId,
  });
};
