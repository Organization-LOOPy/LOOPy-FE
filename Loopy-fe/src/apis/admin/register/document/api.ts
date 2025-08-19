import axiosInstance from "../../../axios";
import type { CreateOwnerCafeResponse } from "./type";

export const createOwnerCafe = async (): Promise<CreateOwnerCafeResponse> => {
  const { data } = await axiosInstance.post<CreateOwnerCafeResponse>(
    "/api/v1/users/owner-cafe"
  );
  return data;
};
