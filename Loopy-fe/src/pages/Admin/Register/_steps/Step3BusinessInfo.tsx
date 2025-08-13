import { useState } from 'react';
import SelectableDayButton from '../_components/SelectableDayButton';
import KeywordSelector from '../_components/KeywordSelector';
import BasicInput from '../_components/BasicInput';
import AddButton from '../_components/AddButton';
import RemovableKeywordTags from '../_components/RemovableKeywordTags';
import TimeSection from '../_components/TimeSection';
import type { TimeSectionValues } from '../_components/TimeSection';
import SelectableItem from '../_components/SelectableItem';

const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

export default function Step3BusinessInfo() {
    const [noHolidays, setNoHolidays] = useState(false);
    const [closedDays, setClosedDays] = useState<string[]>([]);

    const toggleNoHolidays = () => {
        if (noHolidays) {
            setNoHolidays(false);
            setClosedDays([]);
        } else {
            setNoHolidays(true);
            setClosedDays(weekDays);
        }
    };

    const toggleClosedDay = (day: string) => {
        setClosedDays((prev) => {
            let newDays: string[];

            if (prev.includes(day)) {
                newDays = prev.filter((d) => d !== day);
                setNoHolidays(false);
            } else {
                newDays = [...prev, day];
            }

            if (newDays.length === weekDays.length) {
                setNoHolidays(true);
            }

            return newDays;
        });
    };

    const [timeValues, setTimeValues] = useState<TimeSectionValues>({
        type: 'all',
        all: { open: '', close: '', breakType: '없음', breakStart: '', breakEnd: '' },
        weekday: { open: '', close: '', breakType: '없음', breakStart: '', breakEnd: '' },
        weekend: { open: '', close: '', breakType: '없음', breakStart: '', breakEnd: '' },
        byDay: {}, 
    });

    const [hashtagInput, setHashtagInput] = useState('');
    const [hashtags, setHashtags] = useState<string[]>([]);

    const handleAddHashtag = () => {
        if (hashtagInput.trim() && hashtags.length < 2) {
        setHashtags([...hashtags, hashtagInput.trim()]);
        setHashtagInput('');
        }
    };

    return (
        <div className="w-full bg-white px-[1.5rem] pt-[2rem] pb-[5rem] font-suit">
            <div className="max-w-[544px] mx-auto flex flex-col gap-[2rem]">

                <h1 className="text-[1.25rem] font-bold text-[#252525]">
                    우리 매장의 운영정보를 입력해주세요
                </h1>

                {/* 운영형태 */}
                <div className='mt-[0.5rem]'>
                    <div className="text-[1rem] font-semibold leading-[100%]">운영일</div>
                    <div className="flex flex-col mt-[1rem]">
                        <SelectableItem
                            label="휴무일이 없어요"
                            selected={noHolidays}
                            onClick={toggleNoHolidays}
                        />
                        <div className="flex gap-[0.5rem] flex-wrap mt-[1rem]">
                            {weekDays.map((day) => (
                                <SelectableDayButton
                                    key={day}
                                    label={day}
                                    selected={closedDays.includes(day)}
                                    onClick={() => toggleClosedDay(day)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* 영업시간 */}
                <div>
                    <TimeSection values={timeValues} setValues={setTimeValues} />
                </div>

                {/* 해시태그 */} 
                <div>
                    <div className="text-[1rem] font-semibold mb-[0.5rem] leading-[100%]">대표 해시태그</div>
                    <p className="text-[0.875rem] text-[#7F7F7F] mb-[0.75rem] leading-[100%]">
                        해시태그는 최대 2개까지 가능해요 (예시: 말차 맛집)
                    </p>

                    <div className="flex flex-1 items-center gap-[0.5rem] mb-[0.75rem] shrink-0">
                        <BasicInput
                        placeholder="대표 해시태그를 입력해주세요"
                        value={hashtagInput}
                        onChange={(e) => setHashtagInput(e.target.value)}
                        disabled={hashtags.length >= 2}
                        />

                        <AddButton
                        text="추가하기"
                        onClick={handleAddHashtag}
                        disabled={hashtags.length >= 2}
                        className={`
                            text-white min-w-[5.5rem] whitespace-nowrap px-[1rem] py-[0.75rem]
                            ${hashtags.length >= 2 ? 'bg-[#CCCCCC] text-[#7F7F7F] pointer-events-none' : ''}
                        `}
                        />
                    </div>

                    {hashtags.length > 0 && (
                        <RemovableKeywordTags
                            keywords={hashtags}
                            onRemove={(tag) =>
                            setHashtags((prev) => prev.filter((t) => t !== tag))
                            }
                        />
                    )}
                </div>

                {/* 카페 키워드 */}
                <div>
                    <div className="text-[1rem] font-semibold mb-[0.75rem]">카페 키워드</div>
                    <KeywordSelector />
                </div>
            </div>
        </div>
    );
}