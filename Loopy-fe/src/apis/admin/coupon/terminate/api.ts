import axiosInstance from '../../../axios';
import type {
  TerminateOwnerCouponPathParams,
  TerminateOwnerCouponResponse,
} from '../type';

export async function terminateOwnerCoupon(
  params: TerminateOwnerCouponPathParams
): Promise<TerminateOwnerCouponResponse['data']> {
  const { cafeId, couponId } = params;
  const res = await axiosInstance.patch<TerminateOwnerCouponResponse>(
    `/api/v1/owner/cafes/${cafeId}/coupons/${couponId}/terminate`
  );
  return res.data.data;
}
