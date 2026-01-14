import axiosInstance from '../../../axios';
import type { AvailableChallengesResponse } from './type';

export const getAvailableChallenges = async (
  cafeId: number,
): Promise<AvailableChallengesResponse> => {
  const response = await axiosInstance.get<AvailableChallengesResponse>(
    `/api/v1/owner/cafes/${cafeId}/challenges/available`,
  );
  return response.data;
};
