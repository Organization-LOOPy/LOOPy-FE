import { useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import CommonTwoButtonModal from '../../../../components/admin/modal/CommonTwoButtonModal';
import CommonCompleteModal from '../../../../components/admin/modal/CommonCompleteModal';
import { useJoinChallenge } from '../../../../hooks/query/admin/challenge/useJoinChallenge';
import { useAdminCafe } from '../../../../contexts/AdminContext';

type ChallengeCardProps = {
  id: number;
  title: string;
  period: string;
  thumbnailUrl: string;
  isJoined: boolean;
  showButton?: boolean;
};

const ChallengeCard: FC<ChallengeCardProps> = ({
  id,
  title,
  period,
  thumbnailUrl,
  isJoined,
  showButton = true,
}) => {
  const navigate = useNavigate();
  const { activeCafeId } = useAdminCafe();
  const cafeId = activeCafeId ?? 1;

  const joinMutation = useJoinChallenge(cafeId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const buttonText = isJoined ? '참여 중' : '참여';
  const buttonStyle =
    buttonText === '참여 중'
      ? 'bg-[#ECECFE] text-[#6970F3]'
      : 'bg-[#6970F3] text-white';

  const handleButtonClick = () => {
    if (buttonText === '참여') setIsModalOpen(true);
  };

  const handleParticipate = async () => {
    if (!id) return;

    try {
      await joinMutation.mutateAsync(id);
      setIsModalOpen(false);
      setIsCompleteModalOpen(true);
    } catch (error) {
      console.error(error);
      alert('참여 처리 중 오류가 발생했습니다.');
    }
  };

  const handleCardClick = () => {
    navigate(`/admin/challenge/${id}`);
  };

  return (
    <>
      <div
        className="relative flex gap-6 items-center bg-white rounded-lg p-4 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="w-18 h-18">
          <img src={thumbnailUrl} alt={title} className="w-full h-full" />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="text-[#6970F3] text-[0.75rem] font-semibold leading-none">
            월간 챌린지
          </div>
          <div className="text-black text-[1rem] font-semibold leading-none">
            {title.length > 20 ? `${title.slice(0, 20)}…` : title}
          </div>
          <div className="text-[#7F7F7F] text-[0.875rem] font-normal leading-none">
            {period}
          </div>
        </div>

        {showButton && (
          <button
            className={`absolute right-0 h-[2.125rem] w-[4.5rem] px-4 py-2.5 rounded-md text-sm font-semibold leading-none ${buttonStyle}`}
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            {buttonText}
          </button>
        )}
      </div>

      {isModalOpen && (
        <CommonTwoButtonModal
          onClose={() => setIsModalOpen(false)}
          title={`${title}에 참여할까요?`}
          message={
            '멤버쉽 QR 스캔을 통해 인증을 진행해주시면 됩니다.\n정해진 횟수만큼 인증이 누적되면 고객에게 자동으로 혜택이 제공되어요.'
          }
          purpleButton="참여하기"
          purpleButtonOnClick={handleParticipate}
        />
      )}

      {isCompleteModalOpen && (
        <CommonCompleteModal
          onClose={() => setIsCompleteModalOpen(false)}
          message={`${title}에 참여했어요!`}
        />
      )}
    </>
  );
};

export default ChallengeCard;
