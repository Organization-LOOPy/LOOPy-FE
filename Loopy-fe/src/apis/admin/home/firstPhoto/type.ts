export interface CafePhoto {
  id: number;
  cafeId: number;
  photoUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface FirstCafePhotoResponse {
  photo: CafePhoto;
}
