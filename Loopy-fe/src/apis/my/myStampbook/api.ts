import axiosInstance from "../../axios";
import type { StampBookListResponse } from "./type";

export const getMyStampBooks = async (
  sortBy: "mostStamped" | "shortestDeadline" = "shortestDeadline"
) => {
  const res = await axiosInstance.get<StampBookListResponse>(
    "/api/v1/users/me/stampbooks",
    { params: { sortBy } }
  );

  return res.data.data.list;
};
