import axiosInstance from '../axios';
import { stampBookListMock } from '../stampBook/mock';
import type { ExpiringStampBookResponse } from './type';

export const fetchExpiringStampBooks = async (): Promise<
  ExpiringStampBookResponse[]
> => {
  try {
    const res = await axiosInstance.get<ExpiringStampBookResponse[]>(
      '/api/v1/users/me/stampbooks/expiring',
    );
    return res.data;
  } catch (err) {
    console.warn('API 오류로 mock 사용', err);

    return stampBookListMock.map((mock) => ({
      id: mock.id,
      cafe: {
        id: mock.cafe.id,
        name: mock.cafe.name,
        address: mock.cafe.address,
      },
      expiresAt: mock.expiresAt,
      status: mock.status.toUpperCase() as 'ACTIVE' | 'INACTIVE',
    }));
  }
};
