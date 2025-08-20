import axiosInstance from "../../../axios";
import type { SavePhoneRequest, SavePhoneResponse } from "./type";

export const patchSavePhone = async (
  body: SavePhoneRequest
): Promise<SavePhoneResponse> => {
  const { data } = await axiosInstance.patch<SavePhoneResponse>(
    "/api/v1/users/me/save-phone",
    body
  );
  return data;
};
