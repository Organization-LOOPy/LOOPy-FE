export function validateTime(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;
  const hour = parseInt(match[1], 10);
  const min = parseInt(match[2], 10);
  return hour < 24 && min < 60;
}

export function formatTimeInput(value: string) {
  let digits = value.replace(/\D/g, "");
  if (digits.length > 4) digits = digits.slice(0, 4);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return digits;

  let hour = digits.slice(0, 2);
  let min = digits.slice(2);

  if (parseInt(hour, 10) > 23) hour = "23";
  if (min.length > 0) {
    if (parseInt(min, 10) > 59) min = "59";
    if (min.length === 1 && parseInt(min, 10) > 5) min = "5";
  }

  return hour + (min ? ":" + min : "");
}

interface TimeInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TimeInput = ({ value, onChange, placeholder }: TimeInputProps) => {
  const isValid = value.length === 0 || validateTime(value);

  let borderClass = "border-none";
  if (value.length > 0) {
    borderClass = isValid ? "border-[#6970F3]" : "border-red-500";
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        inputMode="numeric"
        placeholder={placeholder ?? "00:00"}
        maxLength={5}
        value={value}
        onChange={e => onChange(formatTimeInput(e.target.value))}
        className={
          `rounded-[8px] px-2 bg-white py-[0.75rem] w-[6.25rem] text-center text-[1rem] 
          focus:outline-none border ${borderClass}`
        }
      />
    </div>
  );
};

export default TimeInput;
