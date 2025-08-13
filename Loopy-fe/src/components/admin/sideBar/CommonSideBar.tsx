import type { JSX } from 'react';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import LoopyIconGreen from '../../../assets/images/LoopyIconGreen.svg?react';
import AdminChallenge from '../../../assets/images/AdminChallenge.svg?react';
import AdminCoupon from '../../../assets/images/AdminCoupon.svg?react';
import AdminStamp from '../../../assets/images/AdminStamp.svg?react';
import AdminHome from '../../../assets/images/AdminHome.svg?react';
import AdminChallengePurple from '../../../assets/images/AdminChallengePurple.svg?react';
import AdminCouponPurple from '../../../assets/images/AdminCouponPurple.svg?react';
import AdminStampPurple from '../../../assets/images/AdminStampPurple.svg?react';
import AdminHomePurple from '../../../assets/images/AdminHomePurple.svg?react';
import AdminSetting from '../../../assets/images/AdminSetting.svg?react';
import AdminMessage from '../../../assets/images/AdminMessage.svg?react';
import AdminMessagePurple from '../../../assets/images/AdminMessagePurple.svg?react';
import LoopyLogo from '../../../assets/images/LoopyLogo.svg?react';
import { useAdminCafe } from '../../../contexts/AdminContext';

type MenuItem = {
  label: string;
  path: string;
  matchPath?: string;
  buildPath?: (ctx: { cafeId: number }) => string;
  icon: JSX.Element;
  iconSelected: JSX.Element;
};

const menuItems: MenuItem[] = [
  {
    label: '홈',
    path: '/admin/home',
    icon: <AdminHome />,
    iconSelected: <AdminHomePurple />,
  },
  {
    label: '스탬프 관리',
    path: '/admin/stamp',
    icon: <AdminStamp />,
    iconSelected: <AdminStampPurple />,
  },
  {
    label: '챌린지 관리',
    path: '/admin/challenge',
    icon: <AdminChallenge />,
    iconSelected: <AdminChallengePurple />,
  },
  {
    label: '쿠폰 관리',
    path: '/admin/coupon',
    matchPath: '/admin/coupon/',
    buildPath: ({ cafeId }) => `/admin/coupon/${cafeId}`,
    icon: <AdminCoupon />,
    iconSelected: <AdminCouponPurple />,
  },
  {
    label: '알림 보내기',
    path: '/admin/notification',
    icon: <AdminMessage />,
    iconSelected: <AdminMessagePurple />,
  },
];

const CommonSideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeCafeId, setActiveCafeId } = useAdminCafe();

  useEffect(() => {
    if (activeCafeId) return;
    const saved = localStorage.getItem('activeCafeId');
    if (saved) setActiveCafeId(Number(saved));
  }, [activeCafeId, setActiveCafeId]);

  const cafeId = activeCafeId;

  const handleMenuClick = (item: MenuItem) => {
    if (item.buildPath) {
      const targetCafeId = cafeId || 1;
      navigate(item.buildPath({ cafeId: targetCafeId }));
    } else {
      navigate(item.path);
    }
  };

  const currentPath = location.pathname;
  const selectedLabel = menuItems.find((item) =>
    currentPath.startsWith(item.matchPath ?? item.path),
  )?.label;

  const settingPath = '/admin/setting';
  const isSettingSelected = currentPath.startsWith(settingPath);

  return (
    <div>
      <aside className="fixed top-0 left-0 h-screen bg-[#6970F3] text-white w-[12.875rem] px-6 py-6 z-40 flex flex-col justify-between">
        <div>
          <div className="flex gap-4 items-start mb-10">
            <LoopyIconGreen className="w-[1.75rem]" />
            <LoopyLogo className="w-[6.25rem]" />
          </div>

          <nav className="flex flex-col">
            {menuItems.map((item, index) => {
              const isSelected = selectedLabel === item.label;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => handleMenuClick(item)}
                  className={`flex items-center gap-2 text-left font-semibold text-[0.875rem] leading-none px-6 py-3 rounded-lg
                    ${isSelected ? 'bg-[#F0F1FE] text-[#6970F3]' : 'text-white'}`}
                >
                  <div className="w-4 h-4">
                    {isSelected ? item.iconSelected : item.icon}
                  </div>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-8">
          <div className="flex flex-col">
            <button
              type="button"
              onClick={() => navigate(settingPath)}
              className={`flex items-center gap-2 text-left font-semibold text-[0.875rem] pl-[1.5rem] pr-[5.313rem] py-3 leading-none rounded-lg ${isSettingSelected ? 'bg-[#F0F1FE] text-[#6970F3]' : 'text-white'}`}
            >
              <div
                className={`w-4 h-4 ${isSettingSelected ? 'text-[#6970F3]' : 'text-white'}`}
              >
                <AdminSetting />
              </div>
              설정
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default CommonSideBar;
