import axiosInstance from "../../axios";
import type {
  CafePhoto,
  UploadCafePhotosResponse,
  DeleteCafePhotoResponse,
} from "./type";

export async function uploadCafePhotos(files: File[]): Promise<CafePhoto[]> {
  const fd = new FormData();
  for (const f of files) fd.append("photos", f);
  const { data } = await axiosInstance.post<UploadCafePhotosResponse>(
    "/api/v1/owner/cafes/photos",
    fd
  );
  return data?.data ?? [];
}

export async function deleteCafePhoto(photoId: number): Promise<boolean> {
  const { data } = await axiosInstance.delete<DeleteCafePhotoResponse>(
    `/api/v1/owner/cafes/photos/${photoId}`
  );
  return data?.resultType === "SUCCESS";
}
