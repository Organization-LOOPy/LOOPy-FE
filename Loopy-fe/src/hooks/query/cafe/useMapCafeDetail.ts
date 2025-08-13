import { useQuery } from "@tanstack/react-query";
import { getMapCafeDetail, type MapCafeDetail } from "../../../apis/mapCafeDetail/api";

const EMPTY: MapCafeDetail = { address: '', images: [], keywords: [] };

type Opt = {
  enabled?: boolean;
  coord?: { x: number; y: number };
  fallback?: () => MapCafeDetail; // 서버 실패/오프라인 시 대체
};

export function useMapCafeDetailQuery(cafeId: number | null, opt?: Opt) {
  return useQuery({
    queryKey: ['mapCafeDetail', cafeId, opt?.coord?.x, opt?.coord?.y],
    queryFn: async () => {
      try {
        if (!cafeId) return EMPTY;
        return await getMapCafeDetail(cafeId, opt?.coord);
      } catch {
        return opt?.fallback?.() ?? EMPTY;
      }
    },
    enabled: (opt?.enabled ?? true) && !!cafeId,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 0,
    refetchOnWindowFocus: false,
    placeholderData: (prev) => prev, // 로딩 중에도 이전 값 유지
  });
}