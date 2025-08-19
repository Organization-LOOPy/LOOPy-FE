import { useMutation, useQueryClient } from '@tanstack/react-query';
import { joinChallenge } from '../../../apis/challenge/challengeJoin/api';

export const useJoinChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      challengeId,
      cafeId,
    }: {
      challengeId: number;
      cafeId: number;
    }) => joinChallenge(challengeId, cafeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['challengeList'] });
      queryClient.invalidateQueries({ queryKey: ['challengeDetail'] });
    },
    onError: (error) => {
      console.error('챌린지 참여 실패:', error);
    },
  });
};
