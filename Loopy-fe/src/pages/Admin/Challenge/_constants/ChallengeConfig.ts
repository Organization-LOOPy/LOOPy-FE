import TumblerChallengeImg from '../../../../assets/images/TumblerChallenge.svg?react';
import MorningCoffeeImg from '../../../../assets/images/MorningCoffee.svg?react';

export const CHALLENGE_CONFIG = {
  tumbler: {
    title: '지구를 지켜요! 텀블러 챌린지',
    image: TumblerChallengeImg,
    description: '일회용 컵 대신 텀블러를 사용하여\n지구를 지켜요!',
    detailText:
      '텀블러 사용을 유도해 친환경 이미지를 높이고, 고객 참여를 자연스럽게 이끌어내는 챌린지입니다.\n별도 준비 없이 간편하게 운영할 수 있어요. 챌린지에 참여해 고객의 재방문률을 높여보세요!',
    period: '2025.08.15 ~ 2025.09.15',
    points: 300,
    participants: 150,
    complete: 100,
  },
  coffee: {
    title: '아침 루틴! 모닝커피 챌린지',
    image: MorningCoffeeImg,
    description: '하루의 시작을 커피와 함께!\n아침 루틴을 만들어봐요.',
    detailText:
      '모닝커피 챌린지는 아침에 커피를 즐기는 습관을 기르도록 유도합니다.\n고객이 자연스럽게 참여할 수 있도록 다양한 혜택을 제공해보세요!',
    period: '2025.09.01 ~ 2025.09.30',
    points: 300,
    participants: 200,
    complete: 150,
  },
} as const;

export type ChallengeType = keyof typeof CHALLENGE_CONFIG;
