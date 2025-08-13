import { useQuery } from '@tanstack/react-query';
import { fetchChallengeDetail } from '../../../apis/challenge/challengeDetail/api';

export const useChallengeDetail = (id: number) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['challengeDetail', id],
    queryFn: () => fetchChallengeDetail(id),
    enabled: !!id, // id가 있을 때만 실행
  });

  return {
    challengeDetail: data?.success ?? null,
    isLoading,
    isError,
  };
};
