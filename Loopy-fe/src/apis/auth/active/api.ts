import axiosInstance from "../../axios";
import type { UserStatusResponse } from "./type";

export const patchUserInactive = async (): Promise<UserStatusResponse> => {
  const res = await axiosInstance.patch<UserStatusResponse>(
    "/api/v1/users/me/inactive"
  );
  return res.data;
};

export const patchUserActivate = async (): Promise<UserStatusResponse> => {
  const res = await axiosInstance.patch<UserStatusResponse>(
    "/api/v1/users/me/activate"
  );
  return res.data;
};
