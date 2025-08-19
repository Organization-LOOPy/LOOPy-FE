import axiosInstance from "../../axios";
import type { AdminCafeResponse } from "./type";

export const fetchAdminCafe = async (): Promise<AdminCafeResponse> => {
  const res = await axiosInstance.get<AdminCafeResponse>("/api/v1/owner/cafes/myCafe/info");
  return res.data;
};
