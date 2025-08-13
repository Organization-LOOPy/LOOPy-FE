export interface ExpiringStampBookResponse {
  id: number;
  cafe: {
    id: number;
    name: string;
    address: string;
  };
  expiresAt: string;
  status: "ACTIVE" | "INACTIVE";
}
