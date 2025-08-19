import axiosInstance from "../../axios";
import type { PreferencesResponse } from "./type";

export const fetchPreferences = async (): Promise<PreferencesResponse> => {
  const res = await axiosInstance.get<PreferencesResponse>(
    "/api/v1/users/me/preferences"
  );
  return res.data;
};
