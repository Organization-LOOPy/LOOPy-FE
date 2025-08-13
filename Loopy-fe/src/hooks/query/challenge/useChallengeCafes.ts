import { useQuery } from '@tanstack/react-query';
import { fetchChallengeCafes } from '../../../apis/challenge/challengeCafes/api';

export const useChallengeCafes = (challengeId: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['challengeCafes', challengeId],
    queryFn: () => fetchChallengeCafes(challengeId),
    enabled: !!challengeId,
  });

  return {
    cafes: data?.success ?? [],
    isLoading,
    isError,
  };
};
