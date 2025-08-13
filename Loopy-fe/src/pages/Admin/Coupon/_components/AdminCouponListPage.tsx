import { useState, useMemo } from 'react';
import CommonTopBar from '../../../../components/admin/topBar/CommonTopBar';
import FilterToggleButton from './FilterToggleButton';
import CouponList from './CouponList';
import AddCouponButton from './AddCouponButton';
import TypeFilterModal, { type CouponTypeKey } from './TypeFilterModal';
import { useOwnerCoupons } from '../../../../hooks/query/admin/coupon/useOwnerCoupon';
import { useTerminateOwnerCoupon } from '../../../../hooks/query/admin/coupon/useTerminateCoupon';
import type { OwnerCouponListItem } from '../../../../apis/admin/coupon/type';

interface Props {
  cafeId: number;
  onAdd: () => void;
}

type SelectedTypes = CouponTypeKey[];

const TYPE_LABEL: Record<CouponTypeKey, string> = {
  DISCOUNT: '금액 할인',
  SIZE_UP: '사이즈업',
  FREE_DRINK: '무료 음료',
};

const toYmdSafe = (iso?: string) => (iso ? iso.split('T')[0] : '');

const mapToUICoupon = (item: OwnerCouponListItem) => {
  const hasPeriod = !!(item.startDate && item.endDate);
  const uiStatus: '진행중' | '종료됨' =
    item.status === 'ENDED' ? '종료됨' : '진행중';

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
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedTypes>([]);
  const [tempSelected, setTempSelected] = useState<SelectedTypes>([]);

  const { data, isLoading, isError } = useOwnerCoupons(cafeId);
  const { mutate: terminate, isPending } = useTerminateOwnerCoupon();

  const apiList = useMemo<OwnerCouponListItem[]>(
    () => data?.data ?? [],
    [data]
  );

  const filteredApi = useMemo(() => {
    if (selected.length === 0) return apiList;
    return apiList.filter((it) =>
      selected.includes(it.discountType as CouponTypeKey)
    );
  }, [apiList, selected]);

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
    setOpen(true);
  };

  const toggleType = (key: CouponTypeKey) => {
    setTempSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const resetAll = () => setTempSelected([]);

  const handleSave = () => {
    setSelected(tempSelected);
    setOpen(false);
  };

  const handleEndIssue = (couponId: number) => {
    if (isPending) return;
    terminate({ cafeId, couponId });
  };

  return (
    <>
      <CommonTopBar title="쿠폰 관리" profileImageUrl="" />

      <div className="flex justify-between items-center mb-2">
        <FilterToggleButton onClick={openModal} />
        <AddCouponButton onClick={onAdd} />
      </div>

      {!isLoading && !isError && (
        <CouponList coupons={uiList} onEndIssue={handleEndIssue} />
      )}

      <TypeFilterModal
        open={open}
        value={tempSelected}
        onToggle={toggleType}
        onReset={resetAll}
        onClose={() => setOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};

export default AdminCouponListPage;
