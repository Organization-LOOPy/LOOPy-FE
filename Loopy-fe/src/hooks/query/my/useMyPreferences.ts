import { useQuery } from "@tanstack/react-query";
import { fetchPreferences } from "../../../apis/my/preferences/api";
import type { PreferencesResponse } from "../../../apis/my/preferences/type";

export const usePreferences = () => {
  return useQuery<PreferencesResponse>({
    queryKey: ["preferences"],
    queryFn: fetchPreferences,
  });
};
