import { useQuery } from '@tanstack/react-query';
import { fetchStampBookDetail } from '../../../apis/stampBook/stampBookDetail/api';
import type { StampBookDetail } from '../../../apis/stampBook/stampBookDetail/type';

export const useStampBookDetail = (stampBookId: number) => {
  return useQuery<StampBookDetail>({
    queryKey: ['stampBookDetail', stampBookId],
    queryFn: () => fetchStampBookDetail(stampBookId),
    enabled: !!stampBookId,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
