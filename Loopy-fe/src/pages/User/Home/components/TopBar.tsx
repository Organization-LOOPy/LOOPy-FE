import BellWhite from '../../../../assets/images/BellWhite.svg?react';
import Bell from '../../../../assets/images/Bell.svg?react';
import BookmarkWhite from '../../../../assets/images/BookmarkWhite.svg?react';
import LoopyIconGreen from '../../../../assets/images/LoopyIconGreen.svg?react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../../../hooks/query/alarm/useNotification';

const TopBar = () => {
  const navigate = useNavigate();
  const { data } = useNotifications();
  const alarms = data?.data || [];

  // 알림이 하나라도 있으면 true
  const hasNewAlarm = alarms.length > 0;

  return (
    <div className="w-full bg-transparent flex items-center justify-between">
      <div>
        <LoopyIconGreen className="w-[1.5rem] h-[1.5rem]" />
      </div>
      <div className="flex items-center gap-[0.75rem]">
        <button onClick={() => navigate('/bookmark')}>
          <BookmarkWhite className="w-[1.5rem] h-[1.5rem]" />
        </button>
        <button onClick={() => navigate('/alarm')}>
          {hasNewAlarm ? (
            <Bell className="w-[1.5rem] h-[1.5rem]" />
          ) : (
            <BellWhite className="w-[1.5rem] h-[1.5rem]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default TopBar;
