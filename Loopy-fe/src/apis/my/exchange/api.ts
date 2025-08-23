import axiosInstance from "../../axios";
import type { ApiResponse, ConvertStampBookResponse } from "./type";

export const postConvertStampBook = async (
  stampBookId: number
): Promise<ApiResponse<ConvertStampBookResponse>> => {
  const { data } = await axiosInstance.post(
    `/api/v1/users/me/stampbooks/${stampBookId}/convert`
  );
  return data;
};
