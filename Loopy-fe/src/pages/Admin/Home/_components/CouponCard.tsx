import type { FC } from 'react';
import CouponImage from '../../../../assets/images/CouponImage.svg?react';
import type { OwnerCouponListItem } from '../../../../apis/admin/coupon/type';

interface CouponCardProps {
  coupon: OwnerCouponListItem;
}

const CouponCard: FC<CouponCardProps> = ({ coupon }) => {
  return (
    <div className="flex gap-4 items-center">
      <CouponImage className="w-18 h-18" />
      <div className="flex flex-col gap-2">
        <div className="text-black text-[1rem] font-semibold leading-none">
          {coupon.name}
        </div>
        <div className="text-[#7F7F7F] text-[0.875rem] font-normal leading-none">
          {coupon.startDate} ~ {coupon.endDate}
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
