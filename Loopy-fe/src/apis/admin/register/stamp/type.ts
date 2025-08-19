export type ConditionType = "COUNT" | "AMOUNT";
export type RewardType = "FREE_DRINK" | "DISCOUNT" | "SIZE_UP";

export interface CreateStampPolicyBody {
  selectedImageUrl: string;
  conditionType: ConditionType;
  amountThreshold?: number | null;  
  stampCountAmount?: number | null; 
  drinkCount?: number | null;       
  stampCountDrink?: number | null;  
  rewardType: RewardType;
  discountAmount?: number | null;   
  menuId?: number | null;            
}

export interface StampPolicy {
  id: number;
  cafeId: number;
  selectedImageUrl: string;
  conditionType: ConditionType;
  stampPerAmount?: number | null;
  stampCountDrink?: number | null;
  rewardType: RewardType;
  discountAmount?: number | null;
  menuId?: number | null;
}

export interface CreateStampPolicyResponse {
  message: string;
  data: StampPolicy;
}
