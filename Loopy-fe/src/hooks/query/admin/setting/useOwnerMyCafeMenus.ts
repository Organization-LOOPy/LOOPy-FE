import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getOwnerMyCafeMenus } from "../../../../apis/admin/setting/menu/get/api";
import type { OwnerMenuSummary } from "../../../../apis/admin/setting/menu/get/type";

export const OWNER_MY_CAFE_MENUS_KEY = ["owner", "myCafe", "menus"];

export function useOwnerMyCafeMenus(
  options?: UseQueryOptions<OwnerMenuSummary[], Error>
) {
  return useQuery<OwnerMenuSummary[], Error>({
    queryKey: OWNER_MY_CAFE_MENUS_KEY,
    queryFn: getOwnerMyCafeMenus,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    ...options,
  });
}
