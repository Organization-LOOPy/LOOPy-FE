import CommonHeader from '../../../components/header/CommonHeader';
import { useNavigate } from 'react-router-dom';
import AlarmCard from './components/AlarmCard';
import { useNotifications } from '../../../hooks/query/alarm/useNotification';
import dayjs from 'dayjs';
import AlarmSkeleton from './Skeleton/AlarmSkeleton';
import type { Notification } from '../../../apis/alarm/type';

const AlarmPage = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useNotifications();
  const now = dayjs();

  const alarms = data?.data || [];

  const todayAlarms = alarms.filter((alarm) =>
    dayjs(alarm.createdAt).isSame(now, 'day'),
  );

  const recentWeekAlarms = alarms.filter(
    (alarm) =>
      dayjs(alarm.createdAt).isAfter(now.subtract(7, 'day')) &&
      !dayjs(alarm.createdAt).isSame(now, 'day'),
  );

  const pastAlarms = alarms.filter((alarm) =>
    dayjs(alarm.createdAt).isBefore(now.subtract(7, 'day')),
  );

  const renderSection = (title: string, alarms: Notification[]) => (
    <section>
      <p className="text-[1.125rem] font-bold mt-6 mb-2 px-4">{title}</p>
      {isLoading ? (
        <>
          <AlarmSkeleton />
          <AlarmSkeleton />
        </>
      ) : alarms.length > 0 ? (
        alarms.map((alarm) => (
          <AlarmCard key={alarm.notificationId} alarm={alarm} />
        ))
      ) : (
        <p className="text-sm text-gray-500 px-4">알림이 없습니다.</p>
      )}
    </section>
  );

  return (
    <div className="mb-8">
      <CommonHeader title="알림" onBack={() => navigate(-1)} />

      {renderSection('오늘', todayAlarms)}
      {renderSection('최근 7일', recentWeekAlarms)}
      {renderSection('지난 알림', pastAlarms)}
    </div>
  );
};

export default AlarmPage;
