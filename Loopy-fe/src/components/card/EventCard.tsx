import CommonCard from "./CommonCard";
import ArrowRightIcon from "/src/assets/images/ArrowRight.svg?react";

interface Props {
    imageSrc: string; 
    monthLabel: string; 
    title: string; // 제목
    description: string; // 설명
    onClick: () => void; // 버튼 클릭 시 실행될 이벤트
}

const EventCard = ({ imageSrc, monthLabel, title, description, onClick }: Props) => {
    return (
        <CommonCard
            className="flex items-center justify-between bg-[#F0F1FE] h-[6.5rem]"
            padding="p-4" 
        >
            <div className="flex items-center overflow-hidden">
                <img
                src={imageSrc}
                alt="이벤트 이미지"
                className="w-[3.875rem] h-[3.875rem] rounded-full object-cover"
                />

                <div className="ml-[1rem] flex flex-col">
                <span className="text-[0.75rem] font-normal text-[#6970F3]">
                    {monthLabel}
                </span>
                <span className="mt-[0.5rem] text-[1rem] font-semibold text-[#000000] leading-[1.25rem] truncate">
                    {title}
                </span>
                <span className="mt-[0.25rem] text-[0.875rem] font-normal text-[#7F7F7F] leading-[1.125rem]">
                    {description}
                </span>
                </div>
            </div>

            <button onClick={onClick} className="ml-[1rem]">
                <ArrowRightIcon
                    className="w-[1.5rem] h-[1.5rem] text-[#A8A8A8]"
                />
            </button>
        </CommonCard>
    );
};

export default EventCard;
