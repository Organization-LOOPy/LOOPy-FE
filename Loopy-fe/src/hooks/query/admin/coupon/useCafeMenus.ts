import { useQuery } from "@tanstack/react-query";
import { getCafeMenus } from "../../../../apis/admin/coupon/menu/api";
import type { CafeMenuSummary } from "../../../../apis/admin/coupon/menu/type";

export const useCafeMenus = () => {
  return useQuery<CafeMenuSummary[]>({
    queryKey: ["owner", "cafeMenus"],
    queryFn: async () => {
      const res = await getCafeMenus();
      return res.data; 
    },
  });
};
