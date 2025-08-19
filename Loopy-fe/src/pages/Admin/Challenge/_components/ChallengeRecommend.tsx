import { useNavigate } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';
import { useAdminCafe } from '../../../../contexts/AdminContext';
import { useAvailableChallenges } from '../../../../hooks/query/admin/challenge/useAvailableChallenges';
import LoadingSpinner from '../../../../components/loading/LoadingSpinner';

const ChallengeRecommend = () => {
  const navigate = useNavigate();
  const { activeCafeId } = useAdminCafe();
  const cafeId = activeCafeId ?? 1;

  const { data, isLoading, isError } = useAvailableChallenges(cafeId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>챌린지 정보를 불러오지 못했습니다.</div>;

  const challenges = data?.data || [];

  const getRandomTwo = (array: typeof challenges) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 2);
  };

  const randomTwo = getRandomTwo(challenges);

  return (
    <div className="bg-[#F0F1FE] w-full h-[12rem] p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[1rem] text-[#252525] font-semibold leading-none">
          루피 챌린지 참여를 통해 고객을 모아보세요!
        </div>
        <button
          className="text-[0.875rem] text-[#7F7F7F] font-medium flex items-center"
          onClick={() => navigate('/admin/challengelist')}
        >
          더 많은 챌린지 보기<span className="ml-2 mr-1">&gt;</span>
        </button>
      </div>

      <div className="flex gap-4 w-full">
        {randomTwo.map((challenge) => (
          <div key={challenge.id} className="flex-1 min-w-0">
            <ChallengeCard
              id={challenge.id}
              title={challenge.title}
              period={`${challenge.startDate} ~ ${challenge.endDate}`}
              thumbnailUrl={challenge.thumbnailUrl}
              isJoined={challenge.isJoined}
              showButton={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeRecommend;
