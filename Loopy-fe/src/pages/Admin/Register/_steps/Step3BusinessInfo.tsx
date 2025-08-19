import { useState } from "react";
import SelectableDayButton from "../_components/SelectableDayButton";
import KeywordSelector from "../_components/KeywordSelector";
import BasicInput from "../_components/BasicInput";
import AddButton from "../_components/AddButton";
import RemovableKeywordTags from "../_components/RemovableKeywordTags";
import TimeSection from "../_components/TimeSection";
import type { TimeSectionValues } from "../_components/TimeSection";
import SelectableItem from "../_components/SelectableItem";
import CommonButton from "../../../../components/button/CommonButton";
import { useUpdateOwnerCafeOperation } from "../../../../hooks/mutation/admin/patch/useUpdateOperation";
import type { UpdateOwnerCafeOperationPayload, BusinessHour } from "../../../../apis/admin/register/operation/type";

const weekDays = ["월", "화", "수", "목", "금", "토", "일"] as const;
type WeekDay = typeof weekDays[number];

const dayMap: Record<WeekDay, UpdateOwnerCafeOperationPayload["businessHours"][number]["day"]> = {
  월: "MONDAY",
  화: "TUESDAY",
  수: "WEDNESDAY",
  목: "THURSDAY",
  금: "FRIDAY",
  토: "SATURDAY",
  일: "SUNDAY",
};

interface Step3BusinessInfoProps {
  onNext?: () => void;
}

