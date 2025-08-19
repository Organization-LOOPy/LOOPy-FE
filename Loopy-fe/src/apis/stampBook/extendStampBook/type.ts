export interface ExtendStampBookResponse {
  status: 'SUCCESS' | 'FAIL';
  code: number;
  message: string;
  data: {
    stampBookId: number;
    expiresAt: string;
    extendedAt: string;
  };
}
