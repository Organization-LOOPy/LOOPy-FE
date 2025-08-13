export interface Cafe {
  id: number;
  name: string;
  address: string;
  image?: string;
}

export interface StampBook {
  id: number;
  cafe: Cafe;
  currentCount: number;
  goalCount: number;
  status: 'active' | 'completed' | 'expired';
  expiresAt: string;

  remainCount: number;
  progressRatio: number;
  progressPercent: number;
  isExpired: boolean;
  isExpiringSoon: boolean;
  daysUntilExpiration: number;
}

export interface StampBookListData {
  totalCount: number;
  sortBy: 'mostStamped' | 'shortestDeadline';
  items: StampBook[];
}

export interface StampBookListResponse {
  status: string;
  code: number;
  message: string;
  data: StampBookListData;
}
