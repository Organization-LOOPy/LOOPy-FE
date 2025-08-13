import CommonCard from "../../../../../components/card/CommonCard";
import type { UserCoupon } from "../../../../../apis/my/coupon/type";
import CouponIcon from "../../../../../assets/images/Coupon.svg?react";

interface CouponCardProps {
  coupon: UserCoupon;
  isPast: boolean;
  showCafeHeader?: boolean; 
}

const fmt = (iso: string) =>
  new Date(iso).toISOString().slice(0, 10).replaceAll("-", ".");

const CouponCard = ({ coupon, isPast, showCafeHeader = true }: CouponCardProps) => {
  return (
    <CommonCard padding="p-0" className="flex items-center justify-between">
      <div className="flex items-center">
        {showCafeHeader ? (
          <>
            <img
              src={coupon.cafeImage}
              alt={coupon.cafeName}
              className="w-24 h-24 rounded-full object-cover"
            />
            <span className="ml-4 text-[0.875rem] text-[#252525] font-semibold">
              {coupon.cafeName}
            </span>
          </>
        ) : (
          <>
            <CouponIcon className="w-[3.25rem] h-[2.25rem] mr-3 shrink-0" />
            <div className="flex flex-col">
              {!!coupon.usageCondition && (
                <span className="text-[0.75rem] text-[#252525] mb-1">
                  {coupon.usageCondition}
                </span>
              )}
              <span className="text-[1rem] text-[#171718] font-semibold mb-2">
                {coupon.couponTemplate.name}
              </span>
              <span className="text-[0.875rem] text-[#7F7F7F]">
                {fmt(coupon.couponTemplate.startDate)} ~ {fmt(coupon.couponTemplate.endDate)}
              </span>
            </div>
          </>
        )}
      </div>

      {isPast && (
        <div
          className={`px-[0.75rem] py-[0.375rem] rounded-[8px] text-[0.875rem] font-semibold ${
            coupon.status === "used"
              ? "bg-[#FF0000]/10 text-[#FF0000]"
              : "bg-[#F3F3F3] text-[#7F7F7F]"
          }`}
        >
          {coupon.status === "used" ? "사용 완료" : "사용 불가"}
        </div>
      )}
    </CommonCard>
  );
};

export default CouponCard;
