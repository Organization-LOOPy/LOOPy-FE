import { useQuery } from "@tanstack/react-query";
import { getUserCoupons } from "../../../apis/my/coupon/api";
import type { UserCouponStatus } from "../../../apis/my/coupon/type";

export const useUserCoupons = (status: UserCouponStatus) => {
  return useQuery({
    queryKey: ["userCoupons", status],
    queryFn: () => getUserCoupons(status),
    staleTime: 5 * 60 * 1000,    
    gcTime: 30 * 60 * 1000,      
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};
