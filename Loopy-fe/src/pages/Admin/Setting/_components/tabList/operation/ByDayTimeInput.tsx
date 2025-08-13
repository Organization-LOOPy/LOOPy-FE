import { useState } from "react";
import TimeInput, { formatTimeInput } from "./TimeInput";
import CheckCircle from "../../../../../User/Signin/_components/CheckCircle";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
export const week: Day[] = ["월", "화", "수", "목", "금", "토", "일"];

type ByDayTimeValue = {
  open: string;
  close: string;
  breakType: "있음" | "없음";
  breakStart: string;
  breakEnd: string;
};

interface ByDayTimeCardProps {
  value: Record<Day, ByDayTimeValue>;
  onChange: (next: Record<Day, ByDayTimeValue>) => void;
}

const defaultValue: ByDayTimeValue = {
  open: "",
  close: "",
  breakType: "없음",
  breakStart: "",
  breakEnd: "",
};

const ByDayTimeCard = ({ value, onChange }: ByDayTimeCardProps) => {
  const [selectedDay, setSelectedDay] = useState<Day>("월");

  const handleTimeChange = (
    field: keyof ByDayTimeValue,
    rawValue: string
  ) => {
    let formatted: string | "있음" | "없음" =
      field === "breakType"
        ? (rawValue === "있음" ? "있음" : "없음")
        : formatTimeInput(rawValue);

    const next: Record<Day, ByDayTimeValue> = {
      ...value,
      [selectedDay]: {
        ...((value[selectedDay] as ByDayTimeValue) || defaultValue),
        [field]: formatted,
      },
    };
    onChange(next);
  };

  const handleDaySelect = (day: Day) => {
    setSelectedDay(day);
    if (!value[day]) {
      const next: Record<Day, ByDayTimeValue> = {
        ...value,
        [day]: { ...defaultValue },
      };
      onChange(next);
    }
  };

  const cur = value[selectedDay] || defaultValue;

  return (
    <>
      <div className="flex gap-2 mb-4">
        {week.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => handleDaySelect(day)}
            className={`px-[0.75rem] py-[0.5rem] flex items-center justify-center rounded-[4px] border outline-none
              text-[0.875rem] font-medium
              ${selectedDay === day
                ? "text-[#6970F3] bg-[#F0F1FE] border-[#6970F3]"
                : "bg-[#F3F3F3] text-[#222] border-[#A8A8A8]"}
              transition`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="rounded-[8px] p-6 bg-[#F3F3F3] w-full">
        <div className="font-semibold text-[1rem] text-[#252525] mb-3">영업시간</div>
        <div className="flex items-center gap-2 mb-4">
          <TimeInput
            value={cur.open}
            onChange={v => handleTimeChange("open", v)}
          />
          <span>~</span>
          <TimeInput
            value={cur.close}
            onChange={v => handleTimeChange("close", v)}
          />
        </div>
        <div className="mb-3 font-semibold">브레이크 타임</div>
        <div className="flex gap-4 mb-2">
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => handleTimeChange("breakType", "있음")}
          >
            <CheckCircle checked={cur.breakType === "있음"} />
            <span className={`ml-2 text-[1rem] font-medium ${cur.breakType === "있음" ? "text-[#6970F3]" : "text-[#222]"}`}>
              있음
            </span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => handleTimeChange("breakType", "없음")}
          >
            <CheckCircle checked={cur.breakType === "없음"} />
            <span className={`ml-2 text-[1rem] font-medium ${cur.breakType === "없음" ? "text-[#6970F3]" : "text-[#222]"}`}>
              없음
            </span>
          </button>
        </div>
        {cur.breakType === "있음" && (
          <div className="flex items-center gap-2">
            <TimeInput
              value={cur.breakStart}
              onChange={v => handleTimeChange("breakStart", v)}
            />
            <span>~</span>
            <TimeInput
              value={cur.breakEnd}
              onChange={v => handleTimeChange("breakEnd", v)}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ByDayTimeCard;
