import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchOwnerCafeBasicInfo } from "../../../../apis/admin/setting/basic/patch/api";
import type { OwnerCafeDetailResponse } from "../../../../apis/admin/setting/basic/patch/type";
import { OWNER_CAFE_BASIC_QK } from "../../../query/admin/setting/useOwnerCafeBasic";

export const usePatchOwnerCafeBasicInfo = (
  onSuccess?: (data: OwnerCafeDetailResponse) => void,
  onError?: (err: unknown) => void
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: patchOwnerCafeBasicInfo,

    onSuccess: (data) => {
      qc.setQueryData(OWNER_CAFE_BASIC_QK, data);
      onSuccess?.(data);
    },

    onError,

    onSettled: () => {
      qc.invalidateQueries({ queryKey: OWNER_CAFE_BASIC_QK });
    },
  });
};
