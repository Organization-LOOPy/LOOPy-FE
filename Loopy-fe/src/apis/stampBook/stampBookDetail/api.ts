import axiosInstance from '../../axios';
import type { StampBookDetail } from './type';
import { stampBookDetailMocks } from './mock';

export const fetchStampBookDetail = async (
  stampBookId: number,
  useMockOnError = true,
): Promise<StampBookDetail> => {
  try {
    const res = await axiosInstance.get<StampBookDetail>(
      `/api/v1/stampbooks/${stampBookId}`,
    );
    return res.data;
  } catch (error) {
    console.warn(
      `API 실패 (stampBookId=${stampBookId}), mock 데이터 사용:`,
      error,
    );
    if (useMockOnError) {
      const mock = stampBookDetailMocks.find((s) => s.id === stampBookId);
      if (mock) return mock;
      return stampBookDetailMocks[0];
    }
    throw error;
  }
};
