import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyReviews } from "../../../apis/my/review/api";
import type { ReviewListSuccess } from "../../../apis/my/review/type";

export const useMyReviews = () => {
  return useInfiniteQuery<ReviewListSuccess>({
    queryKey: ["myReviews"],
    initialPageParam: null as number | null,
    queryFn: ({ pageParam }) =>
      fetchMyReviews({ cursor: pageParam as number | null, size: 10 }),
    getNextPageParam: (lastPage) => {
      const { nextCursor, hasNextPage } = lastPage.pagination;
      return hasNextPage ? nextCursor : undefined;
    },
  });
};
