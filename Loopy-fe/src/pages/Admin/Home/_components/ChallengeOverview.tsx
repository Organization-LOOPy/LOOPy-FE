import ChallengeCard from './ChallengeCard';
import ChallengePurple from '../../../../assets/images/ChallengePurple.svg?react';

const ChallengeOverview = () => {
  return (
    <div className="w-full bg-[#F0F1FE] rounded-lg p-6 flex flex-col">
      <div className="flex gap-2 items-center mb-6">
        <ChallengePurple />
        <div className="text-[1rem] text-black font-semibold leading-none">
          진행 중인 챌린지
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <ChallengeCard type="tumbler" participants={54} completers={38} />
        <ChallengeCard type="coffee" participants={32} completers={24} />
      </div>
    </div>
  );
};

export default ChallengeOverview;
