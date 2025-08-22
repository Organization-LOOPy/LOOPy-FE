import { useMutation } from "@tanstack/react-query";
import { completeCafe } from "../../../../apis/admin/register/complete/api";

export const useCompleteCafe = () => {
  return useMutation({
    mutationKey: ["completeCafe"],
    mutationFn: completeCafe,
  });
};
