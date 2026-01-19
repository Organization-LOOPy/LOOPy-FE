import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type ChallengeCardProps = {
  cafeId: number,
  thumbnailUrl?: string;
  title: string;
  startDate: string;
  endDate: string;
  participants: number;
  completers: number;
};

const ChallengeCard: FC<ChallengeCardProps> = ({
  cafeId,
  thumbnailUrl,
  title,
  startDate,
  endDate,
  participants,
  completers,
}) => {
  const navigate = useNavigate();

  const completionRate =
    participants > 0 ? Math.round((completers / participants) * 100) : 0;

  const handleCardClick = () => {
    navigate(`/admin/challenge/joined/${cafeId}`);
  };  

  return (
    <div className="flex gap-4 items-center p-4 rounded-lg bg-[#F0F1FE]" onClick={handleCardClick}>
      <div className="w-18 h-18">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-18 h-18 object-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-lg" />
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-black text-[1rem] font-semibold leading-none mb-2">
          {title.length > 10 ? `${title.slice(0, 15)}…` : title}
        </div>
        <div className="text-[#7F7F7F] text-[0.875rem] font-normal leading-none mb-4">
          {`${startDate} ~ ${endDate}`}
        </div>
        <div className="flex gap-1">
          <div className="text-[#6970F3] text-[0.75rem] font-normal leading-none">
            참여자
          </div>
          <div className="text-[#6970F3] text-[0.75rem] font-semibold leading-none">
            {participants}명
          </div>
          <div className="text-[#6970F3] text-[0.75rem] font-normal leading-none ml-1">
            완료자
          </div>
          <div className="text-[#6970F3] text-[0.75rem] font-semibold leading-none">
            {completers}명 ({completionRate}%)
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeCard;
