import axiosInstance from "../../../axios";
import type { OwnerCafeBasic } from "./type";

export const getOwnerCafeBasic = async (): Promise<OwnerCafeBasic> => {
  const { data } = await axiosInstance.get("/api/v1/owner/cafes/myCafe/basic");
  return data;
};
