import CommonHeader from "../../../../components/header/CommonHeader";
import ChallengeCard from "./_components/ChallengeCard.tsx";
import { challenges } from "./mock/challenges";

interface MyChallengePageProps {
  onBack: () => void;
}

const MyChallengePage = ({ onBack }: MyChallengePageProps) => {
  return (
    <div className="mb-[4rem]">
      <CommonHeader title="챌린지" onBack={onBack} />
      <div className="mt-[1.5rem] space-y-[1.5rem]">
        {challenges.map((challenge) => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ))}
      </div>
    </div>
  );
};

export default MyChallengePage;