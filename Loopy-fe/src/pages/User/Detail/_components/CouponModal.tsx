import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import BaseModalLayout from './BaseModal';
import type { Coupon } from '../../../../apis/cafeDetail/type';
import { couponTypeMeta } from '../../../../utils/couponTypeMeta';
import { formatCouponTitle } from '../../../../utils/formatCouponTitle';

interface Props {
  onClose: () => void;
  coupon: Coupon;
}

export default function CouponReceivedModal({ onClose, coupon }: Props) {
  const navigate = useNavigate();

  const handleConfirm = () => {
    onClose();
    navigate('/mypage?my.step=couponBox');
  };

  const { icon: Icon } = couponTypeMeta[coupon.discountType];
  const title = formatCouponTitle(coupon);

  const formatDate = (date?: string) =>
    date ? dayjs(date).format('YYYY.MM.DD') : '';

  return (
    <BaseModalLayout
      onConfirm={handleConfirm}
      onClose={onClose}
      confirmText="쿠폰함 확인하기"
    >
      {/* 상단 아이콘 + 제목 */}
      <div className="flex items-center">
        <div className="w-[3.625rem] h-[3.625rem] rounded-full bg-[#F6F6F6] flex items-center justify-center mr-[1rem]">
          <Icon className="w-[2rem] h-[2rem] text-[#6970F3]" />
        </div>
        <p className="text-[1.25rem] font-bold text-[#252525] leading-[1.5rem]">
          {title} <br />
          쿠폰을 받았어요!
        </p>
      </div>

      {/* 조건 있으면 표시 */}
      {coupon.usageCondition && (
        <p className="mt-[0.75rem] text-[0.875rem] text-[#252525] font-medium">
          {coupon.usageCondition}
        </p>
      )}

      {/* 기간 */}
      <p className="mt-[1rem] text-[#7F7F7F] text-[0.875rem] font-normal leading-[1.5rem]">
        쿠폰 기한은 {formatDate(coupon.createdAt)} ~ {formatDate(coupon.expiredAt)}
        입니다.
      </p>
    </BaseModalLayout>
  );
}
