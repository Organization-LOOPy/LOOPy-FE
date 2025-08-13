import ClosePurpleIcon from '/src/assets/images/ClosePurple.svg?react'; 

interface RemovableKeywordTagsProps {
    keywords: string[];
    onRemove: (keyword: string) => void;
}

export default function RemovableKeywordTags({
    keywords,
    onRemove,
}: RemovableKeywordTagsProps) {
    return (
        <div className="flex flex-wrap gap-[0.5rem]">
            {keywords.map((keyword, index) => (
                <span
                    key={index}
                    className="flex items-center bg-[#F0F1FE] px-[0.5rem] py-[0.25rem] rounded-[0.25rem] text-[0.75rem] text-[#6970F3]"
                >
                    #{keyword}
                    <button
                        onClick={() => onRemove(keyword)}
                        className="ml-[0.25rem] w-[0.875rem] h-[0.875rem] flex items-center justify-center"
                    >
                        <ClosePurpleIcon className="w-[0.5rem] h-[0.5rem]" />
                    </button>
                </span>
            ))}
        </div>
    );
}
