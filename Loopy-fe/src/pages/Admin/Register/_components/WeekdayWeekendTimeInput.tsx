import AllDayTimeInput from './AllDayTimeInput';

interface DaySet {
  open: string; close: string;
  breakType: '있음' | '없음';
  breakStart: string; breakEnd: string;
}
interface Props {
  value: { weekday: DaySet; weekend: DaySet };
  onChange: (v: { weekday?: DaySet; weekend?: DaySet }) => void;
}

export default function WeekdayWeekendTimeInput({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <AllDayTimeInput title="평일" value={value.weekday} onChange={(v) => onChange({ weekday: v })} />
      <AllDayTimeInput title="주말" value={value.weekend} onChange={(v) => onChange({ weekend: v })} />
    </div>
  );
}
