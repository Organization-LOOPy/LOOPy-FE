import axiosInstance from '../axios';
import type { HomeInfoSuccessResponse } from './type';
import { homeInfoMock } from './mock';

export const fetchHomeInfo = async (): Promise<HomeInfoSuccessResponse> => {
  try {
    const res = await axiosInstance.get('/api/v1/pages/home');
    return res.data as HomeInfoSuccessResponse;
  } catch (error) {
    console.error('홈 정보 API 호출 실패, mock 데이터 반환:', error);
    return homeInfoMock;
  }
};
