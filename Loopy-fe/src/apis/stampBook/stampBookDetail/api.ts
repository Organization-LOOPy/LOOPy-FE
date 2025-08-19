// src/apis/stampBook/stampBookDetail/api.ts
import axiosInstance from '../../axios';
import type { StampBookDetail } from './type';

export const fetchStampBookDetail = async (
  stampBookId: number,
): Promise<StampBookDetail> => {
  const res = await axiosInstance.get(
    `/api/v1/users/me/stampbooks/${stampBookId}`,
  );
  return res.data.data;
};
