import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getConvertedStampbooks } from "../../../apis/my/converted/api";
import { getConvertedStampbooksMock } from "../../../apis/my/converted/mock";
import type { ConvertedStampBookGroup } from "../../../apis/my/converted/type";

export const CONVERTED_STAMPBOOKS_QUERY_KEY = ["convertedStampbooks"] as const;

interface Options {
  useMock?: boolean;
  queryOptions?: UseQueryOptions<
    ConvertedStampBookGroup[],
    unknown,
    ConvertedStampBookGroup[],
    typeof CONVERTED_STAMPBOOKS_QUERY_KEY
  >;
}

export function useConvertedStamp({ useMock = false, queryOptions }: Options = {}) {
  const fetcher = useMock ? getConvertedStampbooksMock : getConvertedStampbooks;

  return useQuery({
    queryKey: CONVERTED_STAMPBOOKS_QUERY_KEY,
    queryFn: fetcher,
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    ...queryOptions,
  });
}
