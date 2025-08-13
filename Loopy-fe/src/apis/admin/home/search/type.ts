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
  resultType: string; // 성공 여부 ('SUCCESS' 등)
  error: any | null; // 에러 정보, 없으면 null
  success: T | null; // 성공 시 데이터
}
