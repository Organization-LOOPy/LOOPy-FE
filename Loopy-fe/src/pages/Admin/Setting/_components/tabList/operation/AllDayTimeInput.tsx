import TimeInput from "./TimeInput";
import CheckCircle from "../../../../../User/Signin/_components/CheckCircle";

interface AllDayTimeCardProps {
  value: {
    open: string;
    close: string;
    breakType: "있음" | "없음";
    breakStart: string;
    breakEnd: string;
  };
  onChange: (value: AllDayTimeCardProps["value"]) => void;
}

const AllDayTimeCard = ({ value, onChange }: AllDayTimeCardProps) => {
  const handleChange = (field: keyof AllDayTimeCardProps["value"], v: string) => {
    onChange({ ...value, [field]: v });
  };

  return (
    <div className="rounded-[8px] bg-[#F3F3F3] p-6 w-full">
      <div className="font-semibold mb-3">영업시간</div>
      <div className="flex items-center gap-2 mb-4">
        <TimeInput value={value.open} onChange={v => handleChange("open", v)} />
        <span>~</span>
        <TimeInput value={value.close} onChange={v => handleChange("close", v)} />
      </div>

      <div className="mb-2 font-semibold">브레이크 타임</div>
      <div className="flex gap-4 mb-3">
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => handleChange("breakType", "있음")}
        >
          <CheckCircle checked={value.breakType === "있음"} />
          <span className={`ml-2 text-[1rem] font-medium ${value.breakType === "있음" ? "text-[#6970F3]" : "text-[#222]"}`}>있음</span>
        </button>
        <button
          type="button"
          className="flex items-center gap-1"
          onClick={() => handleChange("breakType", "없음")}
        >
          <CheckCircle checked={value.breakType === "없음"} />
          <span className={`ml-2 text-[1rem] font-medium ${value.breakType === "없음" ? "text-[#6970F3]" : "text-[#222]"}`}>없음</span>
        </button>
      </div>
      {value.breakType === "있음" && (
        <div className="flex items-center gap-2">
          <TimeInput value={value.breakStart} onChange={v => handleChange("breakStart", v)} />
          <span>~</span>
          <TimeInput value={value.breakEnd} onChange={v => handleChange("breakEnd", v)} />
        </div>
      )}
    </div>
  );
};

export default AllDayTimeCard;
