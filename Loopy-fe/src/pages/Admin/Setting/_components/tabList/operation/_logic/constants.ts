import type { BusinessHour } from "../../../../../../../types/cafeData";
import type { DayTimeValue } from "../WeekdayWeekendTimeInput";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export const defaultDayTime: DayTimeValue = {
  open: "",
  close: "",
  breakType: "없음",
  breakStart: "",
  breakEnd: "",
};

export const makeDefaultByDay = () =>
  ({
    "월": { ...defaultDayTime },
    "화": { ...defaultDayTime },
    "수": { ...defaultDayTime },
    "목": { ...defaultDayTime },
    "금": { ...defaultDayTime },
    "토": { ...defaultDayTime },
    "일": { ...defaultDayTime },
  }) as Record<Day, DayTimeValue>;

export const dayMapEN2KO: Record<BusinessHour["day"], Day> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일",
};

export const isWeekday = (d: BusinessHour["day"]) =>
  d === "MONDAY" || d === "TUESDAY" || d === "WEDNESDAY" || d === "THURSDAY" || d === "FRIDAY";

export const toUI = (t?: string | null) => (t ? t : "");
export const toBreakType = (s?: string | null, e?: string | null): DayTimeValue["breakType"] =>
  s && e ? "있음" : "없음";
