import CommonSideBar from '../../../components/admin/sideBar/CommonSideBar';
import CommonTopBar from '../../../components/admin/topBar/CommonTopBar';
import FilterToggleButton from './_components/FilterToggleButton';
import CouponList from './_components/CouponList';
import AddCouponButton from './_components/AddCouponButton';

const AdminCouponPage = () => {
  const couponData = [
    {
      name: '아메리카노 1,000원 할인',
      status: '발행 중',
      description: '시즌 딸기 케이크 구매 시',
      usage: 30,
      period: '2025.08.24 ~ 2025.08.31',
      type: '금액 할인',
      action: '발행 종료',
    },
    {
      name: '카페라떼 50% 할인',
      status: '발행 중',
      description: '디저트 추가 구매 시',
      usage: 80,
      period: '2025.08.24 ~ 2025.09.09',
      type: '금액 할인',
      action: '발행 종료',
    },
    {
      name: '아메리카노 사이즈업',
      status: '종료됨',
      usage: 40,
      period: '2025.07.24 ~ 2025.08.31',
      type: '사이즈업',
      action: '',
    },
    {
      name: '아메리카노 무료',
      status: '종료됨',
      description: '디저트 한 개 이상 주문 시',
      usage: 40,
      period: '2025.07.24 ~ 2025.08.31',
      type: '무료 음료',
      action: '',
    },
    {
      name: '디저트 30% 할인',
      status: '종료됨',
      usage: 40,
      period: '2025.07.24 ~ 2025.08.31',
      type: '금액 할인',
      action: '발행 종료',
    },
  ];

  return (
    <div className="w-full min-h-screen flex font-suit text-[#252525]">
      <CommonSideBar />

      <div className="flex-1 flex flex-col ml-[12.875rem]">
        <CommonTopBar title="쿠폰 관리" profileImageUrl="" />

        <main className="flex-1 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <FilterToggleButton />
            <AddCouponButton />
          </div>
          <CouponList coupons={couponData} />
        </main>
      </div>
    </div>
  );
};

export default AdminCouponPage;
