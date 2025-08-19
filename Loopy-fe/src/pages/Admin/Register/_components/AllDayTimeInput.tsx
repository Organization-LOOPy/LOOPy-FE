import TimeInput from '../../Setting/_components/tabList/operation/TimeInput';
import { formatTimeInput } from '../../Setting/_components/tabList/operation/TimeInput';
import SelectableItem from './SelectableItem';
import { isRangeValid, isBreakValid } from '../../../../utils/timeValidation';

export interface Value {
  open: string; close: string;
  breakType: '있음' | '없음';
  breakStart: string; breakEnd: string;
}

interface Props {
  value: Value;
  onChange: (v: Value) => void;
  title?: string;
}

export default function AllDayTimeInput({ value, onChange, title }: Props) {
    const { open, close, breakType, breakStart, breakEnd } = value;
    const set = (patch: Partial<Value>) => onChange({ ...value, ...patch });

    const rangeInvalid = open && close && !isRangeValid(open, close);
    const breakInvalid  = !isBreakValid(open, close, breakType, breakStart, breakEnd);

    return (
        <div className="bg-[#F5F5F5] p-[1.5rem] rounded-[0.75rem] flex flex-col gap-[1rem]">
            {title && <div className="text-[1rem] font-semibold text-[#7F7F7F]">{title}</div>}

                <>
                    <div className="flex flex-col gap-[0.75rem]">
                        <div className="text-[1rem] font-semibold leading-[100%]">영업시간</div>
                            <div className="flex items-center gap-[0.75rem]">
                            <TimeInput value={open} onChange={(v) => set({ open: formatTimeInput(v) })} />
                            <span className="text-[1rem]">~</span>
                            <TimeInput value={close} onChange={(v) => set({ close: formatTimeInput(v) })} />
                        </div>
                    </div>
                    {rangeInvalid && <p className="text-[0.75rem] text-red-500 leading-[100%] mt-[0.5rem]">종료시간은 시작 이후여야 합니다.</p>}
                </>
                
            <div>
                <div className="text-[1rem] font-semibold leading-[100%]">브레이크 타임</div>
                <div className="flex items-center gap-[1rem] mt-[0.75rem] mb-[0.75rem]">
                    <div className="flex items-center gap-[1rem] mt-[0.75rem] mb-[0.75rem]">
                        <SelectableItem
                            label="있음"
                            selected={breakType === '있음'}
                            onClick={() => set({ breakType: '있음' })}
                        />
                        <SelectableItem
                            label="없음"
                            selected={breakType === '없음'}
                            onClick={() => set({ breakType: '없음' })}
                        />
                    </div>
                </div>

                {breakType === '있음' && (
                <>
                    <div className="flex items-center gap-[0.75rem]">
                    <TimeInput value={breakStart} onChange={(v) => set({ breakStart: formatTimeInput(v) })} />
                    <span className="text-[1rem]">~</span>
                    <TimeInput value={breakEnd} onChange={(v) => set({ breakEnd: formatTimeInput(v) })} />
                    </div>
                    {breakInvalid && (
                    <p className="text-[0.75rem] text-red-500 leading-[100%] mt-[0.5rem]">
                        브레이크는 영업시간 안에서 시작 &lt; 종료여야 합니다.
                    </p>
                    )}
                </>
                )}
            </div>
        </div>
    );
}
