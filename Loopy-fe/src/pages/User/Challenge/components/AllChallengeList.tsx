import ChallengeCard from './ChallengeCard';
import type { ChallengeListItem } from '../../../../apis/challenge/challengeList/type';

type Props = {
  allChallengeList: ChallengeListItem[];
};

const AllChallengeList: React.FC<Props> = ({ allChallengeList }) => {
  if (allChallengeList.length === 0) {
    return (
      <div className="text-gray-500 text-sm text-center">
        챌린지가 없습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {allChallengeList.map((challenge) => (
        <ChallengeCard key={challenge.id} data={challenge} />
      ))}
    </div>
  );
};

export default AllChallengeList;
