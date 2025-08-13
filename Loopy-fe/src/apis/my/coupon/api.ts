import axiosInstance from '../../axios';
import type { GetUserCouponsResponse, UserCouponStatus } from './type';

export const getUserCoupons = async (
  status: UserCouponStatus = 'usable'
): Promise<GetUserCouponsResponse> => {
  const { data } = await axiosInstance.get<GetUserCouponsResponse>(
    '/api/v1/user-coupons',
    { params: { status } }
  );
  return data;
};
