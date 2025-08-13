import { useNavigate } from 'react-router-dom';
import ChallengeCard from './ChallengeCard';

const ChallengeRecommend = () => {
  const navigate = useNavigate();

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
        <div className="flex-1 min-w-0">
          <ChallengeCard type="tumbler" />
        </div>
        <div className="flex-1 min-w-0">
          <ChallengeCard type="coffee" />
        </div>
      </div>
    </div>
  );
};

export default ChallengeRecommend;
