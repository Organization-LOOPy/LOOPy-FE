import axiosInstance from "../../../../axios";
import type { PatchOwnerCafeBasicInfoRequest, OwnerCafeDetailResponse } from "./type";

export const patchOwnerCafeBasicInfo = async (
  payload: PatchOwnerCafeBasicInfoRequest
): Promise<OwnerCafeDetailResponse> => {
  const { data } = await axiosInstance.patch<OwnerCafeDetailResponse>(
    "/api/v1/owner/cafes/myCafe",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  return data;
};
