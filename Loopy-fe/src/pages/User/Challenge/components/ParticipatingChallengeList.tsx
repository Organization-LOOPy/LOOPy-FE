import ChallengeCard from './ChallengeCard';
import type { ChallengeListItem } from '../../../../apis/challenge/challengeList/type';

type Props = {
  participatingChallengeList: ChallengeListItem[];
};

const ParticipatingChallengeList: React.FC<Props> = ({
  participatingChallengeList,
}) => {
  if (participatingChallengeList.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full box-border overflow-hidden text-center py-72">
        <div className="text-[#6970F3] text-[1.125rem] font-bold">
          아직 참여 중인 챌린지가 없어요!
        </div>
        <div className="text-[#7F7F7F] text-[0.875rem] font-normal mt-2">
          루피와 작은 챌린지부터 시작해볼까요?
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {participatingChallengeList.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          data={challenge}
          hideParticipatingTag={true}
        />
      ))}
    </div>
  );
};

export default ParticipatingChallengeList;
