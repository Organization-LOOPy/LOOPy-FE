import type { OwnerCafeOperationInfo } from "../../../../../../../apis/admin/setting/operation/type";
import type { TimeSectionValues } from "../TimeSection";
import { dayMapEN2KO, isWeekday, makeDefaultByDay, defaultDayTime, toUI, toBreakType, type Day } from "./constants";

export function mapOwnerOperationToForm(data: OwnerCafeOperationInfo) {
  const selectedDays: Day[] = data.businessHours
    .filter((h) => !h.isClosed)
    .map((h) => dayMapEN2KO[h.day]);

  const hashtags = data.keywords ?? [];
  const { storeFilters = [], takeOutFilters = [], menuFilters = [] } = data.selectedKeywords ?? {};
  const keywordList = Array.from(new Set([...storeFilters, ...takeOutFilters, ...menuFilters]));

  const timeSectionValues: TimeSectionValues = {
    type: "",
    all: { ...defaultDayTime },
    weekday: { ...defaultDayTime },
    weekend: { ...defaultDayTime },
    byDay: makeDefaultByDay(),
  };

  if (data.businessHourType === "SAME_ALL_DAYS") {
    const anyOpen = data.businessHours.find((h) => !h.isClosed) ?? data.businessHours[0];
    timeSectionValues.type = "all";
    timeSectionValues.all = {
      open: toUI(anyOpen.openTime),
      close: toUI(anyOpen.closeTime),
      breakType: toBreakType(anyOpen.breakStart, anyOpen.breakEnd),
      breakStart: toUI(anyOpen.breakStart),
      breakEnd: toUI(anyOpen.breakEnd),
    };
    return { selectedDays, hashtags, keywordList, timeSectionValues };
  }

  if (data.businessHourType === "WEEKDAY_WEEKEND") {
    const weekdayRef = data.businessHours.find((h) => isWeekday(h.day) && !h.isClosed);
    const weekendRef = data.businessHours.find((h) => !isWeekday(h.day) && !h.isClosed);
    timeSectionValues.type = "weekdayWeekend";
    timeSectionValues.weekday = weekdayRef
      ? {
          open: toUI(weekdayRef.openTime),
          close: toUI(weekdayRef.closeTime),
          breakType: toBreakType(weekdayRef.breakStart, weekdayRef.breakEnd),
          breakStart: toUI(weekdayRef.breakStart),
          breakEnd: toUI(weekdayRef.breakEnd),
        }
      : { ...defaultDayTime };
    timeSectionValues.weekend = weekendRef
      ? {
          open: toUI(weekendRef.openTime),
          close: toUI(weekendRef.closeTime),
          breakType: toBreakType(weekendRef.breakStart, weekendRef.breakEnd),
          breakStart: toUI(weekendRef.breakStart),
          breakEnd: toUI(weekendRef.breakEnd),
        }
      : { ...defaultDayTime };
    return { selectedDays, hashtags, keywordList, timeSectionValues };
  }

  timeSectionValues.type = "byDay";
  const byDayPatch = makeDefaultByDay();
  for (const h of data.businessHours) {
    const k = dayMapEN2KO[h.day];
    byDayPatch[k] = {
      open: h.isClosed ? "" : toUI(h.openTime),
      close: h.isClosed ? "" : toUI(h.closeTime),
      breakType: h.isClosed ? "없음" : toBreakType(h.breakStart, h.breakEnd),
      breakStart: h.isClosed ? "" : toUI(h.breakStart),
      breakEnd: h.isClosed ? "" : toUI(h.breakEnd),
    };
  }
  timeSectionValues.byDay = byDayPatch;

  return { selectedDays, hashtags, keywordList, timeSectionValues };
}
