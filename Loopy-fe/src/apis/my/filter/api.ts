import axiosInstance from "../../axios";
import type { PreferencesResponse } from "./type";

export const getPreferences = async (): Promise<PreferencesResponse> => {
  const { data } = await axiosInstance.get<PreferencesResponse>(
    "/api/v1/users/me/preferences"
  );
  return data;
};
