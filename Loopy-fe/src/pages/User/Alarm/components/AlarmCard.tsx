import React, { useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Notification } from '../../../../apis/alarm/type';
dayjs.extend(relativeTime);

interface AlarmCardProps {
  alarm: Notification;
}

const getTimeAgo = (createdAt: string) => {
  const now = dayjs();
  const created = dayjs(createdAt);
  const diffMinutes = now.diff(created, 'minute');
  const diffHours = now.diff(created, 'hour');
  const diffDays = now.diff(created, 'day');

  if (diffMinutes < 60) return `${diffMinutes}분 전`;
  else if (diffHours < 24) return `${diffHours}시간 전`;
  else return `${diffDays}일 전`;
};

const AlarmCard: React.FC<AlarmCardProps> = ({ alarm }) => {
  const content = typeof alarm.content || alarm.title;
  const timeAgo = getTimeAgo(alarm.createdAt);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isRead, setIsRead] = useState(alarm.isRead ?? false);

  const showMore = content.length > 30;

  const displayContent = showMore ? (
    <span
      onClick={() => setIsExpanded((prev) => !prev)}
      className="cursor-pointer"
    >
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
    <div
      className={`relative w-full p-4 mb-2 rounded-lg cursor-pointer ${isRead ? 'bg-[#F3F3F3]' : 'bg-[#F0F1FE]'}`}
      onClick={() => setIsRead(true)}
    >
      <div className="flex gap-2 items-start">
        <div className="flex flex-col w-full">
          <div className="relative">
            <div className="text-[0.875rem] text-[#252525] font-normal whitespace-pre-line pr-[4.5rem] leading-[1.25rem]">
              {displayContent}
            </div>
            <span className="absolute bottom-0 right-0 text-[0.75rem] text-[#7F7F7F] font-normal whitespace-nowrap">
              {timeAgo}
            </span>
          </div>
        </div>
      </div>

      {/* 빨간 점: 안 읽은 경우에만 표시 */}
      {!isRead && (
        <span className="absolute top-4 right-4 w-[6px] h-[6px] bg-[#FF2E00] rounded-full" />
      )}
    </div>
  );
};

export default AlarmCard;
