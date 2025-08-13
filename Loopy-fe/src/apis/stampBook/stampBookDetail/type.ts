export interface Cafe {
  id: number;
  name: string;
  address: string;
}

export interface Stamp {
  id: number;
  stampedAt: string;
  stampImageUrl: string;
  source: string;
  note: string;
  latitude: number;
  longitude: number;
}

export interface StampBookDetail {
  id: number;
  cafe: Cafe;
  goalCount: number;
  currentCount: number;
  status: string;
  isCompleted: boolean;
  rewardDetail: string;
  startedAt: string;
  lastVisitedAt: string;
  expiresAt: string;
  extendedAt: string;
  expiredAt: string;
  completedAt: string;
  convertedAt: string;
  createdAt: string;
  updatedAt: string;
  stamps: Stamp[];
}
