export interface StampBook {
  stampBookId: number;
  currentCount: number;
  goalCount: number;
  progressRate: number;
  expiresAt: string;
  daysLeft: number;
}

export interface StampInfo {
  totalCount: number;
  currentStampBook: StampBook | null;
}

export interface PointInfo {
  total: number;
}

export interface UserSearchResponseData {
  userId: number;
  nickname: string;
  phone: string;
  stamp: StampInfo;
  point: PointInfo;
  actionToken: string;
}

export interface ApiResponse<T> {
  resultType: string;
  error: any | null;
  success: T | null;
}
