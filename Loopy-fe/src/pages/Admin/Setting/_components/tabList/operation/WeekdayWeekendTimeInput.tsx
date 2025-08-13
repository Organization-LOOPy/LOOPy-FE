import SingleDayTimeCard from "./SingleDayTimeCard";

export interface DayTimeValue {
  open: string;
  close: string;
  breakType: "있음" | "없음";
  breakStart: string;
  breakEnd: string;
}

interface Props {
  value: {
    weekday: DayTimeValue;
    weekend: DayTimeValue;
  };
  onChange: (v: { weekday: DayTimeValue; weekend: DayTimeValue }) => void;
}

const WeekdayWeekendTimeInput = ({ value, onChange }: Props) => {
  const handleWeekdayChange = (fields: Partial<DayTimeValue>) => {
    onChange({
      ...value,
      weekday: { ...value.weekday, ...fields },
    });
  };

  const handleWeekendChange = (fields: Partial<DayTimeValue>) => {
    onChange({
      ...value,
      weekend: { ...value.weekend, ...fields },
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <SingleDayTimeCard
        label="평일"
        open={value.weekday.open}
        close={value.weekday.close}
        setOpen={open => handleWeekdayChange({ open })}
        setClose={close => handleWeekdayChange({ close })}
        breakType={value.weekday.breakType}
        setBreakType={breakType => handleWeekdayChange({ breakType })}
        breakStart={value.weekday.breakStart}
        setBreakStart={breakStart => handleWeekdayChange({ breakStart })}
        breakEnd={value.weekday.breakEnd}
        setBreakEnd={breakEnd => handleWeekdayChange({ breakEnd })}
      />
      <SingleDayTimeCard
        label="주말"
        open={value.weekend.open}
        close={value.weekend.close}
        setOpen={open => handleWeekendChange({ open })}
        setClose={close => handleWeekendChange({ close })}
        breakType={value.weekend.breakType}
        setBreakType={breakType => handleWeekendChange({ breakType })}
        breakStart={value.weekend.breakStart}
        setBreakStart={breakStart => handleWeekendChange({ breakStart })}
        breakEnd={value.weekend.breakEnd}
        setBreakEnd={breakEnd => handleWeekendChange({ breakEnd })}
      />
    </div>
  );
};

export default WeekdayWeekendTimeInput;
