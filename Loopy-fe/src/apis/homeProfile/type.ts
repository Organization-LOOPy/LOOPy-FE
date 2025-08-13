export interface LoopyLevel {
  level: number;
  label: string;
}

export interface HomeInfoData {
  nickname: string;
  thisMonthStampCount: number;
  thisMonthChallengeCount: number;
  totalStampCount: number;
  totalPoint: number;
  loopyLevel: LoopyLevel;
}

export interface HomeInfoSuccessResponse {
  message: string;
  data: HomeInfoData;
}
