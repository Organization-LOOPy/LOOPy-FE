export interface AdminCafeResponse {
  message: string;
  data: AdminCafeData;
}

export interface AdminCafeData {
  userId: number;
  cafeId: number | null;  
  cafeStatus: "inactive" | "active" | null;
}
