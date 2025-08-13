import Home from '../../assets/images/Home.svg';
import HomeFilled from '../../assets/images/HomeFilled.svg';
import Coffee from '../../assets/images/Coffee.svg';
import CoffeeFilled from '../../assets/images/CoffeeFilled.svg';
import User from '../../assets/images/User.svg';
import UserFilled from '../../assets/images/UserFilled.svg';
import { useNavigate } from 'react-router-dom';

type CommonBottomBarProps = {
  active: 'home' | 'search' | 'mypage';
  onChange: (tab: 'home' | 'search' | 'mypage') => void;
};

const CommonBottomBar = ({ active, onChange }: CommonBottomBarProps) => {
  const navigate = useNavigate();

  const items = [
    {
      id: 'home',
      label: '홈',
      icon: Home,
      iconFilled: HomeFilled,
      route: '/home',
    },
    {
      id: 'search',
      label: '카페 탐색',
      icon: Coffee,
      iconFilled: CoffeeFilled,
      route: '/search',
    },
    {
      id: 'mypage',
      label: '마이페이지',
      icon: User,
      iconFilled: UserFilled,
      route: '/mypage',
    },
  ] as const;

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
      <nav className="w-full sm:max-w-[393px] h-[4.56rem] bg-white border-t border-gray-300 shadow-md flex justify-around items-start pt-4 px-4 sm:px-6 md:px-8">
        {items.map(({ id, label, icon, iconFilled, route }) => {
          const isActive = active === id;
          const IconToShow = isActive ? iconFilled : icon;

          return (
            <button
              key={id}
              onClick={() => {
                onChange(id);
                navigate(route);
              }}
              type="button"
              className="flex flex-col items-center justify-start gap-1 flex-1 max-w-[6.25rem] min-w-[4.5rem] cursor-pointer"
            >
              <img src={IconToShow} alt={label} className="w-6 h-6" />
              <span
                className={`text-xs font-medium ${
                  isActive ? 'text-[#6970F3]' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default CommonBottomBar;
