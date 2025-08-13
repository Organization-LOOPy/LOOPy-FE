// src/hooks/useCafeList.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { postCafeList } from '../../../apis/listSearch/api';
import type { CafeListBody, CafeListQueryParams, CafeListResponse } from '../../../apis/listSearch/type';

// queryKey 안정화용
const normalizeKey = (q: CafeListQueryParams, b: CafeListBody) => ({
  x: q.x,
  y: q.y,
  searchQuery: q.searchQuery || undefined,
  cursor: q.cursor ?? undefined,
  store: Object.keys(b.storeFilter).filter((k) => b.storeFilter[k]).sort(),
  takeOut: Object.keys(b.takeOutFilter).filter((k) => b.takeOutFilter[k]).sort(),
  menu: Object.keys(b.menuFilter).filter((k) => b.menuFilter[k]).sort(),
  r1: b.addressInfo?.region_1depth_name ?? '',
  r2: b.addressInfo?.region_2depth_name ?? '',
  r3: b.addressInfo?.region_3depth_name ?? '',
});

export function useCafeListQuery(
  query: CafeListQueryParams,
  body: CafeListBody,
  options?: {
    enabled?: boolean;
    /** 서버 연결 실패 시 사용할 목데이터 주입 */
    mockOnError?: () => CafeListResponse;
  }
) {
  return useQuery<CafeListResponse>({
    queryKey: ['list-search', normalizeKey(query, body)],
    queryFn: async () => postCafeList(query, body, { mockOnError: options?.mockOnError }),
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000,
  });
}
