import axiosInstance from '../../axios';
import { mockChallengeDetailResponses } from './mocks';
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
    console.error('챌린지 상세 정보 요청 실패, 목데이터로 대체:', error);

    const found = mockChallengeDetailResponses.find(
      (item) => item.success.id === challengeId,
    );

    if (found) {
      return Promise.resolve(found);
    } else {
      throw new Error('챌린지를 찾을 수 없습니다. (목데이터에도 없음)');
    }
  }
};
