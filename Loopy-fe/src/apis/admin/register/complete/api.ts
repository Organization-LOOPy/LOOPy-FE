import axiosInstance from "../../../axios";

export const completeCafe = async (): Promise<void> => {
  await axiosInstance.patch("/api/v1/owner/cafes/complete");
};
