export interface Cafe {
  id: number;
  name: string;
  address: string;
  image?: string | null;
}

export interface Stamp {
  id: number;
  stampedAt: string;
  stampImageUrl: string;
  source: string;
  note?: string | null;
  latitude: number;
  longitude: number;
}

export type RewardType = 'FREE_DRINK' | 'DISCOUNT' | 'SIZE_UP';

export interface StampBookDetail {
  id: number;
  cafe: Cafe;
  round: number;
  goalCount: number;
  currentCount: number;
  stampsCount: number;
  progressPercent: number;
  status: 'active' | 'completed' | 'expired';
  isCompleted: boolean;
  rewardDetail: string;
  selectedRewardType: RewardType;
  selectedRewardMeta?: any | null;
  startedAt: string;
  lastVisitedAt: string;
  expiresAt: string;
  extendedAt?: string | null;
  expiredAt?: string | null;
  completedAt?: string | null;
  convertedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  stamps: Stamp[];
  isExpiringSoon: boolean;
  isExpired: boolean;
  daysUntilExpiration: number;
}
