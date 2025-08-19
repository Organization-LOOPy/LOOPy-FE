import { useEffect, useState } from "react";
import { useOwnerMyCafeOperation } from "../../../../../../../hooks/query/admin/setting/useOwnerOperation";
import { useUpdateOwnerCafeOperation } from "../../../../../../../hooks/mutation/admin/patch/useUpdateOperation";
import type { TimeSectionValues } from "../TimeSection";
import type { Day } from "./constants";
import { defaultDayTime, makeDefaultByDay } from "./constants";
import { mapOwnerOperationToForm } from "./mapper";
import type { BusinessHour, UpdateOwnerCafeOperationPayload } from "../../../../../../../apis/admin/register/operation/type";

const dayMapKO2EN: Record<Day, BusinessHour["day"]> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};

export function useOwnerOperationForm() {
  const [selectedDays, setSelectedDays] = useState<Day[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [keywordList, setKeywordList] = useState<string[]>([]);
  const [timeSectionValues, setTimeSectionValues] = useState<TimeSectionValues>({
    type: "",
    all: { ...defaultDayTime },
    weekday: { ...defaultDayTime },
    weekend: { ...defaultDayTime },
    byDay: makeDefaultByDay(),
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { data, isLoading, isError } = useOwnerMyCafeOperation();
  const { mutate: patchOperation } = useUpdateOwnerCafeOperation();

  useEffect(() => {
    if (!data) return;
    const mapped = mapOwnerOperationToForm(data);
    setSelectedDays(mapped.selectedDays);
    setHashtags(mapped.hashtags);
    setKeywordList(mapped.keywordList);
    setTimeSectionValues(mapped.timeSectionValues);
  }, [data]);

  const submitLabel = isFormValid ? "수정 완료하기" : "수정하기";

  const buildBusinessHours = (): BusinessHour[] => {
    if (timeSectionValues.type === "all") {
      return Object.keys(dayMapKO2EN).map((koDay) => {
        const t = timeSectionValues.all;
        const isOpen = selectedDays.includes(koDay as Day);
        return {
          day: dayMapKO2EN[koDay as Day],
          isClosed: !isOpen,
          openTime: isOpen ? t.open : "",
          closeTime: isOpen ? t.close : "",
          breakStart: isOpen && t.breakType === "있음" ? t.breakStart : "",
          breakEnd: isOpen && t.breakType === "있음" ? t.breakEnd : "",
        };
      });
    }

    if (timeSectionValues.type === "weekdayWeekend") {
      return Object.keys(dayMapKO2EN).map((koDay) => {
        const isWeekend = koDay === "토" || koDay === "일";
        const t = isWeekend ? timeSectionValues.weekend : timeSectionValues.weekday;
        const isOpen = selectedDays.includes(koDay as Day);
        return {
          day: dayMapKO2EN[koDay as Day],
          isClosed: !isOpen,
          openTime: isOpen ? t.open : "",
          closeTime: isOpen ? t.close : "",
          breakStart: isOpen && t.breakType === "있음" ? t.breakStart : "",
          breakEnd: isOpen && t.breakType === "있음" ? t.breakEnd : "",
        };
      });
    }

    return Object.entries(timeSectionValues.byDay).map(([koDay, t]) => {
      const isOpen = selectedDays.includes(koDay as Day);
      return {
        day: dayMapKO2EN[koDay as Day],
        isClosed: !isOpen,
        openTime: isOpen ? t.open : "",
        closeTime: isOpen ? t.close : "",
        breakStart: isOpen && t.breakType === "있음" ? t.breakStart : "",
        breakEnd: isOpen && t.breakType === "있음" ? t.breakEnd : "",
      };
    });
  };

  const submit = () => {
    const payload: UpdateOwnerCafeOperationPayload = {
      businessHourType:
        timeSectionValues.type === "all"
          ? "SAME_ALL_DAYS"
          : timeSectionValues.type === "weekdayWeekend"
          ? "WEEKDAY_WEEKEND"
          : "EACH_DAY_DIFFERENT",
      businessHours: buildBusinessHours(),
      breakTime: "",
      keywords: hashtags,
      storeFilters: keywordList,
      takeOutFilters: [],
      menuFilters: [],
    };

    patchOperation(payload);
  };

  return {
    selectedDays,
    setSelectedDays,
    hashtags,
    setHashtags,
    keywordList,
    setKeywordList,
    timeSectionValues,
    setTimeSectionValues,
    isLoading,
    isError,
    isFormValid,
    setIsFormValid,
    submitLabel,
    submit,
  };
}
