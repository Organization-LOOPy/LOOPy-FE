export interface OwnerMenuSummary {
  id: number;
  name: string;
  price: number;
  photoUrl: string;
  isRepresentative: boolean;
  description: string;
}

export interface GetOwnerMenusResponse {
  message: string;
  data: OwnerMenuSummary[];
}
