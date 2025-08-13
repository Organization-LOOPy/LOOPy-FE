import { useQuery } from '@tanstack/react-query';
import { fetchBookmarkedCafes } from '../../../apis/bookmark/api';

export const useBookMark = () => {
  return useQuery({
    queryKey: ['bookmarks'],
    queryFn: fetchBookmarkedCafes,
    staleTime: 1000 * 60 * 2,
  });
};
