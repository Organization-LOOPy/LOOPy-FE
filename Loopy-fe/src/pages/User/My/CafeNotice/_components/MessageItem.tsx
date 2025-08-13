import { useState } from "react";
import CommonCard from "../../../../../components/card/CommonCard";

interface MessageItemProps {
  sender: string;
  avatar: string;
  content: string;
  date: string;
  isNew: boolean;
}

const MessageItem = ({ sender, avatar, content, date, isNew }: MessageItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const showMore = content.length > 30;
  const cardBg = isNew ? "bg-[#F0F1FE]" : "bg-[#F3F3F3]";

  const displayContent = showMore ? (
  <span onClick={() => setIsExpanded((prev) => !prev)} className="cursor-pointer">
    {!isExpanded ? (
      <>
        {content.slice(0, 30)}
        <span className="text-[#A8A8A8]">...더보기</span>
      </>
    ) : (
      content
    )}
  </span>
) : (
  content
);


  return (
    <CommonCard padding="p-4" className={`relative ${cardBg}`}>
      <div className="flex gap-2 items-start">
        {avatar ? (
          <img
            src={avatar}
            alt="avatar"
            className="w-6 h-6 rounded-full object-cover shrink-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = "none";
              target.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className={avatar ? "hidden w-6 h-6 rounded-full bg-[#434343] shrink-0" : "w-6 h-6 rounded-full bg-[#434343] shrink-0"} />

        <div className="flex flex-col w-full">
          <p className="text-[1rem] font-semibold text-[#252525] mb-1">{sender}</p>
          <div className="relative">
            <div className="text-[0.875rem] text-[#252525] font-normal whitespace-pre-line pr-[4.5rem] leading-[1.25rem]">
              {displayContent}
            </div>

            <span className="absolute bottom-0 right-0 text-[0.75rem] text-[#7F7F7F] font-normal whitespace-nowrap">
              {date}
            </span>
          </div>
        </div>
      </div>

      {isNew && (
        <span className="absolute top-4 right-4 w-[6px] h-[6px] bg-[#FF2E00] rounded-full" />
      )}
    </CommonCard>
  );
};

export default MessageItem;
