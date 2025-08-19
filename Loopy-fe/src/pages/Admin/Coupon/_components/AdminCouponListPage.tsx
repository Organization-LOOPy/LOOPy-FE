import { useState, useMemo } from 'react';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import FilterToggleButton from './FilterToggleButton';
import CouponList from './CouponList';
import AddCouponButton from './AddCouponButton';
import TypeFilterModal, { type CouponTypeKey } from './TypeFilterModal';
import { useOwnerCoupons } from '../../../../hooks/query/admin/coupon/useOwnerCoupon';
import { useTerminateOwnerCoupon } from '../../../../hooks/mutation/admin/coupon/useTerminateCoupon';
import CommonTwoButtonModal from '../../../../components/admin/modal/CommonTwoButtonModal';
import CommonCompleteModal from '../../../../components/admin/modal/CommonCompleteModal';
import type { OwnerCouponListItem } from '../../../../apis/admin/coupon/type';

interface Props {
  cafeId: number;
  onAdd: () => void;
}

type SelectedTypes = CouponTypeKey[];

interface Coupon {
  id: number;
  name: string;
  description?: string;
  status: '발행 중' | '종료됨';
  usage: number;
  period: string;
  type: string;
}

const TYPE_LABEL: Record<CouponTypeKey, string> = {
  DISCOUNT: '금액 할인',
  SIZE_UP: '사이즈업',
  FREE_DRINK: '무료 음료',
};

const toYmdSafe = (iso?: string) => (iso ? iso.split('T')[0] : '');

const mapToUICoupon = (item: OwnerCouponListItem) => {
  const hasPeriod = !!(item.startDate && item.endDate);
  const uiStatus: '발행 중' | '종료됨' =
    item.status === '종료됨' ? '종료됨' : '발행 중';

  return {
    id: item.id,
    name: item.name,
    status: uiStatus,
    usage: item.usedCount,
    period: hasPeriod
      ? `${toYmdSafe(item.startDate)} ~ ${toYmdSafe(item.endDate)}`
      : '제한 없음',
    type: TYPE_LABEL[item.discountType as CouponTypeKey],
  };
};

const AdminCouponListPage = ({ cafeId, onAdd }: Props) => {
  const [openFilter, setOpenFilter] = useState(false);
  const [selected, setSelected] = useState<SelectedTypes>([]);
  const [tempSelected, setTempSelected] = useState<SelectedTypes>([]);
  const [openConfirm, setOpenConfirm] = useState(false); 
  const [openComplete, setOpenComplete] = useState(false); 
  const [targetCoupon, setTargetCoupon] = useState<Coupon | null>(null);
  const { data, isLoading, isError } = useOwnerCoupons(cafeId);
  const { mutate: terminate, isPending } = useTerminateOwnerCoupon();
  const [localCoupons, setLocalCoupons] = useState<OwnerCouponListItem[]>([]);

  useMemo(() => {
    if (data?.data) {
      setLocalCoupons(data.data);
    }
  }, [data]);

  const filteredApi = useMemo(() => {
    if (selected.length === 0) return localCoupons;
    return localCoupons.filter((it) =>
      selected.includes(it.discountType as CouponTypeKey)
    );
  }, [localCoupons, selected]);

  const uiList = useMemo(() => filteredApi.map(mapToUICoupon), [filteredApi]);

  if (isLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#6970F3] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const openModal = () => {
    setTempSelected(selected);
    setOpenFilter(true);
  };

  const toggleType = (key: CouponTypeKey) => {
    setTempSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const resetAll = () => setTempSelected([]);

  const handleSave = () => {
    setSelected(tempSelected);
    setOpenFilter(false);
  };

  const handleEndIssueClick = (couponId: number) => {
    const coupon = uiList.find((c) => c.id === couponId);
    if (coupon) {
      setTargetCoupon(coupon);
      setOpenConfirm(true);
    }
  };

  const confirmEndIssue = () => {
    if (targetCoupon && !isPending) {
      terminate(
        { cafeId, couponId: targetCoupon.id },
        {
          onSuccess: () => {
            setLocalCoupons((prev) =>
              prev.filter((c) => c.id !== targetCoupon.id)
            );

            setOpenComplete(true);
          },
        }
      );
    }
    setOpenConfirm(false);
    setTargetCoupon(null);
  };
  
  return (
    <>
      <CommonTopBar title="쿠폰 관리" profileImageUrl="" />

      <div className="flex justify-between items-center mb-2">
        <FilterToggleButton onClick={openModal} />
        <AddCouponButton onClick={onAdd} />
      </div>

      {!isLoading && !isError && (
        <CouponList coupons={uiList} onEndIssue={handleEndIssueClick} />
      )}

      <TypeFilterModal
        open={openFilter}
        value={tempSelected}
        onToggle={toggleType}
        onReset={resetAll}
        onClose={() => setOpenFilter(false)}
        onSave={handleSave}
      />

      {openConfirm && targetCoupon && (
        <CommonTwoButtonModal
          onClose={() => setOpenConfirm(false)}
          purpleButton="발행 종료하기"
          purpleButtonOnClick={confirmEndIssue}
          title={`${targetCoupon.name} 쿠폰 발행을 종료할까요?`}
          message="종료하면 새로운 쿠폰 발급은 중단되며,
기존에 발급된 쿠폰은 유효기간까지 사용할 수 있어요."
        />
      )}

      {openComplete && targetCoupon && (
        <CommonCompleteModal
          onClose={() => setOpenComplete(false)}
          message= {`${targetCoupon.name} 쿠폰 발행이 종료되었어요.`}
        />
      )}
    </>
  );
};

export default AdminCouponListPage;