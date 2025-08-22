import { useQuery } from "@tanstack/react-query";
import { getPreferences } from "../../../../apis/my/filter/api";
import type { PreferencesResponse } from "../../../../apis/my/preferences/type";

export const usePreferencesQuery = () => {
  return useQuery<PreferencesResponse>({
    queryKey: ["preferences"],
    queryFn: getPreferences,
    staleTime: 0, 
  });
};
