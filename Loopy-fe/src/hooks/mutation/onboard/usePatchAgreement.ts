import { useMutation } from "@tanstack/react-query";
import { patchAgreements } from "../../../apis/agree/api";
import type { PatchAgreementRequest, PatchAgreementResponse } from "../../../apis/agree/type";

export const usePatchAgreement = () => {
  return useMutation<PatchAgreementResponse, Error, PatchAgreementRequest>({
    mutationFn: patchAgreements,
  });
};