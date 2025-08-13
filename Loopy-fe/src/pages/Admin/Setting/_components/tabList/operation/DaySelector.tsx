import CheckCircle from "../../../../../User/Signin/_components/CheckCircle";

export type Day = "월" | "화" | "수" | "목" | "금" | "토" | "일";
const week: Day[] = ["월", "화", "수", "목", "금", "토", "일"];

const DaySelector = ({
  selectedDays,
  setSelectedDays,
}: {
  selectedDays: Day[];
  setSelectedDays: (days: Day[]) => void;
}) => {
  const allSelected = selectedDays.length === week.length;

  const handleNoHolidayToggle = () => {
    if (allSelected) setSelectedDays([]);   
    else setSelectedDays(week);
  };

  return (
    <div>
      <div className="font-semibold text-[1rem] mb-4">운영일</div>
      <button
        type="button"
        className="flex items-center mb-4"
        onClick={handleNoHolidayToggle}
      >
        <CheckCircle checked={allSelected}/>
        <span
          className={`ml-2 text-[1rem] font-medium transition
            ${allSelected ? "text-[#6970F3]" : "text-black"}`}
        >
          휴무일이 없어요
        </span>
      </button>

      <div className="flex gap-2">
        {week.map((day) => {
          const checked = selectedDays.includes(day);
          return (
            <button
              key={day}
              type="button"
              onClick={() => {
                setSelectedDays(
                  checked
                    ? selectedDays.filter((d) => d !== day)
                    : [...selectedDays, day]
                );
              }}
              className={`px-[0.75rem] py-[0.5rem] flex items-center justify-center rounded-[4px] border outline-none
                text-[0.875rem] font-medium
                ${checked
                  ? "text-[#6970F3] bg-[#F0F1FE] border-[#6970F3]"
                  : "bg-[#F3F3F3] text-[#222] border-[#A8A8A8]"} 
                transition`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DaySelector;
