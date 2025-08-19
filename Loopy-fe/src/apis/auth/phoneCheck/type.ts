export interface DummyPhoneResponse {
  userId: number;
  phoneNumber: string;
  isDummy: boolean | null;
  message?: string; 
  errorCode?: string; 
  reason?: string; 
  data?: unknown;   
}
