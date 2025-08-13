import CouponImage from '../../../../assets/images/CouponImage.svg?react';

const CouponCard = () => {
  return (
    <div className="flex gap-4 items-center">
      <CouponImage className="w-18 h-18" />
      <div className="flex flex-col gap-2">
        <div className="text-black text-[1rem] font-semibold leading-none">
          아메리카노 200원 할인쿠폰
        </div>
        <div className="text-[#7F7F7F] text-[0.875rem] font-normal leading-none">
          2025.08.15 ~ 2025.09.15
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
