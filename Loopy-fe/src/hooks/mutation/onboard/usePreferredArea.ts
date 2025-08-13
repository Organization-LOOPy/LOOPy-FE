import { useMutation } from "@tanstack/react-query";
import { patchPreferredArea, patchPreferredKeywords } from "../../../apis/onboard/api";
import type { PreferredAreaRequest, PreferredAreaResponse, PreferredKeywordsRequest, PreferredKeywordsResponse } from "../../../apis/onboard/type";

export const usePatchPreferredArea = () => {
  return useMutation<PreferredAreaResponse, Error, PreferredAreaRequest>({
    mutationFn: patchPreferredArea,
  });
};

export const usePatchPreferredKeywords = () => {
  return useMutation<PreferredKeywordsResponse, Error, PreferredKeywordsRequest>({
    mutationFn: patchPreferredKeywords,
  });
};