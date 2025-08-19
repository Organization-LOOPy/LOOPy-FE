export interface CafeMenuSummary {
  id: number;
  name: string;
  price: number;
  photoUrl: string;
  isRepresentative: boolean;
  description: string;
}

export interface GetCafeMenusResponse {
  message: string;
  data: CafeMenuSummary[];
}
