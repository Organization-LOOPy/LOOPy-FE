import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyReviews } from "../../../apis/my/review/api";
import type { ReviewListSuccess } from "../../../apis/my/review/type";

export const useMyReviews = () => {
  return useInfiniteQuery<ReviewListSuccess>({
    queryKey: ["myReviews"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      fetchMyReviews({ page: pageParam as number, limit: 10 }),

    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage.pagination;

      const hasNextPage = page * limit < total;

      return hasNextPage ? page + 1 : undefined;
    },
  });
};
