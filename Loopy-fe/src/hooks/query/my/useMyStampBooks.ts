import { useQuery } from "@tanstack/react-query";
import { getMyStampBooks } from "../../../apis/my/myStampbook/api";
import type { StampBookItem } from "../../../apis/my/myStampbook/type";

export const useMyStampBooks = (
  sortBy: "mostStamped" | "shortestDeadline" = "shortestDeadline"
) => {
  return useQuery<StampBookItem[]>({
    queryKey: ["myStampBooks", sortBy],
    queryFn: () => getMyStampBooks(sortBy),
  });
};
