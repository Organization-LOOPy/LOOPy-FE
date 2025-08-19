export interface CafePhoto {
  id: number;
  photoUrl: string;
}

export interface UploadCafePhotosResponse {
  message: string;  
  data: CafePhoto[];
}

export interface DeleteCafePhotoSuccess {
  message: string;
  photoId: number;
}

export interface DeleteCafePhotoResponse {
  resultType: "SUCCESS" | "FAIL";
  error: unknown | null;
  success: DeleteCafePhotoSuccess | null;
}

export const getCafePhotoUrl = (p?: CafePhoto | null) => p?.photoUrl ?? "";