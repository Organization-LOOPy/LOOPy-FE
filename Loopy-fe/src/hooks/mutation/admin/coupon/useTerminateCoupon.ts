import { useMutation, useQueryClient } from "@tanstack/react-query";
import { terminateOwnerCoupon } from "../../../../apis/admin/coupon/terminate/api";

export const useTerminateOwnerCoupon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: terminateOwnerCoupon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ownerCoupons"] });
    },
  });
};
