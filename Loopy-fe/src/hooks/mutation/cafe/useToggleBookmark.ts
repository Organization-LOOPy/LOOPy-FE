import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark as toggleBookmarkApi } from '../../../apis/bookmark/api';

interface ToggleBookmarkVars {
  cafeId: string | number;
  newState: boolean;
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, ToggleBookmarkVars>({
    mutationFn: async ({ cafeId }) => {
      await toggleBookmarkApi(String(cafeId));
    },
    onSuccess: (_, { cafeId, newState }) => {
      const id = Number(cafeId);

      // 상세 페이지 캐시 반영
      queryClient.setQueryData(['cafeDetail', id], (old: any) =>
        old ? { ...old, bookmark: { ...old.bookmark, isBookmarked: newState } } : old
      );

      // 지도에서 상세 정보 캐시 반영
      queryClient.setQueryData(['mapCafeDetail', id], (old: any) =>
        old ? { ...old, isBookmarked: newState } : old
      );

      // 리스트나 검색 결과 캐시 반영
      queryClient.setQueriesData({ queryKey: ['map-search'] }, (old: any) => {
        if (!old?.success?.cafes) return old;
        return {
          ...old,
          success: {
            ...old.success,
            cafes: old.success.cafes.map((cafe: any) =>
              cafe.id === id ? { ...cafe, isBookmarked: newState } : cafe
            ),
          },
        };
      });

      // 북마크 목록 최신화
      queryClient.setQueryData(['bookmarkedCafes'], (old: any) => {
        if (!Array.isArray(old)) return old;
        return newState
          ? [...old, { id }]
          : old.filter((cafe: any) => cafe.id !== id);
      });
    },
  });
};
