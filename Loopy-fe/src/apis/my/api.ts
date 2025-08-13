import axiosInstance from "../axios.ts";
import type { CurrentPointResponse, PointTransactionResponse } from "./type.ts";

export const fetchCurrentPoint = async (): Promise<CurrentPointResponse> => {
  const res = await axiosInstance.get("/api/v1/points/current");
  return res.data;
};

export const fetchPointTransactions = async (): Promise<PointTransactionResponse> => {
  const res = await axiosInstance.get("/api/v1/points/transactions");
  return res.data;
};
