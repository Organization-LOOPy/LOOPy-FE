import TumblerChallenge from '../../../../assets/images/TumblerChallenge.svg?react';
import MorningCoffee from '../../../../assets/images/MorningCoffee.svg?react';
import type { FC } from 'react';

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
  participants: number;
  completers: number;
};

const ChallengeCard: FC<ChallengeCardProps> = ({
  type,
  participants,
  completers,
}) => {
  const config = CHALLENGE_CONFIG[type];
  const completionRate = Math.round((completers / participants) * 100);
  const Image = config.image;

  return (
    <div className="flex gap-4 items-center">
      <div className="w-18 h-18">
        <Image />
      </div>
      <div className="flex flex-col">
        <div className="text-black text-[1rem] font-semibold leading-none mb-2">
          {config.title}
        </div>
        <div className="text-[#7F7F7F] text-[0.875rem] font-normal leading-none mb-4">
          {config.period}
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