export default function Step3BusinessInfo({ onNext }: Step3BusinessInfoProps) {
  const [noHolidays, setNoHolidays] = useState(false);
  const [closedDays, setClosedDays] = useState<WeekDay[]>([]);

  const toggleNoHolidays = () => {
    if (noHolidays) {
      setNoHolidays(false);
      setClosedDays([]);
    } else {
      setNoHolidays(true);
      setClosedDays([...weekDays]); 
    }
  };

  const toggleClosedDay = (day: WeekDay) => {
    setClosedDays((prev) => {
      let newDays: WeekDay[];

      if (prev.includes(day)) {
        newDays = prev.filter((d) => d !== day);
        setNoHolidays(false);
      } else {
        newDays = [...prev, day];
      }

      if (newDays.length === weekDays.length) {
        setNoHolidays(true);
      }

      return newDays;
    });
  };

  const [timeValues, setTimeValues] = useState<TimeSectionValues>({
    type: "" as "" | "all" | "weekdayWeekend" | "byDay",
    all: { open: "", close: "", breakType: "없음", breakStart: "", breakEnd: "" },
    weekday: { open: "", close: "", breakType: "없음", breakStart: "", breakEnd: "" },
    weekend: { open: "", close: "", breakType: "없음", breakStart: "", breakEnd: "" },
    byDay: {},
  });

  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleAddHashtag = () => {
    if (hashtagInput.trim() && hashtags.length < 2) {
      setHashtags([...hashtags, hashtagInput.trim()]);
      setHashtagInput("");
    }
  };

  const { mutate, isPending } = useUpdateOwnerCafeOperation({
    onSuccess: (res) => {
      console.log("운영정보 수정 성공:", res);
      onNext?.();
    },
    onError: (err) => {
      console.error("운영정보 수정 실패:", err);
    },
  });

const isFormValid =
  hashtags.length >= 0 &&
  (
    noHolidays || closedDays.length > 0
  ) &&
  (
    timeValues.type === "all"
      ? timeValues.all.open && timeValues.all.close
      : timeValues.type === "weekdayWeekend"
      ? timeValues.weekday.open && timeValues.weekday.close && timeValues.weekend.open && timeValues.weekend.close
      : weekDays.every(day => {
          if (closedDays.includes(day)) return true; 
          const t = timeValues.byDay[day as WeekDay];
          return t?.open && t?.close;
        })
  );



  const handleSubmit = () => {
    const businessHours: BusinessHour[] = weekDays.map((day) => {
        const isClosed = closedDays.includes(day);

        const times =
        timeValues.type === "all"
            ? timeValues.all
            : timeValues.type === "weekdayWeekend"
            ? ["토", "일"].includes(day)
            ? timeValues.weekend
            : timeValues.weekday
            : timeValues.byDay[day as WeekDay] || {
                open: "",
                close: "",
                breakType: "없음",
                breakStart: "",
                breakEnd: "",
            };

        return {
        day: dayMap[day],
        isClosed,
        openTime: times.open || "",
        closeTime: times.close || "",
        breakStart: times.breakType !== "없음" ? times.breakStart || "" : "",
        breakEnd: times.breakType !== "없음" ? times.breakEnd || "" : "",
        };
    });

    const payload: UpdateOwnerCafeOperationPayload = {
        businessHourType:
        timeValues.type === "weekdayWeekend"
            ? "WEEKDAY_WEEKEND"
            : timeValues.type === "all"
            ? "SAME_ALL_DAYS"
            : "EACH_DAY_DIFFERENT",
        businessHours,
        breakTime:
        timeValues.all.breakType !== "없음" &&
        timeValues.all.breakStart &&
        timeValues.all.breakEnd
            ? `${timeValues.all.breakStart}~${timeValues.all.breakEnd}`
            : null,
        keywords: hashtags,
        storeFilters: [],
        takeOutFilters: [],
        menuFilters: [],
    };

    mutate(payload);
  };

  return (
    <div className="w-full bg-white font-suit flex flex-col min-h-screen">
      <div className="flex-1 px-[1.5rem] pt-[2rem] pb-[5rem]">
        <div className="max-w-[544px] mx-auto flex flex-col gap-[2rem]">
          <h1 className="text-[1.25rem] font-bold text-[#252525]">
            우리 매장의 운영정보를 입력해주세요
          </h1>

          <div className="mt-[0.5rem]">
            <div className="text-[1rem] font-semibold leading-[100%]">운영일</div>
            <div className="flex flex-col mt-[1rem]">
              <div role="button" tabIndex={0} onClick={toggleNoHolidays}>
                <SelectableItem
                  label="휴무일이 없어요"
                  selected={noHolidays}
                  onClick={toggleNoHolidays}
                />
              </div>
              <div className="flex gap-[0.5rem] flex-wrap mt-[1rem]">
                {weekDays.map((day) => (
                  <SelectableDayButton
                    key={day}
                    label={day}
                    selected={closedDays.includes(day)}
                    onClick={() => toggleClosedDay(day)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <TimeSection values={timeValues} setValues={setTimeValues} />
          </div>

          <div>
            <div className="text-[1rem] font-semibold mb-[0.5rem] leading-[100%]">
              대표 해시태그
            </div>
            <p className="text-[0.875rem] text-[#7F7F7F] mb-[0.75rem] leading-[100%]">
              해시태그는 최대 2개까지 가능해요 (예시: 말차 맛집)
            </p>

            <div className="flex flex-1 items-center gap-[0.5rem] mb-[0.75rem] shrink-0">
              <BasicInput
                placeholder="대표 해시태그를 입력해주세요"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                disabled={hashtags.length >= 2}
              />

              <AddButton
                text="추가하기"
                onClick={handleAddHashtag}
                disabled={hashtags.length >= 2}
                className={`text-white min-w-[5.5rem] whitespace-nowrap px-[1rem] py-[0.75rem] ${
                  hashtags.length >= 2
                    ? "bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none"
                    : ""
                }`}
              />
            </div>

            {hashtags.length > 0 && (
              <RemovableKeywordTags
                keywords={hashtags}
                onRemove={(tag) => setHashtags((prev) => prev.filter((t) => t !== tag))}
              />
            )}
          </div>

          <div>
            <div className="text-[1rem] font-semibold mb-[0.75rem]">카페 키워드</div>
            <KeywordSelector />
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full px-[1.5rem] pt-[1rem] pb-[2rem] max-w-[1024px] flex justify-center bg-white">
        <CommonButton
          text="다음으로 넘어가기"
          onClick={handleSubmit}
          disabled={isPending || !isFormValid}
          className="w-full max-w-[34rem] bg-[#6970F3] text-white"
        />
      </div>
    </div>
  );
}
