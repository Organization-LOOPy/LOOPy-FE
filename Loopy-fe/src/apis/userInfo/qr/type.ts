export interface UserQRCodeResponse {
  resultType: "SUCCESS" | "FAILURE";
  success?: {
    userId: number;
    qrCodeImage: string;
  };
  error?: unknown;
}
