import axiosInstance from '../../axios';
import type { ChallengeDetailResponse } from './type';

export const fetchChallengeDetail = async (
  challengeId: number,
): Promise<ChallengeDetailResponse> => {
  try {
    const response = await axiosInstance.get<ChallengeDetailResponse>(
      `/api/v1/challenges/${challengeId}`,
    );
    return response.data;
  } catch (error: any) {
    console.error('챌린지 상세 정보 요청 실패:', error);
    throw new Error('챌린지 상세 정보를 불러오는 데 실패했습니다.');
  }
};
