import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleBookmark as toggleBookmarkApi } from '../../../apis/bookmark/api';

interface ToggleBookmarkVars {
  cafeId: string | number;
  newState: boolean;
}

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cafeId }: ToggleBookmarkVars) =>
      toggleBookmarkApi(String(cafeId)),

    onSuccess: (res, { cafeId, newState }) => {
      const id = Number(cafeId); // 요청할 때 넘긴 id만 신뢰
      console.log('toggle success', {
        cafeId: id,
        bookmarkRowId: res?.success?.bookmark?.id,
        message: res?.success?.message,
      });

      // 리스트 캐시 즉시 반영
      queryClient.setQueriesData({ queryKey: ['list-search-infinite'] }, (old: any) => {
        if (!old?.pages) return old;
        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            success: {
              ...page.success,
              data: page.success.data.map((cafe: any) =>
                cafe.id === id ? { ...cafe, isBookmarked: newState } : cafe
              ),
            },
          })),
        };
      });

      // 북마크 페이지 캐시도 함께 반영
      queryClient.setQueryData(['bookmarks'], (old: any) => {
        if (!Array.isArray(old)) return old;
        return newState
          ? [...old, { id }]
          : old.filter((cafe: any) => cafe.id !== id);
      });
    },
  });
};
