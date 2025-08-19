import React, { useState } from 'react';
import SelectableItem from './SelectableItem';
import SelectableDayButton from '../_components/SelectableDayButton';
import AllDayTimeInput from './AllDayTimeInput';
import { type Value as TimeValue } from './AllDayTimeInput';
import WeekdayWeekendTimeInput from './WeekdayWeekendTimeInput';

export type TimeOption = 'all' | 'weekdayWeekend' | 'byDay' | '';

const days = ['월','화','수','목','금','토','일'] as const;
type Day = typeof days[number];

export interface TimeSectionValues {
  type: TimeOption;
  all: TimeValue;
  weekday: TimeValue;
  weekend: TimeValue;
  byDay: Partial<Record<Day, TimeValue>>;
}

const defaultSet = (): TimeValue => ({
  open: '', close: '',
  breakType: '없음',
  breakStart: '', breakEnd: '',
});

interface TimeSectionProps {
  values: TimeSectionValues;
  setValues: React.Dispatch<React.SetStateAction<TimeSectionValues>>;
}

const isFilled = (s?: TimeValue) =>
  !!s && (s.open || s.close || s.breakStart || s.breakEnd || s.breakType === '있음');

const TimeSection = ({ values, setValues }: TimeSectionProps) => {
    const [activeDay, setActiveDay] = useState<Day>('월');

    const handleOption = (option: TimeOption) => {
        setValues(prev => {
            if (prev.type === option) {
                return { ...prev, type: "" };
            }

            const base = { ...prev, type: option };

            if (option === "byDay") {
                return {
                    ...base,
                    byDay: {
                        ...prev.byDay,
                        [activeDay]: prev.byDay[activeDay] ?? defaultSet(),
                    },
                };
            }

            return base;
        });
    };

    const byDayValue = values.byDay[activeDay] ?? defaultSet();
    const setByDayValue = (next: TimeValue) => {
        setValues(prev => {
            const nextByDay: Partial<Record<Day, TimeValue>> = { ...prev.byDay, [activeDay]: next };
            return { ...prev, byDay: nextByDay };
        });
        };

    return (
        <div>
            <div className="font-semibold text-[1rem] mb-[0.5rem]">영업시간</div>

            <div className="flex gap-[1rem] mb-[1rem]">
                <SelectableItem label="모든 영업일이 같아요" selected={values.type === 'all'} onClick={() => handleOption('all')} />
                <SelectableItem label="평일/주말 달라요" selected={values.type === 'weekdayWeekend'} onClick={() => handleOption('weekdayWeekend')} />
                <SelectableItem label="요일별로 달라요" selected={values.type === 'byDay'} onClick={() => handleOption('byDay')} />
            </div>

            {values.type === 'all' && (
                <AllDayTimeInput value={values.all} onChange={v => setValues(prev => ({ ...prev, all: v }))} />
            )}

            {values.type === 'weekdayWeekend' && (
                <WeekdayWeekendTimeInput
                value={{ weekday: values.weekday, weekend: values.weekend }}
                onChange={updated => setValues(prev => ({ ...prev, ...updated }))}
                />
            )}

            {values.type === 'byDay' && (
                <div className="flex flex-col gap-[0.75rem]">
                    <div className="flex flex-wrap gap-[0.5rem]">
                        {days.map(d => {
                            const written = isFilled(values.byDay[d]);
                            const state: 'active' | 'filled' | 'empty' =
                                d === activeDay ? 'active' : written ? 'filled' : 'empty';
                            return (
                                <SelectableDayButton
                                    key={d}
                                    label={d}
                                    state={state}
                                    onClick={() => {
                                        setActiveDay(d);
                                        if (!values.byDay[d]) {
                                        setValues(prev => ({
                                            ...prev,
                                            byDay: { ...prev.byDay, [d]: defaultSet() },
                                        }));
                                        }
                                    }}
                                />
                            );
                        })}
                    </div>
                    <AllDayTimeInput title={activeDay} value={byDayValue} onChange={setByDayValue} />
                </div>
            )}

            {values.type === '' && (
                <div className="text-[0.875rem] text-[#A8A8A8]">옵션을 선택해 영업시간을 입력하세요.</div>
            )}
        </div>
    );
};

export default TimeSection;
