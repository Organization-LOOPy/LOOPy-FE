import axiosInstance from '../../axios';
import type { ExtendStampBookResponse } from './type';

export const extendStampBook = async (
  stampBookId: number,
): Promise<ExtendStampBookResponse> => {
  const response = await axiosInstance.patch<ExtendStampBookResponse>(
    `/api/v1/users/me/stampbooks/${stampBookId}/extend`,
  );
  return response.data;
};
