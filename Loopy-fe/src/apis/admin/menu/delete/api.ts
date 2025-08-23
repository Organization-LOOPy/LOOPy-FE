import axiosInstance from "../../../axios";
import type { DeleteMenuResponse } from "./type";

export const deleteMenu = async (menuId: number): Promise<DeleteMenuResponse> => {
  const { data } = await axiosInstance.delete<DeleteMenuResponse>(
    `/api/v1/owner/cafes/menus/${menuId}`
  );
  return data;
};
