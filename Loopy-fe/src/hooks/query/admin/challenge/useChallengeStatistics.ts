import { useQuery } from '@tanstack/react-query';
import { getChallengeStatistics } from '../../../../apis/admin/challenge/statistics/api';
import type { ChallengeStatisticsResponse } from '../../../../apis/admin/challenge/statistics/type';

export const useChallengeStatistics = (cafeId: number) => {
  return useQuery<ChallengeStatisticsResponse>({
    queryKey: ['challengeStatistics', cafeId],
    queryFn: () => getChallengeStatistics(cafeId),
    enabled: !!cafeId,
  });
};
