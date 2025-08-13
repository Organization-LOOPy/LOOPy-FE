import { useQuery } from '@tanstack/react-query';
import { getInProgressChallenges } from '../../../../apis/admin/challenge/in-progress/api';
import type { InProgressChallengesResponse } from '../../../../apis/admin/challenge/in-progress/type';

export const useInProgressChallenges = (cafeId: number) => {
  return useQuery<InProgressChallengesResponse>({
    queryKey: ['inProgressChallenges', cafeId],
    queryFn: () => getInProgressChallenges(cafeId),
    enabled: !!cafeId,
  });
};
