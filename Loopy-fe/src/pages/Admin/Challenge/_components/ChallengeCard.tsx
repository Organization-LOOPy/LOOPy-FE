import { useState } from 'react';
import type { FC } from 'react';
import TumblerChallenge from '../../../../assets/images/TumblerChallenge.svg?react';
import MorningCoffee from '../../../../assets/images/MorningCoffee.svg?react';
import CommonTwoButtonModal from '../../../../components/admin/modal/CommonTwoButtonModal';
import CommonCompleteModal from '../../../../components/admin/modal/CommonCompleteModal'; // 경로는 실제 위치에 맞게 수정하세요

const CHALLENGE_CONFIG = {
  tumbler: {
    image: TumblerChallenge,
    title: '지구를 지켜요! 텀블러 챌린지',
    period: '2025.08.15 ~ 2025.09.15',
  },
  coffee: {
    image: MorningCoffee,
    title: '하루를 상쾌하게! 모닝 커피 챌린지',
    period: '2025.08.10 ~ 2025.09.10',
  },
} as const;

type ChallengeType = keyof typeof CHALLENGE_CONFIG;

type ChallengeCardProps = {
  type: ChallengeType;
  buttonText?: '참여' | '참여 중';
};

const ChallengeCard: FC<ChallengeCardProps> = ({ type, buttonText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);

  const config = CHALLENGE_CONFIG[type];
  const Image = config.image;

  const buttonStyle =
    buttonText === '참여 중'
      ? 'bg-[#ECECFE] text-[#6970F3]'
      : 'bg-[#6970F3] text-white';

  const handleButtonClick = () => {
    if (buttonText === '참여') {
      setIsModalOpen(true);
    }
  };

  const handleParticipate = () => {
    setIsModalOpen(false);
    setIsCompleteModalOpen(true);
  };

  return (
    <>
      <div className="relative flex gap-6 items-center bg-white rounded-lg p-4">
        <div className="w-18 h-18">
          <Image />
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="text-[#6970F3] text-[0.75rem] font-semibold leading-none">
            8월의 루피 챌린지
          </div>
          <div className="text-black text-[1rem] font-semibold leading-none">
            {config.title}
          </div>
          <div className="text-[#7F7F7F] text-[0.875rem] font-normal leading-none">
            {config.period}
          </div>
        </div>

        {buttonText && (
          <button
            className={`absolute right-0 h-[2.125rem] w-[4.5rem] px-4 py-2.5 rounded-md text-sm font-semibold leading-none ${buttonStyle}`}
            onClick={handleButtonClick}
          >
            {buttonText}
          </button>
        )}
      </div>

      {isModalOpen && (
        <CommonTwoButtonModal
          onClose={() => setIsModalOpen(false)}
          title={`${config.title}에 참여할까요?`}
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
          message={`${config.title}에 참여했어요!`}
        />
      )}
    </>
  );
};

export default ChallengeCard;
