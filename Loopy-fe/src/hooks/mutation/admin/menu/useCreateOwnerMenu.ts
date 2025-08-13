import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { createOwnerMenu } from "../../../../apis/admin/menu/api";
import type { CreateOwnerMenuPayload, OwnerMenu } from "../../../../apis/admin/menu/type";
import { OWNER_MY_CAFE_MENUS_KEY } from "../../../query/admin/setting/useOwnerMyCafeMenus";

export function useCreateOwnerMenu(
  options?: UseMutationOptions<OwnerMenu, Error, CreateOwnerMenuPayload>
) {
  const qc = useQueryClient();

  return useMutation<OwnerMenu, Error, CreateOwnerMenuPayload>({
    mutationFn: createOwnerMenu,
    onSuccess: async (data, variables, context) => {
      await qc.invalidateQueries({ queryKey: OWNER_MY_CAFE_MENUS_KEY });
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },
  });
}
