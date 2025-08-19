import { useState, useMemo } from 'react';
import CouponTypeSection from './CouponTypeSection';
import CouponConditionSection from './CouponConditionSection';
import CouponLimitSection from './CouponLimitSection';
import CommonAdminButton from '../../../../components/admin/button/CommonAdminButton';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import { useCreateOwnerCoupon } from '../../../../hooks/query/admin/coupon/useCreateOwnerCoupon';
import type { DiscountType, CreateOwnerCouponRequest } from '../../../../apis/admin/coupon/type';
import { mapUiTypeToDiscountType } from '../../../../utils/couponType';

interface Props {
  onBack: () => void;
  cafeId: number; 
}

const AdminCouponCreatePage = ({ onBack, cafeId }: Props) => {
  const [couponType, setCouponType] = useState<'discount' | 'size' | 'freeDrink' | null>(null);
  const [discountAmount, setDiscountAmount] = useState('');
  const [hasCondition, setHasCondition] = useState<boolean | null>(null);
  const [conditionText, setConditionText] = useState('');
  const [hasLimit, setHasLimit] = useState<boolean | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const serverDiscountType: DiscountType | null = useMemo(
    () => mapUiTypeToDiscountType(couponType),
    [couponType]
  );

  const isValid =
    couponType !== null &&
    (couponType !== 'discount' || discountAmount.trim() !== '') &&
    hasCondition !== null &&
    (hasCondition === false || conditionText.trim() !== '') &&
    hasLimit !== null &&
    (hasLimit === false || (startDate !== null && endDate !== null));

  const { mutate: createCoupon } = useCreateOwnerCoupon(
    () => {
      console.log('쿠폰 생성 성공');
      onBack();
    },
    (err) => {
      console.error('쿠폰 생성 실패:', err);
    }
  );

  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [selectedMenuName, setSelectedMenuName] = useState<string | null>(null);


  const handleSubmit = () => {
    if (!cafeId || !serverDiscountType) return;

    const value = serverDiscountType === 'DISCOUNT' ? Number(discountAmount) || 0 : 0;
    const usageCondition = hasCondition ? conditionText.trim() : undefined;

    const base = {
      discountType: serverDiscountType,
      discountValue: value,
      applicableMenuId: selectedMenuId ?? undefined,
      usageCondition,
    } as const;

    const payload: CreateOwnerCouponRequest =
      hasLimit && startDate && endDate
        ? {
            ...base,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          }
        : {
            ...base,
          };

    createCoupon({ cafeId, payload });
  };

  return (
    <div className="flex flex-col w-full">
      <CommonTopBar title="쿠폰 발행" onBack={onBack} />

      <div className="max-w-[34rem]">
        <CouponTypeSection
          value={couponType}
          onChange={setCouponType}
          discountAmount={discountAmount}
          onChangeDiscountAmount={setDiscountAmount}
          selectedMenuId={selectedMenuId}
          selectedMenuName={selectedMenuName}
          onSelectMenu={(id, name) => {
            setSelectedMenuId(id);    
            setSelectedMenuName(name);  
          }}
        />
        <CouponConditionSection
          value={hasCondition}
          onChange={setHasCondition}
          conditionText={conditionText}
          onChangeConditionText={setConditionText}
        />
        <CouponLimitSection
          value={hasLimit}
          onChange={setHasLimit}
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={setStartDate}
          onChangeEndDate={setEndDate}
        />

        <CommonAdminButton
          disabled={!isValid}
          className="flex justify-center items-center"
          label="쿠폰 발행하기"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default AdminCouponCreatePage;
