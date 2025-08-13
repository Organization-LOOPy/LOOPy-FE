import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getMapCafes } from '../apis/mapSearch/api';
import type { MapSearchParams, MapSearchResponse } from '../apis/mapSearch/type';
import { mapSearchMockDefault } from '../apis/mapSearch/mock';

type OnEmptyFallback = (ctx: {
  params: MapSearchParams;
  primary: MapSearchResponse;
}) => Promise<MapSearchResponse>;

const normalizeKey = (p: MapSearchParams) => ({
  ...p,
  zoom: String(p.zoom),
  store: p.store ? [...p.store].sort() : undefined,
  menu: p.menu ? [...p.menu].sort() : undefined,
  takeout: p.takeout ? [...p.takeout].sort() : undefined,
});

/**
 * 지도/검색 공용 훅
 * - 항상 (x,y) 전달 → 거리순 정렬 기준
 * - 실패 시: 목데이터
 * - totalCount===0: 옵션 onEmpty로 임베딩 유사 검색 폴백 가능
 */
export const useMapCafesQuery = (
  params: MapSearchParams,
  options?: {
    enabled?: boolean;
    onEmpty?: OnEmptyFallback; // 서버 임베딩 검색 API를 여기서 호출하도록 주입
    mockOnEmpty?: MapSearchResponse; // 임시 목 폴백
  }
) => {
  const key = ['map-search', normalizeKey(params)];

  return useQuery<MapSearchResponse>({
    queryKey: key,
    queryFn: async () => {
      try {
        const primary = await getMapCafes(params);

        const count = primary.success?.totalCount ?? 0;
        if (count === 0) {
          if (options?.onEmpty) {
            try {
              return await options.onEmpty({ params, primary });
            } catch (e) {
              console.warn('임베딩 폴백 호출 실패. 목데이터 사용.');
              if (options?.mockOnEmpty) return options.mockOnEmpty;
            }
          }
          if (options?.mockOnEmpty) return options.mockOnEmpty;
        }

        return primary;
      } catch (error) {
        console.error('지도/검색 조회 실패. 목데이터로 대체합니다.', error);
        return mapSearchMockDefault;
      }
    },
    enabled: options?.enabled ?? true,
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });
};
