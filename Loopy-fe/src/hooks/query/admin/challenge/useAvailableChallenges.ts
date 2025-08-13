import { useQuery } from '@tanstack/react-query';
import { getAvailableChallenges } from '../../../../apis/admin/challenge/available/api';
import type { AvailableChallengesResponse } from '../../../../apis/admin/challenge/available/type';

export const useAvailableChallenges = (cafeId: number) => {
  return useQuery<AvailableChallengesResponse>({
    queryKey: ['availableChallenges', cafeId],
    queryFn: () => getAvailableChallenges(cafeId),
    enabled: !!cafeId,
  });
};
