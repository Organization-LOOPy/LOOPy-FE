import axiosInstance from '../../axios';
import type { ChallengeListResponse } from './type';
import { mockChallengeListResponse } from './mocks';

export const fetchChallengeList = async (): Promise<ChallengeListResponse> => {
  try {
    const res =
      await axiosInstance.get<ChallengeListResponse>('api/v1/challenges');

    if (!res.data || !Array.isArray(res.data.success)) {
      console.warn(
        '챌린지 리스트 형식이 잘못되었습니다. mock 데이터로 대체합니다.',
      );
      return mockChallengeListResponse;
    }

    return res.data;
  } catch (error) {
    console.error('챌린지 리스트 요청 실패:', error);
    return mockChallengeListResponse;
  }
};
