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

      queryClient.setQueryData(['cafeDetail', id], (old: any) =>
        old ? { ...old, bookmark: { ...old.bookmark, isBookmarked: newState } } : old
      );

      queryClient.setQueryData(['mapCafeDetail', id], (old: any) =>
        old ? { ...old, isBookmarked: newState } : old
      );

      queryClient.setQueriesData({ queryKey: ['cafeList'] }, (old: any) => {
        if (!old?.success?.data) return old;
        return {
          ...old,
          success: {
            ...old.success,
            data: old.success.data.map((cafe: any) =>
              cafe.id === id ? { ...cafe, isBookmarked: newState } : cafe
            ),
          },
        };
      });

      queryClient.setQueryData(['bookmarkedCafes'], (old: any) => {
        if (!Array.isArray(old)) return old;
        return newState
          ? [...old, { id }]
          : old.filter((cafe: any) => cafe.id !== id);
      });
    },
  });
};
