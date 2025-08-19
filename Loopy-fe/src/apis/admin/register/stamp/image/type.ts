export interface UploadStampImageResponse {
  message: string;
  data: StampImage[];
}

export interface StampImage {
  id: number;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetStampImagesResponse {
  message: string;
  data: StampImage[];
}

export interface DeleteStampImageResponse {
  message: string;
  success: boolean;
}
