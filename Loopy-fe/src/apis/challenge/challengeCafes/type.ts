export interface ChallengeCafe {
  cafeId: number;
  name: string;
  address: string;
  region: string;
  distance: number;
}

export interface ChallengeCafeResponse {
  resultType: string;
  error: string | null;
  success: ChallengeCafe[];
}
