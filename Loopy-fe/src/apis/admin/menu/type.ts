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

export interface OwnerMenu {
  id: number;
  cafeId: number;
  name: string;
  price: number;
  description: string;
  isSoldOut: boolean;
  isRepresentative: boolean;
  photoUrl: string;
  createdAt: string;
  updatedAt: string; 
}

export interface CreateOwnerMenuPayload {
  name: string;
  price: number;
  description?: string;
  isRepresentative?: boolean;
  menuImage?: File | null; 
}

export interface CreateOwnerMenuResponse {
  message: string; 
  data: OwnerMenu;
}
