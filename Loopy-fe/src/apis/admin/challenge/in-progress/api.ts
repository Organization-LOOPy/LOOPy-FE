import axiosInstance from '../../../axios';
import type { InProgressChallengesResponse } from './type';

export const getInProgressChallenges = async (cafeId: number) => {
  const { data } = await axiosInstance.get<InProgressChallengesResponse>(
    `/api/v1/owner/cafes/${cafeId}/challenges/in-progress`,
  );
  return data;
};
