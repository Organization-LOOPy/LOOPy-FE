import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchMyReviews } from "../../../apis/my/review/api";
import type { ReviewListResponse } from "../../../apis/my/review/type";

export const useMyReviews = () => {
  return useInfiniteQuery<ReviewListResponse>({
    queryKey: ["myReviews"],
    queryFn: ({ pageParam = 1 }) =>
      fetchMyReviews({ page: pageParam as number, limit: 10 }),
    initialPageParam: 1, 
    getNextPageParam: (lastPage) => {
      const { page, limit, total } = lastPage.pagination;
      const maxPage = Math.ceil(total / limit);
      return page < maxPage ? page + 1 : undefined;
    },
  });
};
