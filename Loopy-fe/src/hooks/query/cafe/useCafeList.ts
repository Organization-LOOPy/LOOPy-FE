import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { postCafeList } from '../../../apis/listSearch/api';
import type { CafeListBody, CafeListQueryParams, CafeListResponse } from '../../../apis/listSearch/type';

// queryKey 안정화용
/* const normalizeKey = (q: CafeListQueryParams, b: CafeListBody) => ({
  x: q.x,
  y: q.y,
  searchQuery: q.searchQuery || undefined,
  store: Object.keys(b.storeFilters).filter((k) => b.storeFilters[k]).sort(),
  takeOut: Object.keys(b.takeOutFilters).filter((k) => b.takeOutFilters[k]).sort(),
  menu: Object.keys(b.menuFilters).filter((k) => b.menuFilters[k]).sort(),
  r1: b.addressInfo?.region_1depth_name ?? '',
  r2: b.addressInfo?.region_2depth_name ?? '',
  r3: b.addressInfo?.region_3depth_name ?? '',
}); */

export function useCafeListInfiniteQuery(
  query: CafeListQueryParams,
  body: CafeListBody,
  options?: {
    enabled?: boolean;
    mockOnError?: () => CafeListResponse;
  }
) {
  return useInfiniteQuery<CafeListResponse, Error, InfiniteData<CafeListResponse>, any, number | undefined>({
    queryKey: ['list-search-infinite', query, body],
    queryFn: async ({ pageParam }) =>
      postCafeList({ ...query, cursor: pageParam }, body, { mockOnError: options?.mockOnError }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.success?.nextCursor ?? undefined,
    enabled: options?.enabled ?? true,
  });
}