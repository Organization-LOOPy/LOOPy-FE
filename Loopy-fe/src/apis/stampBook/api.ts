import axiosInstance from '../axios';
import type { StampBook, StampBookListResponse } from './type';
import { stampBookListMock } from './mock';

export const fetchStampBooks = async (
  sortBy?: 'mostStamped' | 'shortestDeadline',
): Promise<StampBook[]> => {
  try {
    const res = await axiosInstance.get<StampBookListResponse>(
      '/api/v1/users/me/stampbooks',
      {
        params: sortBy ? { sortBy } : {},
      },
    );

    if (!Array.isArray(res.data.data.items)) {
      console.warn('응답이 배열이 아님. mock 반환', res.data);
      return stampBookListMock;
    }

    return res.data.data.items;
  } catch (e) {
    console.error('API 호출 실패, mock 사용:', e);
    return stampBookListMock;
  }
};
