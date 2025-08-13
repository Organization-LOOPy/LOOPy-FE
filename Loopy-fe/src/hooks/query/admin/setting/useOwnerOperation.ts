import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getOwnerMyCafeOperation } from "../../../../apis/admin/setting/operation/api";
import type { OwnerCafeOperationInfo } from "../../../../apis/admin/setting/operation/type";

export const OWNER_MY_CAFE_OPERATION_KEY = ["owner", "myCafe", "operation"];

export function useOwnerMyCafeOperation(
  options?: UseQueryOptions<OwnerCafeOperationInfo, Error>
) {
  return useQuery<OwnerCafeOperationInfo, Error>({
    queryKey: OWNER_MY_CAFE_OPERATION_KEY,
    queryFn: getOwnerMyCafeOperation,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    ...options,
  });
}
