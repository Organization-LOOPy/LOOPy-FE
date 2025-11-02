import axiosInstance from "../../../axios";
import type { OwnerCafeBasic, OwnerMyCafeInfoResponse } from "./type";

export const getOwnerCafeBasic = async (): Promise<OwnerCafeBasic> => {
  const { data } = await axiosInstance.get("/api/v1/owner/cafes/myCafe/basic");
  return data;
};

export const getOwnerMyCafeInfo = async (): Promise<OwnerMyCafeInfoResponse> => {
  const { data } = await axiosInstance.get('/api/v1/owner/cafes/myCafe/info');
  return data.data; // 실제 cafeId 포함 객체
};