import { useState, useMemo } from "react";
import type { BusinessHourType, SameAllDaysHours, WeekdayWeekendHours, EachDayHour, DayKo } from "../../../../apis/cafeDetail/type";
import ArrowDownIcon from "/src/assets/images/ArrowDown.svg?react";
import ArrowUpIcon from "/src/assets/images/ArrowUp.svg?react";
import ClockIcon from "/src/assets/images/Clock.svg?react";

const dayOrder: DayKo[] = ['일', '월', '화', '수', '목', '금', '토'];

type BusinessTimeSectionProps = {
  businessHourType: BusinessHourType;
  businessHours: SameAllDaysHours | WeekdayWeekendHours | EachDayHour[];
  breakTime?: string | null;
};

type DisplayHour = { day: DayKo; label: string };

const parseRange = (s?: string) => {
  const m = s?.match(/(\d{1,2}:\d{2})\s*[-–~]\s*(\d{1,2}:\d{2})/);
  return m ? { open: m[1], close: m[2] } : null;
};

function toDisplayList(
  type: BusinessHourType,
  hours: SameAllDaysHours | WeekdayWeekendHours | EachDayHour[],
  breakTime?: string | null
): DisplayHour[] {
  const bt = breakTime ? ` (브레이크 ${breakTime})` : '';

  if (type === 'SAME_ALL_DAYS') {
    const h = hours as SameAllDaysHours;
    const label = `${h.open} – ${h.close}${bt}`;
    return dayOrder.map((d) => ({ day: d, label }));
  }

  if (type === 'WEEKDAY_WEEKEND') {
    const any = hours as any;

    // 정식 구조 { weekday:{open,close}, weekend:{open,close} }
    if (
      any?.weekday?.open &&
      any?.weekday?.close &&
      any?.weekend?.open &&
      any?.weekend?.close
    ) {
      const h = hours as WeekdayWeekendHours;
      return dayOrder.map((d) => {
        const isWeekend = d === "토" || d === "일";
        const slot = isWeekend ? h.weekend : h.weekday;
        return { day: d, label: `${slot.open} – ${slot.close}${bt}` };
      });
    }

    // 문자열 포맷 {"평일":"07:00-22:00","주말":"08:00-23:00"} 또는 {"주중": "...", "주말": "..."}
    const wdStr = typeof any?.["평일"] === "string" ? any["평일"] : any?.["주중"];
    const weStr = any?.["주말"];
    const wd = parseRange(wdStr);
    const we = parseRange(weStr);

    if (wd && we) {
      return dayOrder.map((d) => {
        const isWeekend = d === "토" || d === "일";
        const slot = isWeekend ? we : wd;
        return { day: d, label: `${slot.open} – ${slot.close}${bt}` };
      });
    }

    // 포맷을 못 알아먹으면 전부 '정보 없음'
    return dayOrder.map((d) => ({ day: d, label: "정보 없음" }));
  }

  // DIFFERENT_EACH_DAY
  const arr = hours as EachDayHour[];
  const map = new Map<DayKo, EachDayHour>();
  arr.forEach((e) => map.set(e.day, e));

  return dayOrder.map((d) => {
    const item = map.get(d);
    if (!item) return { day: d, label: '정보 없음' };
    if (item.isClosed) return { day: d, label: '휴무' };
    return { day: d, label: `${item.openTime ?? ''} – ${item.closeTime ?? ''}${bt}`.trim() };
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
