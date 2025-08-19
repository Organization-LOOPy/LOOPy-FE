import axiosInstance from "../../../axios";
import type { PatchPreferencesRequest, PatchPreferencesResponse } from "./type";

export const patchPreferences = async (
  payload: PatchPreferencesRequest
): Promise<PatchPreferencesResponse> => {
  const res = await axiosInstance.patch<PatchPreferencesResponse>(
    "/api/v1/users/me/preferences",
    payload
  );
  return res.data;
};
