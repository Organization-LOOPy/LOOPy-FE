import TimeInput from "./TimeInput";
import CheckCircle from "../../../../../User/Signin/_components/CheckCircle";

interface SingleDayTimeCardProps {
  label: string;
  open: string;
  close: string;
  setOpen: (v: string) => void;
  setClose: (v: string) => void;
  breakType: "있음" | "없음";
  setBreakType: (v: "있음" | "없음") => void;
  breakStart: string;
  setBreakStart: (v: string) => void;
  breakEnd: string;
  setBreakEnd: (v: string) => void;
}

const SingleDayTimeCard = ({
  label, open, close, setOpen, setClose,
  breakType, setBreakType,
  breakStart, setBreakStart,
  breakEnd, setBreakEnd
}: SingleDayTimeCardProps) => (
  <div className="rounded-[8px] p-6 bg-[#F3F3F3] w-full">
    <div className="font-semibold mb-3">{label}</div>
    <div className="flex items-center gap-2 mb-4">
      <TimeInput value={open} onChange={setOpen} />
      <span>~</span>
      <TimeInput value={close} onChange={setClose} />
    </div>
    <div className="mb-2 font-semibold">브레이크 타임</div>
    <div className="flex gap-4 mb-3">
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() => setBreakType("있음")}
      >
        <CheckCircle checked={breakType === "있음"} />
        <span className={`ml-2 text-[1rem] font-medium ${breakType === "있음" ? "text-[#6970F3]" : "text-[#222]"}`}>
          있음
        </span>
      </button>
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() => setBreakType("없음")}
      >
        <CheckCircle checked={breakType === "없음"} />
        <span className={`ml-2 text-[1rem] font-medium ${breakType === "없음" ? "text-[#6970F3]" : "text-[#222]"}`}>
          없음
        </span>
      </button>
    </div>
    {breakType === "있음" && (
      <div className="flex items-center gap-2">
        <TimeInput value={breakStart} onChange={setBreakStart} />
        <span>~</span>
        <TimeInput value={breakEnd} onChange={setBreakEnd} />
      </div>
    )}
  </div>
);

export default SingleDayTimeCard;
