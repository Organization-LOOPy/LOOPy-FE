import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getExpiringStampBooks } from "../../../apis/my/expiring/api";
import type { ExpiringStampBookItem } from "../../../apis/my/expiring/type";

export const MY_EXPIRING_STAMP_QUERY_KEY = ["myExpiringStamp"] as const;

interface Options {
  queryOptions?: UseQueryOptions<
    ExpiringStampBookItem[],
    unknown,
    ExpiringStampBookItem[],
    typeof MY_EXPIRING_STAMP_QUERY_KEY
  >;
}

export function useMyExpiringStamp({ queryOptions }: Options = {}) {
  return useQuery({
    queryKey: MY_EXPIRING_STAMP_QUERY_KEY,
    queryFn: getExpiringStampBooks,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
}
