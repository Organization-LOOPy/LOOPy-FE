import axiosInstance from '../../axios';
import type { OwnerWithdrawSuccessResponse } from './type';

export const deleteOwnerAccount = async (): Promise<OwnerWithdrawSuccessResponse> => {
  const { data } = await axiosInstance.delete<OwnerWithdrawSuccessResponse>(
    '/api/v1/users/owner'
  );
  return data;
};
