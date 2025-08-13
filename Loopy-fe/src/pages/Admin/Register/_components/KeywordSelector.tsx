import { useState } from 'react';
import TagButton from '../../../../components/button/TagButton';
import { filterGroups } from '../../../../constants/filterGroup';

export default function KeywordSelector() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const lineBreaks: Record<string, number[]> = {
        '매장 이용': [2, 5], // 3번째, 6번째 뒤에 줄바꿈
        '메뉴': [1],         // 2번째 뒤에 줄바꿈
    };

    return (
        <div className="bg-[#F5F5F5] p-[1.5rem] rounded-[0.75rem] flex flex-col gap-[2rem]">
            {filterGroups.map((group) => (
                <div key={group.title}>
                    <h3 className="text-[1rem] font-semibold leading-[100%] mb-[1rem]">{group.title}</h3>
                    <div className="flex flex-wrap gap-[0.5rem]">
                        {group.tags.map((tag, idx) => (
                            <div key={tag} className="contents">
                                <TagButton
                                label={tag}
                                selected={selectedTags.includes(tag)}
                                onClick={() => toggleTag(tag)}
                                />
                                {lineBreaks[group.title]?.includes(idx) && (
                                <span className="w-full shrink-0 -mb-[1rem]" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
