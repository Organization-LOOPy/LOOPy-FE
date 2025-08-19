import QuestionMark from '../../../../assets/images/QuestionMark.svg?react';
import StampPurple from '../../../../assets/images/StampPurple.svg?react';
import StampBarChart from './StampBarChart';
import type { StampData, DayOfWeek } from '../types/StampData';
import { useOwnerStampStats } from '../../../../hooks/query/admin/home/useOwnerStampStats';

const StampOverview = () => {
  const { data, isLoading, isError, error } = useOwnerStampStats();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error?.message}</div>;

  const dailyStampCounts = data?.data?.dailyStampCounts ?? [];

  const getDayOfWeek = (dateStr: string): DayOfWeek => {
    const date = new Date(dateStr);
    const days: DayOfWeek[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return days[date.getDay()];
  };

  const countsByDay: Record<DayOfWeek, number> = {
    MON: 0,
    TUE: 0,
    WED: 0,
    THU: 0,
    FRI: 0,
    SAT: 0,
    SUN: 0,
  };

  dailyStampCounts.forEach(({ date, count }) => {
    const day = getDayOfWeek(date);
    countsByDay[day] = count;
  });

  const weekDaysOrder: DayOfWeek[] = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ];
  const chartData: StampData[] = weekDaysOrder.map((day) => ({
    day,
    count: countsByDay[day] ?? 0,
  }));

  const today = getDayOfWeek(
    new Date().toLocaleDateString('en-US', { timeZone: 'Asia/Seoul' }),
  );

  return (
    <div className="flex h-[19rem] w-full bg-[#F0F1FE] p-8 rounded-lg">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center mb-4">
          <StampPurple />
          <div className="text-[1rem] text-black font-semibold leading-none">
            오늘 스탬프 적립 수
          </div>
        </div>
        <div className="flex justify-center items-center bg-white mr-12">
          <StampBarChart data={chartData} today={today} />
        </div>
      </div>
      {/* 우측 흰색 상자들 */}
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-[4.688rem] bg-white rounded-lg px-[2.875rem] py-[0.875rem] flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <span className="leading-none text-[1rem] font-semibold">
              주간 적립 수
            </span>
            <QuestionMark />
          </div>
          <span className="text-[1.25rem] font-bold mt-3 leading-none">
            {data?.data?.thisWeekStampCount ?? 0}개
          </span>
        </div>
        <div className="h-[4.688rem] bg-white rounded-lg px-[2.875rem] py-[0.875rem] flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <span className="leading-none text-[1rem] font-semibold">
              활성 고객 수
            </span>
            <QuestionMark />
          </div>
          <span className="text-[1.25rem] font-bold mt-3 leading-none">
            {data?.data?.uniqueUserCount ?? 0}명
          </span>
        </div>
        <div className="h-[4.688rem] bg-white rounded-lg px-[2.875rem] py-[0.875rem] flex flex-col items-center justify-center">
          <div className="flex gap-2">
            <span className="leading-none text-[1rem] font-semibold">
              스탬프 달성 건수
            </span>
            <QuestionMark />
          </div>
          <span className="text-[1.25rem] font-bold mt-3 leading-none">
            {data?.data?.rewardGivenCount ?? 0}건
          </span>
        </div>
      </div>
    </div>
  );
};

export default StampOverview;
