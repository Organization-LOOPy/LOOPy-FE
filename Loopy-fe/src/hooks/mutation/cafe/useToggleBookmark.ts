import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBookmarkApi, deleteBookmarkApi } from '../../../apis/bookmark/api';

interface ToggleBookmarkVars {
  cafeId: string | number;
  newState: boolean;
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, ToggleBookmarkVars>({
    mutationFn: async ({ cafeId, newState }) => {
      if (newState) {
        await createBookmarkApi(String(cafeId));
      } else {
        await deleteBookmarkApi(String(cafeId));
      }
    },
    // 👉 낙관적 업데이트
    onMutate: async ({ cafeId, newState }) => {
      const id = String(cafeId);

      // 1. cafeDetail 캐시 미리 반영
      queryClient.setQueryData(['cafeDetail', id], (old: any) =>
        old ? { ...old, bookmark: { ...old.bookmark, isBookmarked: newState } } : old
      );

      // 2. mapCafeDetail 캐시 미리 반영
      queryClient.setQueryData(['mapCafeDetail', id], (old: any) =>
        old ? { ...old, isBookmarked: newState } : old
      );

      // 3. 리스트 캐시 미리 반영
      queryClient.setQueriesData({ queryKey: ['cafeList'] }, (old: any) => {
        if (!old?.success?.data) return old;
        return {
          ...old,
          success: {
            ...old.success,
            data: old.success.data.map((cafe: any) =>
              cafe.id === Number(cafeId) ? { ...cafe, isBookmarked: newState } : cafe
            ),
          },
        };
      });

      // 4. 북마크 목록 미리 반영
      queryClient.setQueryData(['bookmarkedCafes'], (old: any) => {
        if (!Array.isArray(old)) return old;
        if (newState) {
          return [...old, { id: Number(cafeId) }];
        } else {
          return old.filter((cafe: any) => cafe.id !== Number(cafeId));
        }
      });
    },
    onSettled: () => {
      // 서버 반영 이후 동기화
      queryClient.invalidateQueries({ queryKey: ['bookmarkedCafes'] });
    },
  });
};
