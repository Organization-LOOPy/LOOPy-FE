import CouponCard from './CouponCard';
import AdminCouponPurple from '../../../../assets/images/AdminCouponPurple.svg?react';

const CouponOverview = () => {
  return (
    <div className="w-full bg-[#F0F1FE] rounded-lg p-6 flex flex-col">
      <div className="flex gap-2 items-center mb-6">
        <AdminCouponPurple />
        <div className="text-[1rem] text-black font-semibold leading-none">
          발행 중인 쿠폰
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <CouponCard />
        <CouponCard />
        <CouponCard />
        <CouponCard />
      </div>
    </div>
  );
};

export default CouponOverview;
