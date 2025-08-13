import { useQuery } from '@tanstack/react-query';
import { getCafeDetail } from '../../../apis/cafeDetail/api';
import { cafeDetailMock } from '../../../mock/cafeDetailMock';
import type { CafeDetailSuccess } from '../../../apis/cafeDetail/type';

export function useCafeDetailQuery(
  cafeId: number | null,
  enabled = true
) {
  return useQuery<CafeDetailSuccess>({
    queryKey: ['cafe-detail', String(cafeId ?? '')],
    enabled: enabled && !!cafeId,
    staleTime: 30_000,
    queryFn: async () => {
      if (!cafeId) throw new Error('no cafeId');
      try {
        return await getCafeDetail(String(cafeId));  
      } catch (e) {
        console.warn('getCafeDetail failed; use mock', e);
        return cafeDetailMock;
      }
    },
  });
}
