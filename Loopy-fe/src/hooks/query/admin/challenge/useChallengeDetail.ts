import { useQuery } from '@tanstack/react-query';
import { getChallengeDetail } from '../../../../apis/admin/challenge/detail/api';
import type { ChallengeDetailResponse } from '../../../../apis/admin/challenge/detail/type';

export const useChallengeDetail = (cafeId: number, challengeId: number) => {
  return useQuery<ChallengeDetailResponse>({
    queryKey: ['challengeDetail', cafeId, challengeId],
    queryFn: () => getChallengeDetail(cafeId, challengeId),
    enabled: !!cafeId && !!challengeId,
  });
};
