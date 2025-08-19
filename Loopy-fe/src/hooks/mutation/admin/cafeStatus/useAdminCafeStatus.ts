import { useQuery } from "@tanstack/react-query";
import { fetchAdminCafe } from "../../../../apis/admin/cafeStatus/api";
import type { AdminCafeResponse } from "../../../../apis/admin/cafeStatus/type";

export const useAdminCafe = () => {
  return useQuery<AdminCafeResponse>({
    queryKey: ["adminCafe"],
    queryFn: fetchAdminCafe,
  });
};
