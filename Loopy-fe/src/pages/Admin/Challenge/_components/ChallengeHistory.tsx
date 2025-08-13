import ChallengeCard from '../../Home/_components/ChallengeCard';
import ChallengePurple from '../../../../assets/images/ChallengePurple.svg?react';

const ChallengeHistory = () => {
  return (
    <div className="w-full bg-[#F3F3F3] rounded-lg p-6 flex flex-col">
      <div className="flex gap-2 items-center mb-6">
        <ChallengePurple />
        <div className="text-[1rem] text-black font-semibold leading-none">
          지난 챌린지
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <ChallengeCard type="tumbler" participants={54} completers={38} />
      </div>
    </div>
  );
};

export default ChallengeHistory;
