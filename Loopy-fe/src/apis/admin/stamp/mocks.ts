import type { ConditionType, RewardType, StampPolicyData, StampStats, PatchStampPolicyBody } from "./type";

export const mockStampPolicy: StampPolicyData = {
  id: 1,
  cafeId: 4,
  selectedImageUrl:
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=256&auto=format&fit=crop',
  conditionType: 'AMOUNT',
  drinkCount: 10,
  stampPerCount: 1,
  minAmount: 5000,
  stampPerAmount: 1,
  rewardType: 'DISCOUNT',
  discountAmount: 1000,
  menuId: 3,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function mockPatchedPolicy(body: PatchStampPolicyBody): StampPolicyData {
  // 서버 응답 필드에 맞춰 변환: stampCountDrink -> stampPerCount
  const stampPerCount =
    body.stampCountDrink ?? mockStampPolicy.stampPerCount ?? 1;

  return {
    ...mockStampPolicy,
    selectedImageUrl: body.selectedImageUrl ?? mockStampPolicy.selectedImageUrl,
    conditionType: (body.conditionType as ConditionType) ?? mockStampPolicy.conditionType,
    drinkCount: body.drinkCount ?? mockStampPolicy.drinkCount,
    minAmount: body.minAmount ?? mockStampPolicy.minAmount ?? null,
    stampPerAmount: body.stampPerAmount ?? mockStampPolicy.stampPerAmount ?? null,
    stampPerCount,
    rewardType: (body.rewardType as RewardType) ?? mockStampPolicy.rewardType,
    discountAmount: body.discountAmount ?? mockStampPolicy.discountAmount ?? null,
    menuId: body.menuId ?? mockStampPolicy.menuId ?? null,
    updatedAt: new Date().toISOString(),
  };
}

export const mockStampStats: StampStats = {
  todayStampCount: 5,
  thisWeekStampCount: 84,
  totalStampCount: 1238,
  uniqueUserCount: 0,
  rewardGivenCount: 312,
  dailyStampCounts: [],
};
