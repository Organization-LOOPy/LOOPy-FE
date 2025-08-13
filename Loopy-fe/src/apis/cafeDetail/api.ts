import axiosInstance from '../axios';
import type { CafeDetailResponse, CafeDetailSuccess } from './type';

export const getCafeDetail = async (cafeId: number | string): Promise<CafeDetailSuccess> => {
  const res = await axiosInstance.get<CafeDetailResponse>(`/api/v1/cafes/${cafeId}`);
  return res.data.success;
};
