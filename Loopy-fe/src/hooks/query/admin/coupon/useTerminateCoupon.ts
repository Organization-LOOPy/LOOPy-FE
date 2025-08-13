import { useMutation, useQueryClient } from '@tanstack/react-query';
import { terminateOwnerCoupon } from '../../../../apis/admin/coupon/terminate/api';
import type { TerminateOwnerCouponPathParams } from '../../../../apis/admin/coupon/type';

export const ownerCouponsKey = (cafeId: number) => ['ownerCoupons', cafeId] as const;

export function useTerminateOwnerCoupon() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: TerminateOwnerCouponPathParams) => terminateOwnerCoupon(vars),
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ownerCouponsKey(vars.cafeId) });
    },
  });
}
