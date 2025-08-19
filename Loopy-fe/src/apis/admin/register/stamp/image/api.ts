import axiosInstance from "../../../../axios";
import type {
  UploadStampImageResponse,
  GetStampImagesResponse,
  DeleteStampImageResponse,
  StampImage,
} from "./type";

export async function uploadStampImage(file: File): Promise<StampImage> {
  const formData = new FormData();
  formData.append("images", file);

  const { data } = await axiosInstance.post<UploadStampImageResponse>(
    "/api/v1/owner/stamps/stamp-images",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data.data[0];
}

export async function getStampImages(): Promise<StampImage[]> {
  const { data } = await axiosInstance.get<GetStampImagesResponse>(
    "/api/v1/owner/stamps/stamp-images"
  );
  return data.data;
}

export async function deleteStampImage(imageId: number): Promise<boolean> {
  const { data } = await axiosInstance.delete<DeleteStampImageResponse>(
    `/api/v1/admin/stamps/stamp-images/${imageId}`
  );
  return data.success;
}
