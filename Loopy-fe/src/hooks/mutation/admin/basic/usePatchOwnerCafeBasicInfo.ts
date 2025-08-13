import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchOwnerCafeBasicInfo } from "../../../../apis/admin/setting/basic/patch/api";
import type { PatchOwnerCafeBasicInfoRequest, OwnerCafeDetailResponse } from "../../../../apis/admin/setting/basic/patch/type";

export const OWNER_CAFE_DETAIL_KEY = ["ownerCafe", "myCafe"];

export const usePatchOwnerCafeBasicInfo = (
  onSuccess?: (data: OwnerCafeDetailResponse) => void,
  onError?: (err: unknown) => void
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: PatchOwnerCafeBasicInfoRequest) =>
      patchOwnerCafeBasicInfo(payload),
    onSuccess: async (data) => {
      await qc.invalidateQueries({ queryKey: OWNER_CAFE_DETAIL_KEY });
      onSuccess?.(data);
    },
    onError,
  });
};
