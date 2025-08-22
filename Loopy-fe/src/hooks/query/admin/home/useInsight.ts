import { useQuery } from '@tanstack/react-query';
import { getInsight } from '../../../../apis/admin/home/insight/api';
import type { InsightResponse } from '../../../../apis/admin/home/insight/type';

export const useInsight = () => {
  return useQuery<InsightResponse>({
    queryKey: ['insight', 1, '2025-08'],
    queryFn: () => getInsight(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
