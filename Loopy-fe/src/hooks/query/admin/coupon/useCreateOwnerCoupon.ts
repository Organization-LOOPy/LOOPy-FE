import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOwnerCoupon } from '../../../../apis/admin/coupon/api';
import type { CreateOwnerCouponRequest, CreateOwnerCouponResponse } from '../../../../apis/admin/coupon/type';

export interface CreateOwnerCouponVariables {
  cafeId: number;
  payload: CreateOwnerCouponRequest; 
}

export const useCreateOwnerCoupon = (
  onSuccess?: (data: CreateOwnerCouponResponse) => void,
  onError?: (error: unknown) => void
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ cafeId, payload }: CreateOwnerCouponVariables) =>
      createOwnerCoupon(cafeId, payload),
    onSuccess: (data, vars) => {
      qc.invalidateQueries({ queryKey: ['ownerCoupons', vars.cafeId], exact: false });
      onSuccess?.(data);
    },
    onError: (error) => {
      console.error('[쿠폰 생성 실패]', error);
      onError?.(error);
    },
  });
};
