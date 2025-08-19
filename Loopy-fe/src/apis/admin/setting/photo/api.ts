import axiosInstance from "../../../axios";
import type { CafePhoto, GetCafePhotosResponse } from "./type.ts";

export const fetchCafePhotos = async (): Promise<CafePhoto[]> => {
  const res = await axiosInstance.get<GetCafePhotosResponse>(
    "/api/v1/owner/cafes/photos"
  );
  return res.data.data.result;
};
