import axiosInstance from "../../../axios";
import type { GetCafeMenusResponse } from "./type";

export const getCafeMenus = async (): Promise<GetCafeMenusResponse> => {
  const { data } = await axiosInstance.get<GetCafeMenusResponse>(
    "/api/v1/owner/cafes/myCafe/menus"
  );
  return data;
};
