import { useMutation } from "@tanstack/react-query";
import { createStampPolicy } from "../../../../apis/admin/register/stamp/api";
import type { CreateStampPolicyBody } from "../../../../apis/admin/register/stamp/type";

export function useCreateStampPolicy() {
  return useMutation({
    mutationFn: (body: CreateStampPolicyBody) => createStampPolicy(body),
  });
}
