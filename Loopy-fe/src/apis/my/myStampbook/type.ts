export interface CafeSummary {
  id: number;
  name: string;
  address: string;
  image: string;
}

export interface StampBookItem {
  id: number;
  cafe: CafeSummary;
  round: number;                
  goalCount: number;        
  currentCount: number;     
  expiresAt: string;    
  isExpired: boolean;   
  isSleeping: boolean;     
  sleepingReason: string | null; 
  sleepingReasonType: string | null;
  rewardDetail: string | null;  
  previewRewardText: string | null; 
  progressRate: number;       
  dayUntilExpiration: number;    
}

export interface StampBookListResponse {
  status: "SUCCESS";
  code: number;
  message: string;
  data: {
    totalCount: number;
    sortBy: "mostStamped" | "shortestDeadline";
    items: StampBookItem[];
  };
}
