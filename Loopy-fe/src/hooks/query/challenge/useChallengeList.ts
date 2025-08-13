import { useQuery } from '@tanstack/react-query';
import { fetchChallengeList } from '../../../apis/challenge/challengeList/api';
import type { ChallengeListItem } from '../../../apis/challenge/challengeList/type';
import type { ChallengeListResponse } from '../../../apis/challenge/challengeList/type'; // response 타입이 이거면

const useChallengeList = () => {
  return useQuery<ChallengeListResponse, Error>({
    queryKey: ['challengeList'],
    queryFn: fetchChallengeList,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useAllChallengeList = () => {
  const { data, isLoading, isError } = useChallengeList();

  return {
    allChallengeList: data?.success ?? [],
    isLoading,
    isError,
  };
};

export const useParticipatingChallengeList = () => {
  const { data, isLoading, isError } = useChallengeList();

  const participatingChallengeList: ChallengeListItem[] =
    data?.success?.filter((item) => item.isParticipated) ?? [];

  return {
    participatingChallengeList,
    isLoading,
    isError,
  };
};
