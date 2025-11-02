import { useQuery } from '@tanstack/react-query';
import { getInsight } from '../../../../apis/admin/home/insight/api';
import type { InsightResponse } from '../../../../apis/admin/home/insight/type';

export const useInsight = (cafeId?: number, period?: string) => {
  return useQuery<InsightResponse>({
    queryKey: ['insight', cafeId, period],
    queryFn: () => getInsight(cafeId as number, period),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
