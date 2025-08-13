import { useEffect, useState } from 'react';
import CommonHeader from '../../../components/header/CommonHeader';
import { useNavigate } from 'react-router-dom';
import AlarmCard from './components/AlarmCard';
import type { NotificationDetail } from '../../../apis/alarm/type';
import { mockAlarmData } from './mock/mockData';
import dayjs from 'dayjs';
import AlarmSkeleton from './Skeleton/AlarmSkeleton';

const AlarmPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const now = dayjs();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const todayAlarms = mockAlarmData.filter((alarm) =>
    dayjs(alarm.createdAt).isSame(now, 'day'),
  );

  const recentWeekAlarms = mockAlarmData.filter(
    (alarm) =>
      dayjs(alarm.createdAt).isAfter(now.subtract(7, 'day')) &&
      !dayjs(alarm.createdAt).isSame(now, 'day'),
  );

  const pastAlarms = mockAlarmData.filter((alarm) =>
    dayjs(alarm.createdAt).isBefore(now.subtract(7, 'day')),
  );

  const renderSection = (title: string, alarms: NotificationDetail[]) => (
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
