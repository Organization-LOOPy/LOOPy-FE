import { useMutation } from "@tanstack/react-query";
import { patchPreferences } from "../../../../apis/my/preferences/patch/api";
import type { PatchPreferencesRequest, PatchPreferencesResponse } from "../../../../apis/my/preferences/patch/type";

export const usePatchPreferences = () => {
  return useMutation<PatchPreferencesResponse, Error, PatchPreferencesRequest>({
    mutationFn: patchPreferences,
  });
};
