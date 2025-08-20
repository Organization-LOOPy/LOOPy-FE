// utils/formatCouponTitle.ts
import type { Coupon } from '../apis/cafeDetail/type';
import { couponTypeMeta } from './couponTypeMeta';

export function formatCouponTitle(coupon: Coupon): string {
  const meta = couponTypeMeta[coupon.discountType];

  switch (coupon.discountType) {
    case 'DISCOUNT':
      // 메뉴 + 금액 + "할인 쿠폰"
      return coupon.applicableMenu
        ? `${coupon.applicableMenu.name} ${coupon.discountValue}원 ${meta.label}`
        : `${coupon.discountValue}원 ${meta.label}`;

    case 'SIZE_UP':
      // 그냥 "사이즈 업 쿠폰"
      return meta.label;

    case 'FREE_ITEM':
      // 메뉴 + "무료 음료 쿠폰"
      return coupon.applicableMenu
        ? `${coupon.applicableMenu.name} ${meta.label}`
        : `${meta.label}`;

    default:
      return '쿠폰';
  }
}
