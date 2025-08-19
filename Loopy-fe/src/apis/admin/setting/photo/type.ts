export interface CafePhoto {
  id: number;
  cafeId: number;
  photoUrl: string;
  displayOrder: number;
  createdAt: string;
}

export interface GetCafePhotosResponse {
  message: string;
  data: {
    result: CafePhoto[];
  };
}
