import axiosInstance from '../../../axios';
import type { ChallengeDetailResponse } from './type';

export const getChallengeDetail = async (
  cafeId: number,
  challengeId: number,
): Promise<ChallengeDetailResponse> => {
  const response = await axiosInstance.get<ChallengeDetailResponse>(
    `/api/v1/owner/cafes/${cafeId}/challenges/${challengeId}`,
  );
  return response.data;
};
