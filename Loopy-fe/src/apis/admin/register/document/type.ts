export interface CreateOwnerCafeResponse {
  resultType: "SUCCESS" | "FAIL";
  error: string | null;
  success?: {
    cafeId: number;
  };
}
