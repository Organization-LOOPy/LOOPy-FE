import AllDayTimeInput from './AllDayTimeInput';

const days = ['월','화','수','목','금','토','일'] as const;
type Day = typeof days[number];

interface DaySet {
  open: string; close: string;
  breakType: '있음' | '없음';
  breakStart: string; breakEnd: string;
}
interface Props {
  value: Record<string, DaySet>;
  onChange: (v: Record<string, DaySet>) => void;
}

export default function ByDayTimeInput({ value, onChange }: Props) {
  const setDay = (d: Day, v: DaySet) => onChange({ ...value, [d]: v });

  return (
    <div className="flex flex-col gap-[0.5rem]">
      {days.map((d) => (
        <AllDayTimeInput
          key={d}
          title={d}
          value={value[d] || { open: '', close: '', breakType: '없음', breakStart: '', breakEnd: '' }}
          onChange={(v) => setDay(d, v)}
        />
      ))}
    </div>
  );
}
