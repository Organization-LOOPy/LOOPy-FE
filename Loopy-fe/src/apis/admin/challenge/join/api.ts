import axiosInstance from '../../../axios';
import type { JoinChallengeResponse } from './type';

export const joinChallenge = async (
  cafeId: number,
  challengeId: number,
): Promise<JoinChallengeResponse> => {
  const response = await axiosInstance.post<JoinChallengeResponse>(
    `/api/v1/owner/cafes/${cafeId}/challenges/${challengeId}/join`,
  );
  return response.data;
};
