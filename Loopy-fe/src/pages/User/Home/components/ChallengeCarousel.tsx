import { useParticipatingChallengeList } from '../../../../hooks/query/challenge/useChallengeList';
import ChallengeCard from './ChallangeCard';
import NoChallengeCard from './NoChallangeCard';

const ChallengeCarousel = () => {
  const { participatingChallengeList, isLoading } =
    useParticipatingChallengeList();

  if (isLoading) {
    // TODO: Skeleton 컴포넌트로 교체
  }

  if (participatingChallengeList.length === 0) {
    return (
      <div className="w-full pr-6">
        <NoChallengeCard />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <div className="flex overflow-x-auto no-scrollbar scroll-smooth px-0 pb-2">
        {participatingChallengeList.map((challenge, index) => (
          <div
            key={challenge.id}
            className={`mr-2 ${index === participatingChallengeList.length - 1 ? 'mr-5' : ''}`}
          >
            <ChallengeCard
              challengeName={challenge.title}
              challengeImage={challenge.thumbnailUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeCarousel;
