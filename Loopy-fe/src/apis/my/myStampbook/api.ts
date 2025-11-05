import axiosInstance from "../../axios";
import type { StampBookItem } from "./type";

export const getMyStampBooks = async (
  sortBy: "mostStamped" | "shortestDeadline" = "shortestDeadline"
): Promise<StampBookItem[]> => {
  const res = await axiosInstance.get("/api/v1/users/me/stampbooks", {
    params: { sortBy },
  });

  return res.data?.data?.items ?? [];
};
