import { useMutation } from "@tanstack/react-query";
import { createOwnerCafe } from "../../../../apis/admin/register/document/api";
import { useAdminCafe } from "../../../../contexts/AdminContext";

export const useCreateOwnerCafe = () => {
  const { setActiveCafeId } = useAdminCafe();

  return useMutation({
    mutationFn: createOwnerCafe,
    onSuccess: (data) => {
      if (data.resultType === "SUCCESS" && data.success?.cafeId) {
        setActiveCafeId(data.success.cafeId);
      }
    },
  });
};
