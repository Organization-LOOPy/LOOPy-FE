import type { ChallengeListItem } from '../../../../apis/challenge/challengeList/type';
import { useNavigate } from 'react-router-dom';

interface ChallengeCardProps {
  data: ChallengeListItem;
  hideParticipatingTag?: boolean;
}

const ChallengeCard = ({ data, hideParticipatingTag }: ChallengeCardProps) => {
  const navigate = useNavigate();
  const { id, title, startDate, endDate, thumbnailUrl, isParticipated } = data;

  const challengeMonth = startDate
    ? new Date(startDate).getMonth() + 1
    : undefined;

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const handleClick = () => {
    navigate(`/challenge/${id}`);
  };

  return (
    <div onClick={handleClick} className="flex items-center cursor-pointer">
      {/* 좌측 이미지 */}
      <img
        src={thumbnailUrl}
        alt={title}
        className="w-18 h-18 object-fill mr-4"
      />

      {/* 중앙 텍스트 */}
      <div className="flex-1">
        <div className="text-xs font-normal text-[#6970F3] leading-none mb-2">
          {challengeMonth ? `${challengeMonth}월의 이벤트` : '루피만의 챌린지!'}
        </div>
        <div className="text-black text-[1rem] font-semibold leading-none mb-2">
          {title.length > 15 ? `${title.slice(0, 15)}…` : title}
        </div>
        <div className="text-sm font-normal text-[#7F7F7F] leading-none">
          {formatDate(startDate)} ~ {formatDate(endDate)}
        </div>
      </div>

      {/* "참여 중" 태그 */}
      {!hideParticipatingTag && isParticipated && (
        <div className="w-[3.188rem] h-[1.25rem] ml-4 px-2 py-1 bg-[#F0F1FE] text-[#6970F3] rounded-sm text-xs flex items-center justify-center">
          참여 중
        </div>
      )}
    </div>
  );
};

export default ChallengeCard;
