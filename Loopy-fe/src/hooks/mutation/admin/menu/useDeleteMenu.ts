import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMenu } from "../../../../apis/admin/menu/delete/api";
import type { DeleteMenuResponse } from "../../../../apis/admin/menu/delete/type";

export const useDeleteMenu = (
  onSuccess?: (data: DeleteMenuResponse) => void,
  onError?: (e: unknown) => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["owner", "cafes", "menus", "delete"],
    mutationFn: (menuId: number) => deleteMenu(menuId),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["owner", "cafes", "menus"] });
      onSuccess?.(data);
    },
    onError,
  });
};
