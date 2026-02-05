import CommonHeader from '../../../components/header/CommonHeader';
import { useNavigate } from 'react-router-dom';
import AlarmCard from './components/AlarmCard';
import { useNotifications } from '../../../hooks/query/alarm/useNotification';
import AlarmSkeleton from './Skeleton/AlarmSkeleton';
import type { Notification } from '../../../apis/alarm/type';

const AlarmPage = () => {
  const navigate = useNavigate();
  const { data: alarms = [], isLoading } = useNotifications();
  const now = new Date();

  const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

  const d7 = new Date();
  d7.setDate(d7.getDate() - 7);

  const todayAlarms = alarms.filter(a => isSameDay(new Date(a.createdAt), now));
  
  const recentWeekAlarms = alarms.filter(a => {
    const t = new Date(a.createdAt);
    return t >= d7 && !isSameDay(t, now);
  });
  
  const pastAlarms = alarms.filter(a => new Date(a.createdAt) < d7);

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
