import {
  useMutation,
  useQueryClient,
  type UseMutationResult,
} from '@tanstack/react-query';
import { joinChallenge } from '../../../../apis/admin/challenge/join/api';
import type { JoinChallengeResponse } from '../../../../apis/admin/challenge/join/type';

export const useJoinChallenge = (
  cafeId: number,
): UseMutationResult<JoinChallengeResponse, unknown, number, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<JoinChallengeResponse, unknown, number>({
    mutationFn: (challengeId: number) => joinChallenge(cafeId, challengeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['availableChallenges', cafeId],
      });
      queryClient.invalidateQueries({
        queryKey: ['inProgressChallenges', cafeId],
      });
    },
  });
};
