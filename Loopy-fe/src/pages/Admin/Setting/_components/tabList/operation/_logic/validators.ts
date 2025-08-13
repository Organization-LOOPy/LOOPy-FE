import type { TimeSectionValues } from "../TimeSection";

export function timeSectionIsValid(values: TimeSectionValues) {
  if (values.type === "all") {
    return (
      !!values.all.open &&
      !!values.all.close &&
      (values.all.breakType === "없음" ||
        (!!values.all.breakStart && !!values.all.breakEnd))
    );
  }
  if (values.type === "weekdayWeekend") {
    return (
      !!values.weekday.open && !!values.weekday.close &&
      (values.weekday.breakType === "없음" ||
        (!!values.weekday.breakStart && !!values.weekday.breakEnd)) &&
      !!values.weekend.open && !!values.weekend.close &&
      (values.weekend.breakType === "없음" ||
        (!!values.weekend.breakStart && !!values.weekend.breakEnd))
    );
  }
  if (values.type === "byDay") {
    return Object.values(values.byDay).every(v =>
      !!v.open && !!v.close &&
      (v.breakType === "없음" || (!!v.breakStart && !!v.breakEnd))
    );
  }
  return false;
}

export function isOperationFormValid(
  selectedDaysLen: number,
  hashtagsLen: number,
  keywordListLen: number,
  values: TimeSectionValues
) {
  return (
    selectedDaysLen > 0 &&
    hashtagsLen > 0 && hashtagsLen <= 2 &&
    keywordListLen > 0 &&
    timeSectionIsValid(values)
  );
}
