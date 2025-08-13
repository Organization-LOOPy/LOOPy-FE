export interface CafeSummary {
  id: number;
  name: string;
  address: string;
  image: string;
}

export interface ExpiringStampBookItem {
  id: number;
  cafe: CafeSummary;
  round: number;
  rewardDetail: string;      
  goalCount: number;     
  currentCount: number;
  progressPercent: number;
  status: "active" | "inactive" | string;
  isCompleted: boolean;
  expiresAt: string;           
  daysUntilExpiration: number; 
  isExpiringSoon: boolean; 
  previewRewardText: string;   
  canExtend: boolean; 
}

export interface ApiSuccessEnvelope {
  status: "SUCCESS";
  code: 200;
  message: string;
  data: ExpiringStampBookItem[];
}

export interface ApiResultEnvelope {
  resultType: "SUCCESS" | "FAIL";
  success?: string | null;
  error?: unknown;
  data?: ExpiringStampBookItem[]; 
}

export interface ApiErrorEnvelope {
  errorCode: string;
  reason: string;
  data: null;
}

export type GetExpiringStampBooksResponse =
  | ApiSuccessEnvelope
  | ApiResultEnvelope
  | ApiErrorEnvelope;

export type ExpiringStampBookResponse = ExpiringStampBookItem;
