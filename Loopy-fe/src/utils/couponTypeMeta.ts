import type { CouponDiscountType } from '../apis/cafeDetail/type';

import DiscountIcon from '/src/assets/images/coupon-discount.svg?react';
import SizeUpIcon from '/src/assets/images/coupon-sizeup.svg?react';
import FreeDrinkIcon from '/src/assets/images/coupon-free.svg?react';

export const couponTypeMeta: Record<
  CouponDiscountType,
  { label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }
> = {
  DISCOUNT: { label: '할인 쿠폰', icon: DiscountIcon },
  SIZE_UP: { label: '사이즈 업 쿠폰', icon: SizeUpIcon },
  FREE_ITEM: { label: '무료 음료 쿠폰', icon: FreeDrinkIcon },
};

