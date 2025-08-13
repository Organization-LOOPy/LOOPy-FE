import { useQuery } from "@tanstack/react-query";
import { getOwnerCafeBasic } from "../../../../apis/admin/setting/basic/api";

export const OWNER_CAFE_BASIC_QK = ["ownerCafeBasic"] as const;

export const useOwnerCafeBasic = () => {
  return useQuery({
    queryKey: OWNER_CAFE_BASIC_QK,
    queryFn: getOwnerCafeBasic,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};
