import axiosInstance from '../../../axios';
import type { PastChallengesResponse } from './type';

export const getPastChallenges = async (
  cafeId: number,
): Promise<PastChallengesResponse> => {
  const response = await axiosInstance.get<PastChallengesResponse>(
    `/api/v1/owner/cafe/${cafeId}/challenges/past`,
  );
  return response.data;
};
