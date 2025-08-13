import { useQuery } from '@tanstack/react-query';
import { getPastChallenges } from '../../../../apis/admin/challenge/past/api';
import type { PastChallengesResponse } from '../../../../apis/admin/challenge/past/type';

export const usePastChallenges = (cafeId: number) => {
  return useQuery<PastChallengesResponse>({
    queryKey: ['pastChallenges', cafeId],
    queryFn: () => getPastChallenges(cafeId),
    enabled: !!cafeId,
  });
};
