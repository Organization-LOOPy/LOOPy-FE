export type BasicInfoForm = {
  storeName: string;
  ownerName: string;
  address: string;
  detailAddress: string;
  phone: string;
  sns: string;
  description: string;
  photos: File[];
  region1DepthName?: string;
  region2DepthName?: string;
  region3DepthName?: string;
  latitude?: number;
  longitude?: number;
  serverPhotoUrls?: string[]; 
  serverPhotoIds?: number[];
};
