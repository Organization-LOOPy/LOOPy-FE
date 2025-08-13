import type { DiscountType } from "../apis/admin/coupon/type";

export const mapUiTypeToDiscountType = (
  uiType: 'discount' | 'size' | 'freeDrink' | null
): DiscountType | null => {
  if (uiType === 'discount') return 'DISCOUNT';
  if (uiType === 'size') return 'SIZE_UP';
  if (uiType === 'freeDrink') return 'FREE_DRINK';
  return null;
};