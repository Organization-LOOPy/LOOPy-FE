import type { StampData, DayOfWeek } from '../types/StampData';
import CountBubble from '../../../../assets/images/CountBubble.svg?react';

interface Props {
  data: StampData[];
  today: DayOfWeek;
}

const DayOfWeekOrder: DayOfWeek[] = [
  'MON',
  'TUE',
  'WED',
  'THU',
  'FRI',
  'SAT',
  'SUN',
];

// 오늘 이전 6일 + 오늘 (오늘이 가장 오른쪽 끝)
function reorderDataByToday_Previous6Days(
  data: StampData[],
  today: DayOfWeek,
): StampData[] {
  const todayIndex = DayOfWeekOrder.indexOf(today);
  const reorderedDays: DayOfWeek[] = [];

  // i=6부터 0까지 내려가며 인덱스 계산 (오늘이 마지막에 위치)
  for (let i = 6; i >= 0; i--) {
    const idx = (todayIndex - i + 7) % 7;
    reorderedDays.push(DayOfWeekOrder[idx]);
  }

  const dataMap = new Map(data.map((d) => [d.day, d]));
  return reorderedDays.map((day) => dataMap.get(day) ?? { day, count: 0 });
}

const StampBarChart: React.FC<Props> = ({ data, today }) => {
  const reorderedData = reorderDataByToday_Previous6Days(data, today);
  const maxCount = Math.max(1, ...reorderedData.map((d) => d.count));
  const todayCount = reorderedData.find((d) => d.day === today)?.count ?? 0;

  return (
    <div className="bg-[#f2f3ff] h-[13rem] w-full flex flex-col items-center">
      {/* 상단 오늘 총 개수 */}
      <div className="flex items-center mb-4 w-[424px]">
        <span className="text-xl font-bold leading-none">{todayCount}개</span>
      </div>

      {/* 차트 + 요일 레이블 */}
      <div className="flex flex-col flex-1 items-center">
        {/* 바 영역 */}
        <div
          className="flex items-baseline flex-1"
          style={{ gap: '19.67px', width: '426px' }}
        >
          {reorderedData.map(({ day, count }) => {
            const isToday = day === today;
            const barHeight = (count / maxCount) * 100;

            return (
              <div
                key={day}
                className="relative flex flex-col items-center h-full"
                style={{ width: '44px' }}
                aria-label={`${day} ${count}개`}
              >
                {isToday && count > 0 && (
                  <div className="absolute bottom-full mb-2 flex items-center justify-center w-full">
                    <div className="relative flex items-center justify-center">
                      <CountBubble
                        aria-hidden="true"
                        className="w-[3.625rem] h-auto"
                      />
                      <span
                        className="absolute font-semibold text-[#E3F389] pointer-events-none leading-none flex items-center whitespace-nowrap"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -70%)',
                          fontSize: '1rem',
                        }}
                      >
                        <span>{count}</span>
                        <span style={{ fontSize: '1rem', lineHeight: 1 }}>
                          개
                        </span>
                      </span>
                    </div>
                  </div>
                )}
                <div
                  className="w-full rounded-md transition-all"
                  style={{
                    height: `${barHeight}%`,
                    background: isToday
                      ? 'linear-gradient(202.16deg, #6970F3 14.13%, #000343 386.1%)'
                      : '#ffffff',
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* 요일 레이블 */}
        <div
          className="mt-2 flex justify-between leading-none"
          style={{ gap: '19.67px', width: '426px' }}
        >
          {reorderedData.map(({ day }) => {
            const isToday = day === today;
            return (
              <div
                key={day}
                className={`text-center text-[0.875rem] ${
                  isToday ? 'text-[#6b5cff] font-bold' : 'text-gray-500'
                }`}
                style={{ width: '44px' }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StampBarChart;
