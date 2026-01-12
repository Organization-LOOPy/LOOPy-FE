import { useState, useMemo } from "react";
import type { BusinessHourType, SameAllDaysHours, WeekdayWeekendHours, EachDayHour, DayKo, BreakTime, } from "../../../../apis/cafeDetail/type";
import ArrowDownIcon from "/src/assets/images/ArrowDown.svg?react";
import ArrowUpIcon from "/src/assets/images/ArrowUp.svg?react";
import ClockIcon from "/src/assets/images/Clock.svg?react";

const dayOrder: DayKo[] = ['일', '월', '화', '수', '목', '금', '토'];

type BusinessTimeSectionProps = {
  businessHourType: BusinessHourType;
  businessHours: SameAllDaysHours | WeekdayWeekendHours | EachDayHour[];
  breakTime?: BreakTime;
};

type DisplayHour = { day: DayKo; label: string };

const dayKoToEn = {
  '월': 'MONDAY',
  '화': 'TUESDAY',
  '수': 'WEDNESDAY',
  '목': 'THURSDAY',
  '금': 'FRIDAY',
  '토': 'SATURDAY',
  '일': 'SUNDAY',
} as const;

function getBreakLabel(
  type: BusinessHourType,
  breakTime: BreakTime | undefined,
  day: DayKo
) {
  if (!breakTime) return '';

  // SAME_ALL_DAYS
  if (type === 'SAME_ALL_DAYS' && typeof breakTime === 'string') {
    return ` (브레이크 ${breakTime})`;
  }

  // WEEKDAY_WEEKEND
  if (
    type === 'WEEKDAY_WEEKEND' &&
    typeof breakTime === 'object' &&
    !Array.isArray(breakTime)
  ) {
    const isWeekend = day === '토' || day === '일';
    const bt = isWeekend ? breakTime.weekend : breakTime.weekday;
    return bt ? ` (브레이크 ${bt})` : '';
  }

  // DIFFERENT_EACH_DAY
  if (type === 'DIFFERENT_EACH_DAY' && Array.isArray(breakTime)) {
    const found = breakTime.find(
      (b) => b.day === dayKoToEn[day]
    );
    return found?.breakTime ? ` (브레이크 ${found.breakTime})` : '';
  }

  return '';
}

function toDisplayList(
  type: BusinessHourType,
  hours: SameAllDaysHours | WeekdayWeekendHours | EachDayHour[],
  breakTime?: BreakTime
): DisplayHour[] {

  // SAME_ALL_DAYS
  if (type === 'SAME_ALL_DAYS') {
    const h = hours as SameAllDaysHours;
    return dayOrder.map((d) => {
      const bt = getBreakLabel(type, breakTime, d);
      return {
        day: d,
        label: `${h.open} – ${h.close}${bt}`,
      };
    });
  }

  // WEEKDAY_WEEKEND
  if (type === 'WEEKDAY_WEEKEND') {
    const h = hours as WeekdayWeekendHours;

    return dayOrder.map((d) => {
      const isWeekend = d === '토' || d === '일';
      const slot = isWeekend ? h.weekend : h.weekday;
      const bt = getBreakLabel(type, breakTime, d);

      return {
        day: d,
        label: `${slot.open} – ${slot.close}${bt}`,
      };
    });
  }

  // DIFFERENT_EACH_DAY
  const arr = hours as EachDayHour[];
  const map = new Map<DayKo, EachDayHour>();
  arr.forEach((e) => map.set(e.day, e));

  return dayOrder.map((d) => {
    const item = map.get(d);
    if (!item) return { day: d, label: '정보 없음' };
    if (item.isClosed) return { day: d, label: '휴무' };

    const bt = getBreakLabel(type, breakTime, d);

    return {
      day: d,
      label: `${item.openTime ?? ''} – ${item.closeTime ?? ''}${bt}`.trim(),
    };
  });
}

export default function BusinessTimeSection({ businessHourType, businessHours, breakTime, }: BusinessTimeSectionProps) {
    const [isOpen, setIsOpen] = useState(false);
    const todayIdx = new Date().getDay(); // 0(일)~6(토)
    const today = dayOrder[todayIdx];

    const list = useMemo(
        () => toDisplayList(businessHourType, businessHours, breakTime),
        [businessHourType, businessHours, breakTime]
    );

    const pivot = list.findIndex((h) => h.day === today);
    const rotated = pivot >= 0 ? [...list.slice(pivot), ...list.slice(0, pivot)] : list;
    
    const todayHour = rotated[0];
    const rest = rotated.slice(1);
    const Icon = isOpen ? ArrowUpIcon : ArrowDownIcon;

    return (
        <div>
            <div
                className="flex items-start justify-between text-[0.875rem] font-normal text-[#3B3B3B] leading-none cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="flex items-center gap-[0.5rem]">
                    <ClockIcon className="h-[1rem] w-[1rem]" />
                    <span>{todayHour.day}</span>
                    <span>{todayHour.label}</span>
                    <Icon className="h-[0.75rem] w-[0.75rem]" />
                </span>
            </div>

            {isOpen && (
                <div className="text-[0.875rem] font-normal text-[#3B3B3B]">
                    {rest.map((item) => (
                        <div
                            key={item.day}
                            className="flex items-center gap-[0.5rem] pl-[1.5rem] pt-[0.25rem] leading-none"
                        >
                            <span>{item.day}</span>
                            <span>{item.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
