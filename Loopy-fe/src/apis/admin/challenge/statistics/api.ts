import axiosInstance from '../../../axios';
import type { ChallengeStatisticsResponse } from './type';

export const getChallengeStatistics = async (
  cafeId: number,
): Promise<ChallengeStatisticsResponse> => {
  const response = await axiosInstance.get<ChallengeStatisticsResponse>(
    `/api/v1/owner/cafes/${cafeId}/challenges/statistics`,
  );
  return response.data;
};
