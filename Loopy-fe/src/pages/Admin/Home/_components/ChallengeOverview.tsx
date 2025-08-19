import ChallengeCard from './ChallengeCard';
import ChallengePurple from '../../../../assets/images/ChallengePurple.svg?react';
import { useInProgressChallenges } from '../../../../hooks/query/admin/challenge/useInProgressChallenges';
import { useAdminCafe } from '../../../../contexts/AdminContext';
import LoadingSpinner from '../../../../components/loading/LoadingSpinner';

const ChallengeOverview = () => {
  const { activeCafeId } = useAdminCafe();
  const cafeId = activeCafeId ?? 1;

  const { data, isLoading } = useInProgressChallenges(cafeId);

  if (isLoading) return <LoadingSpinner />;

  const challenges = data?.data || [];

  return (
    <div className="w-full bg-[#F0F1FE] rounded-lg p-6 flex flex-col">
      <div className="flex gap-2 items-center mb-6">
        <ChallengePurple />
        <div className="text-[1rem] text-black font-semibold leading-none">
          진행 중인 챌린지
        </div>
      </div>
      <div className="flex flex-col gap-8">
        {challenges.length > 0 ? (
          challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              thumbnailUrl={challenge.thumbnailUrl}
              title={challenge.title}
              startDate={challenge.startDate}
              endDate={challenge.endDate}
              participants={challenge.participantCount}
              completers={challenge.completedCount}
            />
          ))
        ) : (
          <div className="text-center text-[#7F7F7F] text-sm py-6">
            진행 중인 챌린지가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeOverview;
