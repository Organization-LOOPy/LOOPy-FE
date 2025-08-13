export type ConditionType = 'COUNT' | 'AMOUNT';
export type RewardType = 'FREE_DRINK' | 'DISCOUNT' | 'SIZE_UP';

export interface StampPolicyData {
  id: number;
  cafeId: number;
  selectedImageUrl: string;
  conditionType: ConditionType;
  // COUNT
  drinkCount: number | null;
  stampPerCount: number | null;
  // AMOUNT
  minAmount?: number | null;
  stampPerAmount?: number | null;

  rewardType: RewardType;
  discountAmount: number | null;
  menuId: number | null;

  createdAt: string;
  updatedAt: string;
}

export interface StampPolicyResponse {
  message: string;
  data: StampPolicyData;
}

export interface StampStats {
  todayStampCount: number;
  thisWeekStampCount: number;
  totalStampCount: number;
  uniqueUserCount: number;
  rewardGivenCount: number;
  dailyStampCounts: { date: string; count: number }[];
}

export interface StampStatsResponse {
  message: string;
  data: StampStats;
}

export type PatchStampPolicyBody = Partial<{
  selectedImageUrl: string;
  conditionType: ConditionType;
  drinkCount: number;
  stampCountDrink: number; // 서버 바디 명세
  rewardType: RewardType;
  menuId: number;
  minAmount: number;
  stampPerAmount: number;
  discountAmount: number;
}>;

export interface PatchResponse {
  message: string;
  data: StampPolicyData;
}
