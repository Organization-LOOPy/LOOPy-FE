import type { FC } from 'react';
import CouponCard from './CouponCard';
import AdminCouponPurple from '../../../../assets/images/AdminCouponPurple.svg?react';
import { useOwnerCoupons } from '../../../../hooks/query/admin/coupon/useOwnerCoupon';

interface CouponOverviewProps {
  cafeId?: number;
}

interface CouponOverviewProps {
  cafeId?: number;
}

const CouponOverview: FC<CouponOverviewProps> = ({ cafeId }) => {
  const { data, isLoading, isError } = useOwnerCoupons(cafeId);
  const activeCoupons =
    data?.data.filter((coupon) => coupon.status === 'ACTIVE') ?? [];

  if (isError) return <div>쿠폰 정보를 가져오는데 실패했습니다.</div>;

  return (
    <div className="w-full bg-[#F0F1FE] rounded-lg p-6 flex flex-col">
      <div className="flex gap-2 items-center mb-6">
        <AdminCouponPurple />
        <div className="text-[1rem] text-black font-semibold leading-none">
          발행 중인 쿠폰
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {isLoading ? (
          <div>로딩 중...</div>
        ) : activeCoupons.length > 0 ? (
          activeCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))
        ) : (
          <div className="text-center text-[#7F7F7F] text-sm py-6">
            발행 중인 쿠폰이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponOverview;
